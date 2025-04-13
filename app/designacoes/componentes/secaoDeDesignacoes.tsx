"use client"

import { Designacao, Parte, Semana, Usuario } from "@prisma/client";
import { useState } from "react";
import CartaoDeDesignacao from "./cartaoDeDesignacao";
import Btn from "@/app/minha-conta/components/btn";
import Modal from "@/app/componentes/modal";
import { Contato } from "@/app/lib/types/types";

export default function SecaoDeDesignacoes({ designacoes, autorizadoParaAcoes, contatos }: { 
    designacoes: (Designacao & { parteReference: Parte; semanaReference: Semana; usuarioReference: Usuario })[]
    autorizadoParaAcoes: boolean
    contatos: Contato[]
}) {

    const [designacoesFiltradas, setDesignacoesFiltradas] = useState<(Designacao & { parteReference: Parte; semanaReference: Semana; usuarioReference: Usuario })[]>(designacoes)

    const [modal, setModal] = useState<boolean>(false)

    const semanas = new Set<string>(designacoes.map(designacao => designacao.semanaReference.semana))

    const participantes = new Set<string>(designacoes.map(designacao => designacao.participante))

    function filtrarExcluidas(id:string) {
        setDesignacoesFiltradas(designacoes.filter(designacao => designacao.id !== id))
    }

    return (
        <>
            <Btn onClick={() => setModal(true)}>Filtrar</Btn>

            {modal && (

                <Modal>

                    <h3>Filtrar</h3>

                    <form
                        className="flex flex-col gap-5"
                        action={(formData: FormData) => {

                            const diaReuniao = formData.get("diaReuniao") as string | null
                            const participante = formData.get("participante") as string | null

                            console.log(diaReuniao, participante);

                            if (!diaReuniao && !participante) {
                                setDesignacoesFiltradas(designacoes)
                            }

                            if (diaReuniao && participante) {
                                setDesignacoesFiltradas(designacoes.filter(designacao => designacao.semanaReference.semana === diaReuniao).filter(designacao => designacao.participante === participante))
                            } else if (diaReuniao) {
                                setDesignacoesFiltradas(designacoes.filter(designacao => designacao.semanaReference.semana === diaReuniao))
                            } else if (participante) {
                                setDesignacoesFiltradas(designacoes.filter(designacao => designacao.participante === participante))
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

                        <Btn type="submit">Aplicar</Btn>

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