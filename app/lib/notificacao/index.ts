
import { getWeek, getYear } from 'date-fns'
import { prisma } from './prisma'

async function enviarNotificacaoAgendada() {

    const hoje = new Date()

    const semanaAtual = getWeek(hoje, { weekStartsOn: 1 })

    const ano = getYear(hoje)

    console.log(`Enviando notificação para semana ${semanaAtual}/${ano}`)
    
    const designacoesParaNotificar = await prisma.designacao.findMany({
        where: {
            semana: `${semanaAtual}/${ano}`,
            telefone: {
                not: null
            }
        },
        include: {
            semanaReference: true,
            usuarioReference: true,
            parteReference: true
        }
    })

    if (!designacoesParaNotificar || designacoesParaNotificar.length === 0) return console.log("Sem designações para notificar");
    
    designacoesParaNotificar.forEach(async (designacao) => {
        
        const usuario = designacao.usuarioReference

        if (!usuario.instanciaWhatsApp) return console.log({
            error: {
                code: 400,
                designacao: designacao.id,
                message: "Instância do WhatsApp não foi criada. Navegue até a seção minha conta para criar uma."
            }
        })
    
        const resStatusIntanciaWhatsApp = await fetch(`${process.env.EVOLUTION_API_URL}/instance/connectionState/${usuario.instanciaWhatsApp}`, {
            headers: {
                "Content-Type": "application/json",
                "apiKey": process.env.AUTHENTICATION_API_KEY!
            },
            cache: "no-store"
        })
    
        const resultadoStatusIntanciaWhatsApp = await resStatusIntanciaWhatsApp.json()
    
        if (resStatusIntanciaWhatsApp.status !== 200) console.log({ error: {
            code: resultadoStatusIntanciaWhatsApp.status,
            designacao: designacao.id,
            message: resultadoStatusIntanciaWhatsApp.response.message
        }});
         
    
        if (resultadoStatusIntanciaWhatsApp.instance.state !== "open") return console.log({ error: {
            code: 400,
            designacao: designacao.id,
            message: "A instância do WhatsApp não está aberta. Verifique sua instância na seção Minha Conta."
        }});
    
        const resNotificarParticipante = await fetch(`${process.env.EVOLUTION_API_URL}/message/sendText/${usuario.instanciaWhatsApp}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apiKey": process.env.AUTHENTICATION_API_KEY!
            },
            body: JSON.stringify({
                number: `55${designacao.telefone}`,
                textMessage: {
                    text: `
Olá irmão, tudo bem?

Passando para confirmar sua designação para o dia ${designacao.diaReuniao}:

*Designação: ${designacao.parteReference.nome}*

Por favor, confirme sua participação.

Obrigado!`
                }
            })
        })
    
        if (resNotificarParticipante.status !== 201) return console.log({ error: {
            code: 401,
            designacao: designacao.id,
            message: "Erro ao notificar participante. Tente novamente mais tarde."
        }});
        
        return console.log({ data: {
            code: resNotificarParticipante.status,
            designacao: designacao.id,
            message: "Participante notificado com sucesso!"
        }});
         
    })
    
}

enviarNotificacaoAgendada()