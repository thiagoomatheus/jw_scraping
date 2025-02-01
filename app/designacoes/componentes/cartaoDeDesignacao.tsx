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
import { Contato } from "@/app/lib/types/types"
import AccordionContatoParticipante from "./accordionContatoParticipante"

export default function CartaoDeDesignacao( { designacao, excluir, autorizadoParaAcoes, contatos }: {
    designacao: (Designacao & { parteReference: Parte; semanaReference: Semana; usuarioReference: Usuario })
    excluir: (id: string) => void
    autorizadoParaAcoes: boolean
    contatos: Contato[]
} ) {

    const [participante, setParticipante] = useState(designacao.participante)
    const [editar, setEditar] = useState<boolean>(false)
    const [modal, setModal] = useState<"telefone" | "mensagem">()
    const [checked, setChecked] = useState<boolean>(false);
    const [parametrosDaMensagem, setParametrosDaMensagem] = useState<{
        telefone: string
        momentoDaNotificacao: "agora" | "semana",
        formaDeTratamento: string,
        obs: boolean,
        obsText: string
        nome: boolean,
        tempo: boolean,
    }>({
        telefone: "",
        momentoDaNotificacao: "agora",
        formaDeTratamento: "nenhum",
        obs: false,
        obsText: "",
        nome: false,
        tempo: false,
    })

    console.log(parametrosDaMensagem)

    return (
        <div className={`flex flex-col gap-5 border-t-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 p-6 ${designacao.parteReference.secao === "ministerio" ? "border-yellow-700" : designacao.parteReference.secao === "vida" ? "border-red-700" : designacao.parteReference.secao === "tesouros" ? "border-gray-700" : "dark:border-white border-blue-400"}`}>
            {modal === "telefone" && autorizadoParaAcoes && (
                <Modal>
                    <h3>Notifique o participante</h3>
                    <form className="flex flex-col gap-3" action={async (dados: FormData) => {
                        const toastId = toast.success("Escolha os parâmetros da mensagem")
                        const telefone = dados.get("telefone") as string
                        const momentoDaNotificacao = dados.get("momento_da_notificacao") as "agora" | "semana"
                        const regexPhone: RegExp = /^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/
                        if (!telefone || !regexPhone.test(telefone)) return toast.error("Telefone inválido", { id: toastId })
                        if (!momentoDaNotificacao) return toast.error("Selecione quando irá notificar", { id: toastId })
                        setParametrosDaMensagem({
                            ...parametrosDaMensagem,
                            telefone: telefone,
                            momentoDaNotificacao: momentoDaNotificacao,
                        })
                        setModal("mensagem")
                    }}>
                        <AccordionContatoParticipante contatos={contatos} />
                        <p>Selecione quando irá notificar:</p>
                        <div className="flex flex-row gap-3">
                            <label className="w-full flex border p-2 border-blue-300 rounded-lg flex-row gap-2 justify-between cursor-pointer">
                                <p>Agora</p>
                                <input required className="border border-blue-400 appearance-none rounded-full checked:bg-blue-300 p-3" type="radio" name="momento_da_notificacao" value="agora" />
                            </label>
                            <label className="w-full flex border p-2 border-blue-300 rounded-lg flex-row gap-2 justify-between cursor-pointer">
                                <p>Na semana</p>
                                <input required className="border border-blue-400 appearance-none rounded-full checked:bg-blue-300 p-3" type="radio" name="momento_da_notificacao" value="semana" />
                            </label>
                        </div>
                        <p className="text-[8px] lg:text-[10px]">Atenção: Ao selecionar a opção &quot;Na semana&quot; é necessário salvar o número do participante em nosso banco de dados. Assim, ao selecionar essa opção entendemos que você tem o consentimento dele para isso.</p>
                        <div className="flex gap-3">
                            <Btn className="bg-red-500 hover:bg-red-400" onClick={() => {
                                setModal(undefined)
                                setParametrosDaMensagem({
                                    telefone: "",
                                    momentoDaNotificacao: "agora",
                                    formaDeTratamento: "",
                                    obs: false,
                                    obsText: "",
                                    nome: false,
                                    tempo: false,
                                })
                            }}>Cancelar</Btn>
                            <Btn className="bg-green-500 hover:bg-green-400" type="submit">Continuar</Btn>
                        </div>
                    </form>
                </Modal>
            )}
            {modal === "mensagem" && autorizadoParaAcoes && (
                <Modal>
                    <h3>Mensagem</h3>
                    {/* <p>Confirme a mensagem a ser enviada. Lembre-se que você poderá usar as <a className="underline font-bold hover:text-blue-400" href="https://faq.whatsapp.com/539178204879377/?helpref=uf_share" target="_blank">formatações do WhatsApp</a>.</p>
                    <form className="flex w-full flex-col gap-3" action={async (dados: FormData) => {
                        const toastId = toast.loading("Notificando ...")
                        const mensagem = dados.get("mensagem") as string
                        const resultado = await notificarParticipante(designacao.id, notificacao?.telefone!, notificacao?.momentoDaNotificacao!, mensagem)
                        if (resultado.error) return toast.error(resultado.error.message, { id: toastId })
                        toast.success(resultado.data.message, { id: toastId })
                        setModal(undefined)
                    }}>
                        <textarea className="border-solid border border-blue-300 w-full min-h-48 p-2" required defaultValue={`
Olá irmão, tudo bem?

Passando para confirmar sua designação para o dia ${designacao.diaReuniao}:

*Designação: ${designacao.parteReference.nome}*

Por favor, confirme sua participação.

Obrigado!`
                        } name="mensagem" />
                        <div className="flex gap-3">
                            <Btn className="bg-red-500 hover:bg-red-400" onClick={() => setModal(undefined)}>Cancelar</Btn>
                            <Btn className="bg-green-500 hover:bg-green-400" type="submit">Enviar</Btn>
                        </div>
                    </form> */}
                    <p>Selecione alguns parâmetros da mensagem:</p>
                    <form action={async () => {
                        const toastId = toast.success("Notificando ...")
                        const resultado = await notificarParticipante(designacao.id, parametrosDaMensagem)
                        if (resultado.error) return toast.error(resultado.error.message, { id: toastId })
                        toast.success(resultado.data.message, { id: toastId })
                        setModal(undefined)
                        setParametrosDaMensagem({
                            telefone: "",
                            momentoDaNotificacao: "agora",
                            formaDeTratamento: "",
                            obs: false,
                            obsText: "",
                            nome: false,
                            tempo: false,
                        })
                    }} className="flex flex-col w-full gap-3">
                       <fieldset className="flex flex-row gap-3 justify-between border border-blue-300 p-2 rounded-md">
                           <legend>Forma de tratamento:</legend>
                           <label className="flex flex-col justify-center items-center gap-1">
                                <p>Irmão</p>
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParametrosDaMensagem({
                                    ...parametrosDaMensagem,
                                    [e.target.name]: e.target.value
                                })} type="radio" name="formaDeTratamento" value="irmão" />
                           </label>
                           <label className="flex flex-col justify-center items-center gap-1">
                                <p>Irmã</p>
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParametrosDaMensagem({
                                    ...parametrosDaMensagem,
                                    [e.target.name]: e.target.value
                                })} type="radio" name="formaDeTratamento" value="irmã" />
                           </label>
                           <label className="flex flex-col justify-center items-center gap-1">
                                <p>Nenhum</p>
                                <input 
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParametrosDaMensagem({
                                        ...parametrosDaMensagem,
                                        [e.target.name]: e.target.value
                                    })} 
                                    type="radio" 
                                    name="formaDeTratamento" 
                                    value="nenhum"
                                    defaultChecked
                                />
                           </label>
                       </fieldset>
                       <fieldset className="flex flex-row gap-3 justify-between border border-blue-300 p-2 rounded-md">
                           <legend>Selecione o que incluir na mensagem:</legend>
                           <label className="flex flex-col justify-center items-center gap-1">
                                <p>Observação</p>
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParametrosDaMensagem({
                                    ...parametrosDaMensagem,
                                    obs: !parametrosDaMensagem.obs,
                                    obsText: ""
                                })} type="checkbox" name="obs" />
                           </label>
                           <label className="flex flex-col justify-center items-center gap-1">
                                <p>Nome</p>
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParametrosDaMensagem({
                                    ...parametrosDaMensagem,
                                    nome: !parametrosDaMensagem.nome
                                })} type="checkbox" name="nome" />
                           </label>
                           <label className="flex flex-col justify-center items-center gap-1">
                                <p>Tempo</p>
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setParametrosDaMensagem({
                                    ...parametrosDaMensagem,
                                    tempo: !parametrosDaMensagem.tempo
                                })} type="checkbox" name="tempo" />
                           </label>
                       </fieldset>
                       <fieldset className={`flex flex-row gap-3 justify-between border border-blue-300 p-2 rounded-md ${!parametrosDaMensagem.obs && "opacity-50"}`}>
                            <legend>Observação:</legend>
                            <label className="flex flex-col justify-center items-center gap-1 w-full">
                                <p>Insira a observação</p>
                                <textarea placeholder="Máximo de 150 caracteres" maxLength={150} name="obsText" {...(!parametrosDaMensagem.obs && { disabled: true })} className="border-solid border border-blue-300 w-full p-2 bg-transparent" onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setParametrosDaMensagem({
                                    ...parametrosDaMensagem,
                                    obsText: e.target.value
                                })} value={parametrosDaMensagem.obsText} />
                           </label>
                       </fieldset>
                       <fieldset className="flex flex-col gap-3 justify-between border border-blue-300 p-2 rounded-md w-full">
                            <legend>Confira a mensagem:</legend>
                            {parametrosDaMensagem.formaDeTratamento === "nenhum" && !parametrosDaMensagem.nome && <p>Olá, tudo bem?</p>}
                            {parametrosDaMensagem.formaDeTratamento !== "nenhum" && !parametrosDaMensagem.nome && <p>Olá {parametrosDaMensagem.formaDeTratamento}, tudo bem?</p>}
                            {parametrosDaMensagem.formaDeTratamento === "nenhum" && parametrosDaMensagem.nome && <p>Olá {designacao.participante}, tudo bem?</p>}
                            {parametrosDaMensagem.formaDeTratamento !== "nenhum" && parametrosDaMensagem.nome && <p>Olá {parametrosDaMensagem.formaDeTratamento} {designacao.participante}, tudo bem?</p>}
                            <p>Passando para confirmar sua designação para o dia {designacao.diaReuniao}:</p>
                            <p className="font-bold">Designação: {designacao.parteReference.nome}</p>
                            {parametrosDaMensagem.tempo && <p className="font-bold">Tempo: {designacao.parteReference.tempo ? designacao.parteReference.tempo : "N/A"}</p>}
                            {parametrosDaMensagem.obs && parametrosDaMensagem.obsText && <p><span className="font-bold">Obs.:</span> {parametrosDaMensagem.obsText}</p>}
                            <p>Por favor, confirme sua participação.</p>
                            <p>Obrigado!</p>
                       </fieldset>
                        <div className="flex gap-3">
                            <Btn className="bg-red-500 hover:bg-red-400" onClick={() => {
                                setModal(undefined)
                                setParametrosDaMensagem({
                                    telefone: "",
                                    momentoDaNotificacao: "agora",
                                    formaDeTratamento: "",
                                    obs: false,
                                    obsText: "",
                                    nome: false,
                                    tempo: false
                                })
                            }}>Cancelar</Btn>
                            <Btn className="bg-green-500 hover:bg-green-400" type="submit">Enviar</Btn>
                        </div>
                    </form>
                </Modal>
            )}
            <p><span className="font-bold">Semana:</span> {designacao.semanaReference.semana}</p>
            <p><span className="font-bold">Descrição:</span> {designacao.parteReference.nome}</p>
            <p className="flex"><span className="font-bold">Participante:</span> <Textarea className={`dark:bg-gray-800 ${editar ? "border" : "border-none"}`} value={participante} {...!editar ? { disabled: true } : { disabled: false }} onChange={(e) => setParticipante(e.target.value)} /></p>
            <p>Tempo: {designacao.parteReference.tempo ? designacao.parteReference.tempo : "N/A"}</p>
            <p>Criada por: {designacao.usuarioReference.nome}</p>
            {autorizadoParaAcoes && 
                <div className="flex gap-5">
                    {!editar && (
                        <>
                            <Btn className="bg-green-500 hover:bg-green-400" onClick={() => {
                                setModal("telefone")
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