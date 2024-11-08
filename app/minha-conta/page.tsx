import React from "react"
import { redirect } from "next/navigation"
import { auth } from "../lib/auth/auth"
import SessaoConexaoWhatsApp from "./components/sessaoConexaoWhatsApp"
import SessaoAltualizarInfoUsuario from "./components/sessaoAltualizarInfoUsuario"
import { prisma } from "../lib/prisma/prisma"

export default async function Page() {

    const sessao = await auth()

    if (!sessao?.user) return redirect("/login")

    let usuario = await prisma.usuario.findUnique({ where: { email: sessao.user?.email! } })
    
    if (!usuario) usuario = await prisma.usuario.create({ data: 
        { 
            nome: sessao.user?.name!,
            email: sessao.user?.email!,
        }
    })

    if (!usuario) return redirect("/login")

    const statusIntanciaWhatsApp: "open" | "closed" | undefined = await fetch(`http://evolution-api:8080/instance/connectionState/${usuario.instanciaWhatsApp}`, {
        headers: {
            "Content-Type": "application/json",
            "apiKey": process.env.AUTHENTICATION_API_KEY!
        },
        cache: "no-store"
    })
    .then(async (res) => {
        return await res.json()
    })
    .then((dados) => {
        if (dados.error) return undefined
        return dados.instance.state === "connecting" ? "closed" : dados.instance.state
    })

    return (
        <>
            <h1>Minha Conta</h1>
            <section className="flex flex-col lg:flex-row gap-7 lg:gap-12 w-full">
                <div className="flex flex-col gap-5 max-w-2xl p-2 lg:p-5 rounded-lg w-full neumorphism dark:bg-gray-700 dark:shadow-none">
                    <h2 className="self-center">Meus dados</h2>
                    <p><span className="font-bold">Meu email:</span> {usuario?.email}</p>
                    <p><span className="font-bold">Meu nome:</span> {usuario?.nome}</p>
                    <SessaoAltualizarInfoUsuario cong={usuario?.cong} funcao={usuario?.funcao} />
                </div>
                <div className="flex flex-col gap-5 items-center p-2 lg:p-5 rounded-lg w-full neumorphism dark:bg-gray-700 dark:shadow-none">
                    <h2>Conectar WhatsApp</h2>
                    <p>Conectando seu WhatsApp é possível enviar as designações para os participantes.</p>
                    <SessaoConexaoWhatsApp instancia={usuario.instanciaWhatsApp ? usuario.instanciaWhatsApp : null} status={statusIntanciaWhatsApp} emailUsuario={usuario.email} />
                </div>
            </section>
        </>
            
    )
}