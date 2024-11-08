import { auth } from "@/app/lib/auth/auth"
import FormularioFeedback from "./componentes/formularioFeedback"
import { Usuario } from "@prisma/client"
import { prisma } from "@/app/lib/prisma/prisma"

export default async function Page() {

    const sessao = await auth()

    let usuario:Usuario | null = null

    if (sessao?.user) {
        usuario = await prisma.usuario.findUnique({ where: { email: sessao.user?.email! } })
    }

    return (
        <section className="flex flex-col gap-5 justify-center items-center w-full max-w-xl">
            <h1>Feedback</h1>
            <p>Seu feedback é muito bem-vindo e vai nos ajudar a melhorar essa ferramenta.</p>
            <p>Preencha o formulário abaixo e descreva melhor a sua experiência com a ferramenta.</p>
            <FormularioFeedback usuario={usuario} />
        </section>
    )
}