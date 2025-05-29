"use client"

import { Designacao, Parte, Semana, Usuario } from "@prisma/client";
import { useEffect, useState } from "react";
import CartaoDeDesignacao from "./cartaoDeDesignacao";
import Btn from "@/app/minha-conta/components/btn";
import Modal from "@/app/componentes/modal";
import { Contato } from "@/app/lib/types/types";
import { useRouter, useSearchParams } from "next/navigation";

export default function SecaoDeDesignacoes({ designacoes, autorizadoParaAcoes, contatos }: { 
    designacoes: (Designacao & { parteReference: Parte; semanaReference: Semana; usuarioReference: Usuario })[]
    autorizadoParaAcoes: boolean
    contatos: Contato[]
}) {

    const searchParams = useSearchParams()

    const dataFiltro = searchParams.get("data")
    const participanteFiltro = searchParams.get("participante")

    useEffect(() => {

        if (!dataFiltro && !participanteFiltro) {
            setDesignacoesFiltradas(designacoes)
        }

        if (dataFiltro && participanteFiltro) {
            setDesignacoesFiltradas(designacoes.filter(designacao => designacao.diaReuniao === dataFiltro).filter(designacao => designacao.participante === participanteFiltro))
        } else if (dataFiltro) {
            setDesignacoesFiltradas(designacoes.filter(designacao => designacao.diaReuniao === dataFiltro))
        } else if (participanteFiltro) {
            setDesignacoesFiltradas(designacoes.filter(designacao => designacao.participante === participanteFiltro))
        }
    }, [dataFiltro, participanteFiltro, designacoes])

    const [designacoesFiltradas, setDesignacoesFiltradas] = useState<(Designacao & { parteReference: Parte; semanaReference: Semana; usuarioReference: Usuario })[]>(designacoes)

    const [modal, setModal] = useState<boolean>(false)

    const semanas = new Set<string>(designacoes.map(designacao => designacao.diaReuniao))

    const participantes = new Set<string>(designacoes.map(designacao => designacao.participante))

    function filtrarExcluidas(id:string) {
        setDesignacoesFiltradas(designacoes.filter(designacao => designacao.id !== id))
    }

    const router = useRouter()

    return (
        <>
            <Btn onClick={() => setModal(true)}>Filtrar</Btn>

            {modal && (

                <Modal>

                    <div className="flex justify-between items-center w-full">
                        <h3>Filtrar</h3>
                        <Btn className="bg-red-700" onClick={() => setModal(false)}>X</Btn>
                    </div>

                    <form
                        className="flex flex-col gap-5"
                        action={(formData: FormData) => {

                            const diaReuniao = formData.get("diaReuniao") as string | null
                            const participante = formData.get("participante") as string | null

                            console.log(diaReuniao, participante);

                            if (!diaReuniao && !participante) {
                                router.push("/designacoes")
                            }

                            if (diaReuniao && participante) {
                                router.push(`?${new URLSearchParams({data: diaReuniao, participante: participante})}`)
                            } else if (diaReuniao) {
                                router.push(`?${new URLSearchParams({data: diaReuniao})}`)
                            } else if (participante) {
                                router.push(`?${new URLSearchParams({participante: participante})}`)
                            }

                            setModal(false)
                        }}
                    >
                        <label className="grid grid-cols-[0.5fr_1fr] gap-5 justify-between items-center">

                            <p>Data da reunião:</p>

                            <select
                                name="diaReuniao"
                            >
                                <option
                                    disabled
                                    selected
                                >
                                    Selecione uma data
                                </option>

                                {Array.from(semanas).map(semana => (
                                    <option
                                        key={semana}
                                        value={semana}
                                    >
                                        {semana}
                                    </option>
                                ))}

                            </select>

                        </label>

                        <label className="grid grid-cols-[0.5fr_1fr] gap-5 justify-between items-center">

                            <p>Participante:</p>

                            <select
                                name="participante"
                            >

                                <option
                                    disabled
                                    selected
                                >
                                    Selecione um participante
                                </option>

                                {Array.from(participantes).map(participante => (
                                    <option
                                        key={participante}
                                        value={participante}
                                    >
                                        {participante}
                                    </option>
                                ))}

                            </select>

                        </label>

                        <div className="flex justify-end items-center gap-5">
                            <Btn type="submit">Aplicar</Btn>
                            {(dataFiltro || participanteFiltro) && <Btn className="bg-red-700" onClick={() => router.push("/designacoes")}>Limpar</Btn>}
                        </div>

                    </form>

                    

                </Modal>
            )}
            <section className="flex flex-col gap-5 md:grid md:grid-cols-2 xl:grid-cols-3 justify-center items-center w-full max-w-7xl">
                {designacoesFiltradas.map(designacao => (

                    <CartaoDeDesignacao
                        key={designacao.id}
                        designacao={designacao}
                        excluir={filtrarExcluidas}
                        autorizadoParaAcoes={autorizadoParaAcoes}
                        contatos={contatos}
                    />

                ))}
            </section>
                
        </>
    )
}