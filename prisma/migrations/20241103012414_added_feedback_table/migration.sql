/*
  Warnings:

  - The primary key for the `semana` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `Parte` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[semana]` on the table `semana` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `semana` to the `semana` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Funcao" AS ENUM ('participar', 'designar');

-- DropForeignKey
ALTER TABLE "Parte" DROP CONSTRAINT "Parte_semana_fkey";

-- AlterTable
ALTER TABLE "semana" DROP CONSTRAINT "semana_pkey",
ADD COLUMN     "semana" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "semana_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "name",
ADD COLUMN     "funcao" "Funcao",
ADD COLUMN     "instanciaWhatsApp" TEXT,
ADD COLUMN     "nome" TEXT NOT NULL,
ALTER COLUMN "cong" DROP NOT NULL;

-- DropTable
DROP TABLE "Parte";

-- CreateTable
CREATE TABLE "partes" (
    "id" TEXT NOT NULL,
    "semana" TEXT NOT NULL,
    "secao" "Secao",
    "nome" TEXT NOT NULL,
    "tempo" TEXT,

    CONSTRAINT "partes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "designacoes" (
    "id" TEXT NOT NULL,
    "semana" TEXT NOT NULL,
    "parte" TEXT NOT NULL,
    "participante" TEXT NOT NULL,
    "cong" INTEGER NOT NULL,
    "criadoPor" TEXT NOT NULL,
    "telefone" TEXT,

    CONSTRAINT "designacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "sobre" TEXT NOT NULL,
    "texto" TEXT NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "semana_semana_key" ON "semana"("semana");

-- AddForeignKey
ALTER TABLE "partes" ADD CONSTRAINT "partes_semana_fkey" FOREIGN KEY ("semana") REFERENCES "semana"("semana") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "designacoes" ADD CONSTRAINT "designacoes_criadoPor_fkey" FOREIGN KEY ("criadoPor") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "designacoes" ADD CONSTRAINT "designacoes_parte_fkey" FOREIGN KEY ("parte") REFERENCES "partes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "designacoes" ADD CONSTRAINT "designacoes_semana_fkey" FOREIGN KEY ("semana") REFERENCES "semana"("semana") ON DELETE CASCADE ON UPDATE CASCADE;
