"use client"

import { useContext, useState } from "react"
import { DesignarContext } from "../lib/contexts/DesignarContext"
import CartaoDeSemana from "./CartaoDeSemana"
import Btn from "@/app/minha-conta/components/btn"
import Link from "next/link"
import useDesignacaoes from "../lib/hooks/useDesignacoes"
import DownloadPDFBtn from "./DownloadPDFBtn"
import toast from "react-hot-toast"

export default function SecaoDeDesignacoes() {

    const { semanas } = useContext(DesignarContext)!

    const [semana, setSemana] = useState<number>(1)
    const [salvo, setSalvo] = useState<boolean>(false)
    const { salvandoDesignacoes } = useDesignacaoes()

    if (!semanas || !semanas.length) return <p>Ocorreu um erro! Por favor, tente mais tarde.</p>

    return (
        <div className="flex flex-col gap-5 print:gap-[10px] overflow-auto pb-3 md:pb-0 impressao">
            {semana <= semanas.length && (
                <>
                    <h3>Semana {semana} / {semanas.length}</h3>
                    <CartaoDeSemana
                        key={semanas[semana-1].semana}
                        data={semanas[semana-1]}
                        visualizacao={false}
                        handleProximo={() => {
                            setSemana(semana + 1)
                            if (semana === semanas.length) {
                                return toast.success("Salve suas designações para poder notificar os participantes ou faça o download do PDF.")
                            }
                        }}
                    >
                        <div className={`flex flex-row gap-5 ${semana === 1 ? "justify-end" : "justify-between"} items-center w-full`}>
                            {semana > 1 && <Btn onClick={() => setSemana(semana - 1)}>Anterior</Btn>}
                            <Btn className="cursor-pointer">
                                <input className="cursor-pointer" type="submit" value="Próximo" />
                            </Btn>
                        </div>
                    </CartaoDeSemana>
                    
                </>
            )}
            {semana > semanas.length && (
                <>
                    <h1 className="hidden print:block rounded-lg text-center">Reunião Nossa Vida e Ministério</h1>
                    {salvo && 
                        <div className="absolute -m-6 p-2 flex justify-center rounded-xl bg-green-200 text-green-800">
                            Salvo
                        </div>
                    }
                    {semanas.map((semana) => (
                        <CartaoDeSemana
                            key={semana.semana}
                            data={semana}
                            visualizacao={true}
                        />
                    ))}
                    <div className="flex flex-row gap-5 justify-end print:hidden">
                        {!salvo && (
                            <Btn 
                                onClick={async () => await salvandoDesignacoes(semanas, setSalvo)} 
                                className="bg-blue-500 hover:bg-blue-400 p-2 rounded-lg shadow-lg font-bold cursor-pointer print:hidden flex flex-col items-center"
                            >
                                Salvar
                            </Btn>
                        )}

                        {salvo &&
                            <Link
                                href={`/designacoes`}
                                className="bg-blue-500 hover:bg-blue-400 p-2 rounded-lg dark:text-gray-900 shadow-lg font-bold cursor-pointer w-1/3 print:hidden flex flex-col items-center"
                            >
                                Ir para designações
                            </Link>
                        }
                        {semanas && <DownloadPDFBtn designacoes={semanas} />}
                    </div>
                </>
            )}
        </div>
    )
}