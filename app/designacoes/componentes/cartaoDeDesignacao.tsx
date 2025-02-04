"use client"

import { Designacao, Parte, Semana, Usuario } from "@prisma/client"
import { useReducer, useRef, useState } from "react"
import toast from "react-hot-toast"
import Modal from "@/app/componentes/modal"
import Textarea from "@/app/designar/componentes/textarea"
import Btn from "@/app/minha-conta/components/btn"
import { Contato } from "@/app/lib/types/types"
import AccordionContatoParticipante from "./accordionContatoParticipante"
import { editarParticipante, excluirDesignacao, notificarParticipante } from "../lib/actions/actions"

type ParametrosNotificacao = {
    telefone: string
    momentoDaNotificacao: "agora" | "semana"
    formaDeTratamento: "nenhum" | "irmão" | "irmã"
    obs: boolean
    obsText: string
    nome: boolean,
    tempo: boolean,
    modal: "telefone" | "mensagem" | undefined
}

const estadoInicial: ParametrosNotificacao = {
    telefone: "",
    momentoDaNotificacao: "agora",
    formaDeTratamento: "nenhum",
    obs: false,
    obsText: "",
    nome: false,
    tempo: false,
    modal: undefined
}

type NotificacoesReducerType = {
    type: "iniciandoNotificacao" | "adicionandoTelefoneEMomentoDaNotificacao" | "adicionandoFormaDeTratamento" | "adicionandoObs" | "resetandoParametros" | "adicionandoNome" | "adicionandoTempo"
    telefone?: string,
    momentoDaNotificacao?: "agora" | "semana",
    formaDeTratamento?: "nenhum" | "irmão" | "irmã",
    obs?: boolean,
    obsText?: string
    nome?: boolean,
    tempo?: boolean
}

function notificacoesReducer(state: ParametrosNotificacao, action: NotificacoesReducerType): ParametrosNotificacao {
    switch (action.type) {
        case "iniciandoNotificacao":
            return {
             ...state,
             modal: "telefone"
            }
        case "adicionandoTelefoneEMomentoDaNotificacao":
            return {
                ...state,
                telefone: action.telefone || state.telefone,
                momentoDaNotificacao: action.momentoDaNotificacao || state.momentoDaNotificacao,
                modal: "mensagem"
            }
        case "adicionandoFormaDeTratamento":
            return {
                ...state,
                formaDeTratamento: action.formaDeTratamento || state.formaDeTratamento
            }
        case "adicionandoObs":
            return {
                ...state,
                obs: action.obs !== undefined ? action.obs : state.obs,
                obsText: action.obsText || state.obsText
            }
        case "adicionandoNome":
            return {
                ...state,
                nome: action.nome !== undefined ? action.nome : state.nome
            }
        case "adicionandoTempo":
            return {
                ...state,
                tempo: action.tempo !== undefined ? action.tempo : state.tempo
            }
        case "resetandoParametros":
            return {
                ...estadoInicial
            }
        default:
            return state
    }
}

export default function CartaoDeDesignacao( { designacao, excluir, autorizadoParaAcoes, contatos }: {
    designacao: (Designacao & { parteReference: Parte; semanaReference: Semana; usuarioReference: Usuario })
    excluir: (id: string) => void
    autorizadoParaAcoes: boolean
    contatos: Contato[]
} ) {

    const [participante, setParticipante] = useState(designacao.participante)
    const [editar, setEditar] = useState<boolean>(false)
    const [parametros, dispatch] = useReducer(notificacoesReducer, estadoInicial)

    const nomeInputRef = useRef<HTMLInputElement>(null)
    const tempoInputRef = useRef<HTMLInputElement>(null)
    const obsInputRef = useRef<HTMLInputElement>(null)

    return (
            {parametros.modal === "telefone" && autorizadoParaAcoes && (
                <Modal>
                    <h3>Notifique o participante</h3>
                    <form className="flex flex-col gap-3" action={async (dados: FormData) => {

                        const toastId = toast.success("Escolha os parâmetros da mensagem")

                            dispatch({
                                type: "adicionandoTelefoneEMomentoDaNotificacao",
                                telefone: telefone,
                                momentoDaNotificacao: momentoDaNotificacao
                            })
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
                                onClick={() => dispatch({ type: "resetandoParametros" })}
                        </div>
                    </form>
                </Modal>
            )}
            {parametros.modal === "mensagem" && autorizadoParaAcoes && (
                <Modal>
                    <h3>Mensagem</h3>
                    <p>Selecione alguns parâmetros da mensagem:</p>
                            dispatch({ type: "resetandoParametros" })
                                <p>Irmão</p>
                                        dispatch({ type: "adicionandoFormaDeTratamento", formaDeTratamento: e.target.value as "irmão" })
                                <p>Irmã</p>
                                        dispatch({ type: "adicionandoFormaDeTratamento", formaDeTratamento: e.target.value as "irmã" })
                                <p>Nenhum</p>
                                        dispatch({ type: "adicionandoFormaDeTratamento", formaDeTratamento: e.target.value as "nenhum" })
                                    value="nenhum"
                                    defaultChecked
                                />
                           </label>
                       </fieldset>
                       <fieldset className="flex flex-row gap-3 justify-between border border-blue-300 p-2 rounded-md">
                           <legend>Selecione o que incluir na mensagem:</legend>
                           <label className="flex flex-col justify-center items-center gap-1">
                                <p>Observação</p>
                                    onChange={() => dispatch({ type: "adicionandoObs", obs: obsInputRef.current?.checked })}
                                    type="checkbox"
                                    name="obs"
                                    ref={obsInputRef}
                                <p>Nome</p>
                                    onChange={() => dispatch({ type: "adicionandoNome", nome: nomeInputRef.current?.checked })}
                                    type="checkbox"
                                    name="nome"
                                    ref={nomeInputRef}
                                <p>Tempo</p>
                                    onChange={() => dispatch({ type: "adicionandoTempo", tempo: tempoInputRef.current?.checked })}
                                    type="checkbox"
                                    name="tempo"
                                    ref={tempoInputRef}
                            <legend>Observação:</legend>
                            <label className="flex flex-col justify-center items-center gap-1 w-full">
                                <p>Insira a observação</p>
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch({ type: "adicionandoObs", obsText: e.target.value })} value={parametros.obsText}
                            <legend>Confira a mensagem:</legend>
                            {parametros.formaDeTratamento === "nenhum" && !parametros.nome && <p>Olá, tudo bem?</p>}
                            {parametros.formaDeTratamento !== "nenhum" && !parametros.nome && <p>Olá {parametros.formaDeTratamento}, tudo bem?</p>}
                            {parametros.formaDeTratamento === "nenhum" && parametros.nome && <p>Olá {designacao.participante}, tudo bem?</p>}
                            {parametros.formaDeTratamento !== "nenhum" && parametros.nome && <p>Olá {parametros.formaDeTratamento} {designacao.participante}, tudo bem?</p>}

                            <p>Passando para confirmar sua designação para o dia {designacao.diaReuniao}:</p>
                            <p className="font-bold">Designação: {designacao.parteReference.nome}</p>
                            {parametros.tempo && <p className="font-bold">Tempo: {designacao.parteReference.tempo ? designacao.parteReference.tempo : "N/A"}</p>}
                            {parametros.obs && parametros.obsText && <p><span className="font-bold">Obs.:</span> {parametros.obsText}</p>}
                            <p>Por favor, confirme sua participação.</p>
                            <p>Obrigado!</p>
                                onClick={() => dispatch({ type: "resetandoParametros" })}
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
                                onClick={() => dispatch({ type: "iniciandoNotificacao" })}
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