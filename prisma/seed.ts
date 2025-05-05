import { ChurchRole, PrismaClient, StatusEvent, TypeContribution, TypeEvent } from "@prisma/client";

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

    // Evento no diário
    await prisma.event.createMany({
        data: [
        {
            title: 'Culto de Louvor',
            description: 'Culto aberto ao público com música e oração.',
            date: new Date(),
            location: 'Templo principal',
            isPublic: true,
            type: [TypeEvent.CULTO, TypeEvent.FESTA],
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

    // Endereço de membro
    const memberAddress = await prisma.address.create({
        data: {
        street: 'Rua da Esperança',
        numberStreet: '45B',
        district: 'Bairro Novo',
        city: 'São Paulo',
        state: 'SP',
        },
    });

    // Contato do membro
    const memberContact = await prisma.contact.create({
        data: {
        numberContact: ['+5511912345678'],
        email: 'membro1@exemplo.com',
        },
    });

    // Membro
    const member = await prisma.member.create({
        data: {
        name: 'João da Silva',
        dateOfBirth: new Date('1990-05-20'),
        age: 34,
        address: {
            connect: { id: memberAddress.id },
        },
        contact: {
            connect: { id: memberContact.id },
        },
        church: {
            connect: { id: church.id },
        },
        },
    });

    // Relacionamento entre membro e igreja
    await prisma.church.update({
        where: { id: church.id },
        data: {
        churchMember: {
            connect: { id: member.id },
        },
        },
    });

    // Financeiro - membro contribui
    await prisma.finance.create({
        data: {
        description: TypeContribution.DIZIMO,
        value: 150.00,
        member: {
            connect: { id: member.id },
        },
        church: {
            connect: { id: church.id },
        },
        },
    });

    // Financeiro - igreja recebe
    await prisma.finance.create({
        data: {
        description: TypeContribution.OFERTA,
        value: 300.00,
        church: {
            connect: { id: church.id },
        },
        },
    });

    console.log('Seed concluído com dados fictícios.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });