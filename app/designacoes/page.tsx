import { redirect } from "next/navigation"
import { auth } from "../lib/auth/auth"
import SecaoDeDesignacoes from "./componentes/secaoDeDesignacoes"
import { prisma } from "../lib/prisma/prisma"
import Link from "next/link"

export default async function Page() {

    const sessao = await auth()

    if (!sessao?.user) return redirect("/login")

    const usuario = await prisma.usuario.findUnique({ where: { email: sessao.user?.email! } })

    if (!usuario) return redirect("/login")

    if (!usuario.cong) return (
        <p>Você ainda não definiu sua congregação. Vá até a seção <Link className="font-bold underline hover:text-blue-500" href="/minha-conta">&quot;Minha Conta&quot;</Link> para criar definir sua congregação.</p>
    )

    const designacoes = await prisma.designacao.findMany({
        where: {
            cong: usuario?.cong!
        },
        include: {
            usuarioReference: true,
            parteReference: true,
            semanaReference: true
        }
    })

    if (!designacoes.length) return (
        <p>Você ainda não possui designações. Vá até a seção <Link className="font-bold underline hover:text-blue-500" href="/designar">&quot;Designar&quot;</Link> para criar uma.</p>
    )

    return (
        <SecaoDeDesignacoes designacoes={designacoes} autorizadoParaAcoes={usuario?.funcao === "designar" ? true : false} />
    )
}