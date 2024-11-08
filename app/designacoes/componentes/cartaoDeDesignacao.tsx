"use client"

import { Designacao, Parte, Semana, Usuario } from "@prisma/client"
import { useState } from "react"
import { editarParticipante } from "../lib/actions/editarParticipante"
import toast from "react-hot-toast"
import { notificarParticipante } from "../lib/actions/notificarParticipante"
import { excluirDesignacao } from "../lib/actions/excluirDesignacao"
import Modal from "@/app/componentes/modal"
import Textarea from "@/app/designar/componentes/textarea"
import Btn from "@/app/minha-conta/components/btn"

export default function CartaoDeDesignacao( { designacao, excluir, autorizadoParaAcoes }: {
    designacao: (Designacao & { parteReference: Parte; semanaReference: Semana; usuarioReference: Usuario })
    excluir: (id: string) => void
    autorizadoParaAcoes: boolean
} ) {

    const [participante, setParticipante] = useState(designacao.participante)
    const [editar, setEditar] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)

    return (
        <div className={`flex flex-col gap-5 border-t-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6 ${designacao.parteReference.secao === "ministerio" ? "border-yellow-700" : designacao.parteReference.secao === "vida" ? "border-red-700" : designacao.parteReference.secao === "tesouros" ? "border-gray-700" : "dark:border-white border-blue-400"}`}>
            {modal && autorizadoParaAcoes && (
                <Modal>
                    <h3>Notifique o participante</h3>
                    <p>Para notificar o participante, informe o número do WhatsApp dele.</p>
                    <form className="flex flex-col gap-3" action={async (dados: FormData) => {
                        const toastId = toast.loading("Notificando...")
                        const telefone = dados.get("telefone") as string
                        const momentoDaNotificacao = dados.get("momento_da_notificacao") as "agora" | "semana"
                        const regexPhone: RegExp = /^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/
                        if (!telefone || !regexPhone.test(telefone)) return toast.error("Telefone inválido", { id: toastId })
                        const resultado = await notificarParticipante(designacao, telefone, momentoDaNotificacao)
                        if (resultado.error) return toast.error(resultado.error.message, { id: toastId })
                        toast.success(resultado.data.message, { id: toastId })
                        setModal(false)
                    }}>
                        <label>WhatsApp do participante:
                            <input className="border-2 border-blue-300 w-full" required type="tel" name="telefone" />
                        </label>
                        <p>Selecione quando irá notificar:</p>
                        <label className="flex border p-2 border-blue-300  rounded-lg flex-row gap-5 justify-between">
                            <p>Agora</p>
                            <input required className="border border-blue-400 appearance-none rounded-full checked:bg-blue-300 p-3" type="radio" name="momento_da_notificacao" value="agora" />
                        </label>
                        <label className="flex border p-2 border-blue-300 rounded-lg flex-row gap-5 justify-between">
                        <p>Na semana</p>
                            <input required className="border border-blue-400 appearance-none rounded-full checked:bg-blue-300 p-3" type="radio" name="momento_da_notificacao" value="semana" />
                        </label>
                        <p>Atenção: Ao selecionar a opção &quot;Na semana&quot; é necessário salvar o número do participante em nosso banco de dados. Assim, ao selecionar essa opção entendemos que você tem o consentimento dele para isso.</p>
                        <div className="flex gap-3">
                            <Btn className="bg-red-500 hover:bg-red-400" onClick={() => setModal(false)}>Cancelar</Btn>
                            <Btn className="bg-green-500 hover:bg-green-400" type="submit">Notificar</Btn>
                        </div>
                    </form>
                </Modal>
            )}
            <p><span className="font-bold">Semana:</span> {designacao.semanaReference.semana}</p>
            <p><span className="font-bold">Descrição:</span> {designacao.parteReference.nome}</p>
            <p className="flex"><span className="font-bold">Participante:</span> <Textarea className={`bg-gray-800 ${editar ? "border" : "border-none"}`} value={participante} {...!editar ? { disabled: true } : { disabled: false }} onChange={(e) => setParticipante(e.target.value)} /></p>
            <p>Tempo: {designacao.parteReference.tempo ? designacao.parteReference.tempo : "N/A"}</p>
            <p>Criada por: {designacao.usuarioReference.nome}</p>
            {autorizadoParaAcoes && 
                <div className="flex gap-5">
                    {!editar && (
                        <>
                            <Btn className="bg-green-500 hover:bg-green-400" onClick={() => {
                                setModal(true)
                            }}>Notificar</Btn>
                            <Btn onClick={() => setEditar(true)}>Editar</Btn>
                            <Btn className="bg-red-500 hover:bg-red-400" onClick={async () => {
                                const resultado = await excluirDesignacao(designacao.id, designacao.usuarioReference.id)
                                if (resultado.error) return toast.error(resultado.error.message)
                                excluir(designacao.id)
                                return toast.success(resultado.data.message)
                            }}>Excluir</Btn>
                        </>
                    )}
                    {editar && (
                        <>
                            <Btn className="bg-red-500 hover:bg-red-400" onClick={() => {
                                setParticipante(designacao.participante)
                                setEditar(false)
                            }}>Cancelar</Btn>
                            <Btn onClick={async () => {
                                const resultado = await editarParticipante(participante, designacao.id)
                                if (resultado.error) {
                                    setEditar(false)
                                    setParticipante(designacao.participante)
                                    return toast.error(resultado.error.message)
                                }
                                setEditar(false)
                                return toast.success(resultado.data.message)
                            }}>Salvar</Btn>
                        </>
                    )}
                </div>
            }
        </div>
    )
}