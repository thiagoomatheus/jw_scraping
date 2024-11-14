"use server"

import { auth } from "../../../lib/auth/auth"
import { getWeek } from "date-fns"
import { redirect } from "next/navigation"
import { prisma } from "../../../lib/prisma/prisma"

export async function notificarParticipante(designacaoId: string, telefone: string, momentoDaNotificacao: "agora" | "semana") {

    const sessao = await auth()
    
    if (!sessao?.user) return redirect("/login")

    const usuario = await prisma.usuario.findUnique({ where: { email: sessao.user?.email! } })

    if (!usuario) return redirect("/login")

    const designacao = await prisma.designacao.findUnique({ where: { id: designacaoId }, include: { usuarioReference: true, semanaReference: true, parteReference: true } })

    if (usuario.id !== designacao?.usuarioReference.id) return { error: {
        code: 400,
        message: "Não foi você criou essa designação. Você só pode notificar as designações que você criou."
    }}

    if (!usuario.instanciaWhatsApp) return { error: {
        code: 400,
        message: "Instância do WhatsApp não foi criada. Navegue até a seção minha conta para criar uma."
    }}

    const resStatusIntanciaWhatsApp = await fetch(`${process.env.EVOLUTION_API_URL}/instance/connectionState/${usuario.instanciaWhatsApp}`, {
        headers: {
            "Content-Type": "application/json",
            "apiKey": process.env.AUTHENTICATION_API_KEY!
        },
        cache: "no-store"
    })

    const resultadoStatusIntanciaWhatsApp = await resStatusIntanciaWhatsApp.json()

    if (resStatusIntanciaWhatsApp.status !== 200) return { error: {
        code: resultadoStatusIntanciaWhatsApp.status,
        message: resultadoStatusIntanciaWhatsApp.response.message
    }}

    if (resultadoStatusIntanciaWhatsApp.instance.state !== "open") return { error: {
        code: 400,
        message: "A instância do WhatsApp não está aberta. Verifique sua instância na seção Minha Conta."
    }}

    if (momentoDaNotificacao === "semana") {

        const hoje = new Date()

        if (getWeek(hoje) === parseInt(designacao.semana.slice(0, 2))) return { error: {
            code: 400,
            message: "A semana selecionada é a atual. Não é possível agendar a notificação para esta semana."
        }}

        if (getWeek(hoje) > parseInt(designacao.semana.slice(0, 2))) return { error: {
            code: 400,
            message: "A semana selecionada já passou. Não é possível agendar a notificação para esta semana."
        }}

        await prisma.designacao.update({
            where: { id: designacao.id },
            data: {
                telefone: telefone
            }
        })
        .then(() => {
            return { data: {
                code: 201,
                message: "Notificação agendada com sucesso!"
            }}
        })
    }

    const resNotificarParticipante = await fetch(`${process.env.EVOLUTION_API_URL}/message/sendText/${usuario.instanciaWhatsApp}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apiKey": process.env.AUTHENTICATION_API_KEY!
        },
        body: JSON.stringify({
            number: `55${telefone}`,
            textMessage: {
                text: `
Olá irmão, tudo bem?

Passando para confirmar sua designação para o dia ${designacao.semanaReference.diaReuniao}:

*Designação: ${designacao.parteReference.nome}*

Por favor, confirme sua participação.

Obrigado!`
            }
        })
    })

    if (resNotificarParticipante.status !== 201) return { error: {
        code: 401,
        message: "Erro ao notificar participante. Tente novamente mais tarde."
    }}
    
    return { data: {
        code: resNotificarParticipante.status,
        message: "Participante notificado com sucesso!"
    }}

}