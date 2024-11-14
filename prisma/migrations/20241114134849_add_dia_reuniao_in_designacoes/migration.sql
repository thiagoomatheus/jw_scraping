/*
  Warnings:

  - Added the required column `diaReuniao` to the `designacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "designacoes" ADD COLUMN     "diaReuniao" TEXT NOT NULL;
