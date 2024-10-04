-- CreateEnum
CREATE TYPE "Secao" AS ENUM ('tesouros', 'ministerio', 'vida');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cong" INTEGER NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semana" (
    "id" INTEGER NOT NULL,
    "dia_reuniao" TEXT NOT NULL,
    "cantico_inicial" TEXT NOT NULL,
    "cantico_meio" TEXT NOT NULL,
    "cantico_final" TEXT NOT NULL,
    "capitulos" TEXT NOT NULL,

    CONSTRAINT "semana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parte" (
    "id" TEXT NOT NULL,
    "semana" INTEGER NOT NULL,
    "secao" "Secao" NOT NULL,
    "nome" TEXT NOT NULL,
    "tempo" TEXT NOT NULL,
    "participante" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Parte_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "Parte" ADD CONSTRAINT "Parte_semana_fkey" FOREIGN KEY ("semana") REFERENCES "semana"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
