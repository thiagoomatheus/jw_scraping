"use server"

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { prisma } from "@/app/lib/prisma/prisma"

export async function editarParticipante(participante: string, parte_id: string) {

    const schema = z.object({
        participante: z.string(),
        parte_id: z.string()
    }, {
        message: "Dados recebidos incorretos"
    })

    const validacao = schema.safeParse({participante, parte_id})

    if (!validacao.success) return { 
        error: {
            code: 401,
            message: validacao.error.message
        }
    }

    await prisma.designacao.update({
        where: {
            id: validacao.data.parte_id
        },
        data: {
            participante: validacao.data.participante
        }
    })

    revalidatePath("/designacoes")

    return {
        data: {
            code: 200,
            message: "Participante editado com sucesso"
        }
    }
}