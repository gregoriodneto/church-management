-- CreateEnum
CREATE TYPE "ChurchRole" AS ENUM ('SEDE', 'CONGREGACAO', 'PONT_DE_PREGACAO');

-- CreateEnum
CREATE TYPE "TypeContribution" AS ENUM ('DIZIMO', 'CONTRIBUICAO');

-- CreateEnum
CREATE TYPE "PositionInTheChurch" AS ENUM ('NONE', 'PASTOR', 'LIDER', 'REGENTE', 'BANDA');

-- CreateTable
CREATE TABLE "Church" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "foundationDate" TEXT NOT NULL,
    "role" "ChurchRole",
    "parentChurchId" TEXT,
    "addressChurchId" TEXT,
    "contactChurchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "positionInTheChurch" "PositionInTheChurch"[],
    "addressMemberId" TEXT,
    "contactMemberId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finance" (
    "id" TEXT NOT NULL,
    "description" "TypeContribution" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "receiverChurchId" TEXT,
    "contributorMemberId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Finance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "numberStreet" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "numberContact" TEXT[],
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Church_addressChurchId_key" ON "Church"("addressChurchId");

-- CreateIndex
CREATE UNIQUE INDEX "Church_contactChurchId_key" ON "Church"("contactChurchId");

-- CreateIndex
CREATE INDEX "Finance_receiverChurchId_idx" ON "Finance"("receiverChurchId");

-- CreateIndex
CREATE INDEX "Finance_contributorMemberId_idx" ON "Finance"("contributorMemberId");

-- AddForeignKey
ALTER TABLE "Church" ADD CONSTRAINT "Church_parentChurchId_fkey" FOREIGN KEY ("parentChurchId") REFERENCES "Church"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Church" ADD CONSTRAINT "Church_addressChurchId_fkey" FOREIGN KEY ("addressChurchId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Church" ADD CONSTRAINT "Church_contactChurchId_fkey" FOREIGN KEY ("contactChurchId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_addressMemberId_fkey" FOREIGN KEY ("addressMemberId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_contactMemberId_fkey" FOREIGN KEY ("contactMemberId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_receiverChurchId_fkey" FOREIGN KEY ("receiverChurchId") REFERENCES "Church"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_contributorMemberId_fkey" FOREIGN KEY ("contributorMemberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
