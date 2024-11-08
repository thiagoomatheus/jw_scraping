"use client"

import toast from "react-hot-toast"
import Btn from "./btn"
import { conectarWhatsApp, criarInstanciaWhatsApp, desconectarWhatsApp, verificarConexao } from "../lib/actions/instanciaWhatsApp"
import { useState } from "react"
import Image from "next/image"
import Modal from "@/app/componentes/modal"

export default function SessaoConexaoWhatsApp( { instancia, status, emailUsuario }: {
    instancia: string | null
    status: "open" | "closed" | undefined
    emailUsuario: string
} ) {
    
    const [statusInstancia, setStatusInstancia] = useState(status)
    const [qrcode, setQrcode] = useState<string | undefined>(undefined)

    return (
        <>
            {statusInstancia && <p>Status: {statusInstancia === "open" ? <span className="text-green-500">Conectado</span> : <span className="text-red-500">Desconectado</span>}</p>}
            {statusInstancia === "open" && (
                <Btn onClick={async () => {

                    const toastId = toast.loading("Desconectando...")
                    
                    await desconectarWhatsApp(instancia!)
                    .then((result) => {

                        if (result.error) toast.error(result.error.message, {id: toastId})

                        toast.success("Seu WhatsApp foi desconectado! Conecte para enviar mensagens.", {id: toastId})

                    })
                    
                    setStatusInstancia("closed")

                }}
                className="bg-red-500">Desconectar</Btn>
            )}
            {instancia && statusInstancia !== "open" && (
                <>
                    <Btn onClick={async () => {

                        const toastId = toast.loading("Gerando QR Code...")

                        const result = await conectarWhatsApp(instancia)

                        if (result.error && !result.data?.qrcode) toast.error(result.error.message, {id: toastId})
                        
                        setQrcode(result.data!.qrcode)

                        return toast.success("QR Code gerado!", {id: toastId})

                    }}>Reconectar</Btn>
                </>
            )}
            {qrcode && (
                <Modal>
                    <h3>Seu QR Code</h3>
                    <ol className="flex flex-col gap-2 list-decimal list-inside">
                        <li>Abra seu WhatsApp</li>
                        <li>Acesse o menu vertical tocando no ícone no canto superior direito</li>
                        <li>Selecione a opção Dispositivos conectados</li>
                        <li>Aperte o botão Conectar dispositivo e escaneie o QR Code</li>
                    </ol>
                    <Image src={qrcode} width={200} height={200} alt="WhatsApp QR Code" />
                    <div className="flex gap-5">
                        <Btn onClick={async () => {
                            const toastId = toast.loading("Cancelando QR Code...")
                            await desconectarWhatsApp(instancia!)
                            .then((result) => {
                                if (result.error) toast.error(result.error.message, {id: toastId})
                                toast.success("QR Code cancelado!", {id: toastId})
                            })
                            setQrcode(undefined)
                        }}>
                            Cancelar
                        </Btn>
                        <Btn onClick={async () => {

                            const toastId = toast.loading("Gerando QR Code...")

                            const result = await conectarWhatsApp(instancia!)

                            if (result.error && !result.data?.qrcode) toast.error(result.error.message, {id: toastId})

                            setQrcode(result.data!.qrcode)

                            return toast.success("QR Code gerado!", {id: toastId})

                        }}>
                            Atualizar
                        </Btn>
                        <Btn onClick={() => {

                            const toastId = toast.loading("Verificando conexão...")

                            setTimeout(async () => {

                                const result = await verificarConexao(emailUsuario.replaceAll("@", "_").replaceAll(".", "_"))

                                if (result.error) {

                                    setQrcode(undefined)

                                    return toast.error("Não foi possível verificar a conexão do WhatsApp. Tente recarregar a página.", {id: toastId})

                                }

                                setQrcode(undefined)

                                setStatusInstancia("open")

                                return toast.success("WhatsApp conectado!", {id: toastId})

                            }, 4000)
                        }}>
                            Já lí o QR Code
                        </Btn>
                    </div>
                </Modal>
            )}
            {!instancia && (
                <>
                    <Btn onClick={async () => {

                        const toastId = toast.loading("Gerando QR Code...")

                        const resultCriarInstancia = await criarInstanciaWhatsApp(emailUsuario!)

                        if (resultCriarInstancia.error && !resultCriarInstancia.data?.instanceName) toast.error(resultCriarInstancia.error.message, { id: toastId })

                        const resultConectarWhatsApp = await conectarWhatsApp(resultCriarInstancia.data!.instanceName)

                        if (resultConectarWhatsApp.error && !resultConectarWhatsApp.data?.qrcode) toast.error(resultConectarWhatsApp.error.message, { id: toastId })
                        
                        setQrcode(resultConectarWhatsApp.data!.qrcode)

                        return toast.success("QR Code gerado!", { id: toastId })

                    }} className="bg-blue-500 p-2 rounded-lg text-white shadow-lg font-bold">Conectar</Btn>
                </>
            )}
        </>
    )
}