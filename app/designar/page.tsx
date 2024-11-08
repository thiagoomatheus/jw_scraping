import { redirect } from "next/navigation";
import Formulario from "./componentes/formulario";
import { prisma } from "../lib/prisma/prisma";
import { auth } from "../lib/auth/auth";

export default async function Designar() {

    const sessao = await auth()

    if (!sessao?.user) return redirect("/login")

    const usuario = await prisma.usuario.findUnique({ where: { email: sessao.user?.email! } })

    if (usuario?.funcao !== "designar") {
        return (
            <section className="flex flex-col gap-5 justify-center items-center w-full max-w-7xl">
            <h1>Designar</h1>
            <div className="flex flex-col items-center justify-center gap-3 border p-5 rounded-lg bg-red-900">
                <p>Voce não tem permissão para acessar esta página.</p>
                <p>Altere sua função para &quot;designar&quot; e tente novamente.</p>
            </div>
        </section>
        )
    }

    return (
        <section className="flex flex-col gap-5 lg:gap-10 justify-center items-center w-full max-w-7xl">
            <h1>Designar</h1>
            <Formulario />
        </section>
    )
}