import { ChurchRole, PrismaClient, StatusEvent, TypeContribution, TypeEvent } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Endereço da igreja
  const churchAddress = await prisma.address.create({
    data: {
      street: 'Rua da Fé',
      numberStreet: '100',
      district: 'Centro',
      city: 'São Paulo',
      state: 'SP',
    },
  });

  // Contato da igreja
  const churchContact = await prisma.contact.create({
    data: {
      numberContact: ['+5511987654321'],
      email: 'igreja@exemplo.com',
    },
  });

  // Igreja principal
  const church = await prisma.church.create({
    data: {
      name: 'Igreja Teste Central',
      foundationDate: new Date('1995-01-01'),
      role: ChurchRole.MATRIZ,
      address: {
        connect: { id: churchAddress.id },
      },
      contact: {
        connect: { id: churchContact.id },
      },
    },
  });

  // Diário da igreja
  const diary = await prisma.diary.create({
    data: {
      church: {
        connect: { id: church.id },
      },
    },
  });

  // Eventos no diário
  await prisma.event.createMany({
    data: [
      {
        title: 'Culto de Louvor',
        description: 'Culto aberto ao público com música e oração.',
        date: new Date(),
        location: 'Templo principal',
        isPublic: true,
        type: [TypeEvent.CULTO],
        status: StatusEvent.PLANEJADO,
        diaryId: diary.id,
      },
      {
        title: 'Estudo Bíblico Jovem',
        description: 'Encontro de jovens para leitura e estudo.',
        date: new Date(),
        location: 'Sala 2',
        isPublic: true,
        type: [TypeEvent.ESTUDO_BIBLICO],
        status: StatusEvent.PLANEJADO,
        diaryId: diary.id,
      },
    ],
  });

  // Membro 1 (vai ser usuário)
  const member1 = await prisma.member.create({
    data: {
      name: 'João da Silva',
      dateOfBirth: new Date('1990-05-20'),
      age: 34,
      address: {
        create: {
          street: 'Rua Esperança',
          numberStreet: '45B',
          district: 'Bairro Novo',
          city: 'São Paulo',
          state: 'SP',
        },
      },
      contact: {
        create: {
          numberContact: ['+5511912345678'],
          email: 'membro1@exemplo.com',
        },
      },
      church: {
        connect: { id: church.id },
      },
    },
    include: {
        contact: true
    }
  });

  // Membro 2 (não é usuário)
  const member2 = await prisma.member.create({
    data: {
      name: 'Maria Oliveira',
      dateOfBirth: new Date('1985-03-15'),
      age: 39,
      address: {
        create: {
          street: 'Rua Paz',
          numberStreet: '22',
          district: 'Jardim da Luz',
          city: 'São Paulo',
          state: 'SP',
        },
      },
      contact: {
        create: {
          numberContact: ['+5511912341234'],
          email: 'membro2@exemplo.com',
        },
      },
      church: {
        connect: { id: church.id },
      },
    },
  });

  // Usuário vinculado ao Membro 1
  const hashedPassword = await bcrypt.hash(process.env.PASSWORD_TESTE_SEED!, 10);
  await prisma.user.create({
    data: {
      email: member1.contact?.email!,
      password: hashedPassword, // substitua por hash se desejar
      member: {
        connect: { id: member1.id },
      },
      church: {
        connect: { id: church.id },
      },
    },
  });

  // Entradas e saídas financeiras
  await prisma.finance.createMany({
    data: [
      {
        description: TypeContribution.DIZIMO,
        value: 200,
        receiverChurchId: church.id,
        contributorMemberId: member1.id,
      },
      {
        description: TypeContribution.OFERTA,
        value: 150,
        receiverChurchId: church.id,
      },
      {
        description: TypeContribution.GASTO_MENSAL,
        value: -100,
        receiverChurchId: church.id,
      },
    ],
  });

  console.log('✅ Seed concluído com uma igreja, dois membros e finanças.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });