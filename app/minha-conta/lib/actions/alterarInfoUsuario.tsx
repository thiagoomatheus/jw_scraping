"use server"

import { auth } from "@/app/lib/auth/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma/prisma";

export default async function AlterarInfoUsuario(cong?: number, funcao?: "participar" | "designar") {

    const sessao = await auth()

    if (!sessao?.user) return redirect("/login")

    if (!cong && !funcao) return redirect("/login")

    if (cong && funcao) await prisma.usuario.update({
        where: {
            email: sessao.user.email!
        },
        data: {
            cong: cong,
            funcao: funcao
        }
    })

    if (cong && !funcao) await prisma.usuario.update({
        where: {
            email: sessao.user.email!
        },
        data: {
            cong: cong
        }
    })
        
    if (cong === undefined && funcao !== undefined) await prisma.usuario.update({
        where: {
            email: sessao.user.email!
        },
        data: {
            funcao: funcao
        }
    })

    revalidatePath("/minha-conta")

    return 201
}