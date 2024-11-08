import { prisma } from "@/app/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
    const dados = await req.json()

    if (!dados) return NextResponse.json({ error: "Dados não recebidos" }, { status: 500 })

        const dadosSchema = z.object({
            nome: z.string(),
            email: z.string(),
            tipo: z.string(),
            sobre: z.string(),
            feedback: z.string()
        })

    const validacao = dadosSchema.safeParse({
        dados
    })

    if (!validacao.success) {
        return NextResponse.json({ error: validacao.error.message }, { status: 500 })
    }

    await prisma.feedback.create({
        data: dados
    })

    return NextResponse.json({ data: "Feedback enviado com sucesso" }, { status: 200 })
    
}