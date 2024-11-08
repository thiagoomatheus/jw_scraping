"use client"

import { Designacao, Parte, Semana, Usuario } from "@prisma/client";
import { useState } from "react";
import CartaoDeDesignacao from "./cartaoDeDesignacao";
import Btn from "@/app/minha-conta/components/btn";
import Modal from "@/app/componentes/modal";

export default function SecaoDeDesignacoes({ designacoes, autorizadoParaAcoes }: { 
    designacoes: (Designacao & { parteReference: Parte; semanaReference: Semana; usuarioReference: Usuario })[]
    autorizadoParaAcoes: boolean
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
                    <p>Obs: Apenas um filtro funciona por vez.</p>
                    <form className="flex flex-col gap-5">
                        <label className="flex gap-5 justify-between items-center">
                            <p>Semana:</p>
                            <select onChange={(e) => setDesignacoesFiltradas(designacoes.filter(designacao => designacao.semanaReference.semana === e.target.value))} name="semana">
                                <option disabled selected>Selecione uma semana</option>
                                {Array.from(semanas).map(semana => (
                                    <option key={semana} value={semana}>{semana}</option>
                                ))}
                            </select>
                        </label>
                        <label className="flex gap-5 justify-between items-center">
                            <p>Participante:</p>
                            <select onChange={(e) => setDesignacoesFiltradas(designacoes.filter(designacao => designacao.participante === e.target.value))} name="participante">
                                <option disabled selected>Selecione um participante</option>
                                {Array.from(participantes).map(participante => (
                                    <option key={participante} value={participante}>{participante}</option>
                                ))}
                            </select>
                        </label>
                    </form>
                    <Btn onClick={() => setModal(false)}>Fechar</Btn>
                </Modal>
            )}
            <section className="flex flex-col gap-5 md:grid md:grid-cols-2 xl:grid-cols-3 justify-center items-center w-full max-w-7xl">
                {designacoesFiltradas.map(designacao => (
                    <CartaoDeDesignacao key={designacao.id} designacao={designacao} excluir={filtrarExcluidas} autorizadoParaAcoes={autorizadoParaAcoes} />
                ))}
            </section>
                
        </>
    )
}