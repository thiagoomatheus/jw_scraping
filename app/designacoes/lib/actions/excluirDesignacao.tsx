"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { prisma } from "@/app/lib/prisma/prisma"
import { auth } from "@/app/lib/auth/auth"
import { redirect } from "next/navigation"

export async function excluirDesignacao(idDesignacao: string, idCriadorDesignacao: string) {

    const schema = z.object({
        idDesignacao: z.string(),
        idCriadorDesignacao: z.string()
    }, {
        message: "Dados recebidos incorretos"
    })

    const validacao = schema.safeParse({
        idDesignacao,
        idCriadorDesignacao
    })

    if (!validacao.success) return {
        error: {
            code: 401,
            message: validacao.error.message
        }
    }

    const sessao = await auth()
    
    if (!sessao?.user) return redirect("/login")

    const usuario = await prisma.usuario.findUnique({ where: { email: sessao.user?.email! } })

    if (!usuario) return redirect("/login")

    if (usuario.id !== idCriadorDesignacao) return { error: {
        code: 400,
        message: "Não foi você criou essa designação. Você só pode excluir as designações que você criou."
    }}

    await prisma.designacao.delete({
        where: {
            id: validacao.data.idDesignacao
        }
    })

    revalidatePath("/designacoes")

    return {
        data: {
            code: 200,
            message: "Designação excluída"
        }
    }
    
}