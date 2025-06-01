"use client"

import { TdBase } from "./tdBase";
import Textarea from "./textarea";
import toast from 'react-hot-toast';
import { Partes } from "@/app/lib/types/types";
import Link from "next/link";
import { Tooltip } from "@/app/componentes/Tooltip";
import useForm from "../lib/hooks/useDesignacoes";

export default function CartaoDeSemana({data, children, visualizacao, handleProximo}: {
    data: Partes
    visualizacao: boolean
    handleProximo?: () => void
    children?: React.ReactNode
}) {

    const { adicionandoDesignacoes } = useForm()

    return (
        <form
            className="flex flex-col gap-3"
            action={(formData: FormData) => {
                const result = adicionandoDesignacoes(formData, data)
                if (result !== true || !handleProximo) return toast.error("Erro ao adicionar designações. Reinicie o processo!")
                handleProximo()
            }}
        >
            <table className="w-full border-2 min-w-[781px] print:min-w-0" >
                <tbody className="flex flex-col" >

                    <tr className="grid grid-cols-[0.2fr_0.13fr_0.3fr_0.42fr] print:grid-cols-[0.2fr_0.13fr_0.25fr_0.42fr] border-b" >
                        <TdBase className="border-r bg-[#d9d9d9] font-bold" >
                            {!visualizacao ?
                                    <Textarea
                                    required
                                    name="data_reuniao"
                                    defaultValue={data?.diaReuniao}
                                    className="bg-transparent dark:bg-transparent dark:text-gray-900" 
                                /> :
                                <span className="dark:text-gray-900">{data?.diaReuniao}</span>
                            }
                        </TdBase>

                        <TdBase className="border-r bg-[#d9d9d9] dark:text-gray-900 font-bold flex justify-center pl-0" >
                            <span className='dark:text-gray-900 flex justify-center' >
                                {data?.canticos[0]}
                            </span>
                        </TdBase>

                        <TdBase className="border-r flex items-center" >
                            Oração:{!visualizacao ? 
                                        <Textarea required name="oracao_inicial" defaultValue={data?.outros.find((parte) => parte.nome === "Oração Inicial")?.participante} /> 
                                        : data?.outros.find((parte) => parte.nome === "Oração Inicial")?.participante
                                    }
                        </TdBase>

                        <TdBase className="flex items-center" >
                            Comentários iniciais:{!visualizacao ? 
                                                    <Textarea required name="presidente" defaultValue={data?.outros.find((parte) => parte.nome === "Presidente")?.participante} /> 
                                                    : data?.outros.find((parte) => parte.nome === "Presidente")?.participante
                                                }
                        </TdBase>
                    </tr>

                    <tr className="grid grid-cols-[0.4fr_0.2fr] gap-20 border-b" >
                        <TdBase className="flex items-center justify-center border-r bg-teal-700 font-bold text-white" >
                            <span className='print:text-white flex justify-center text-white' >
                                TESOUROS DA PALAVRA DE DEUS
                            </span>
                        </TdBase>

                        <TdBase className="flex items-center justify-center px-2 border-x font-bold bg-[#7d4d98] text-white" >
                            <span className='print:text-white flex justify-center text-white' >
                                {data?.capitulos}
                            </span>
                        </TdBase>
                    </tr>

                    <tr className="grid grid-cols-[0.1fr_0.65fr_0.25fr] border-b pl-1" >
                        <>
                            {data.tesouros.map((parte, index) => (
                                <>
                                    <TdBase
                                        className="flex justify-center border-r"
                                        key={`tempo-${index}`}
                                    >
                                        {parte.tempo}
                                    </TdBase>

                                    <TdBase
                                        className="pl-1 border-r"
                                        key={`parte-${index}`}
                                    >
                                        {parte.nome}
                                    </TdBase>

                                    <TdBase className="pl-1 flex items-center" >
                                        -{!visualizacao ?
                                            <Textarea
                                                required
                                                key={`participante-${index}`}
                                                name={parte.nome[0]}
                                                defaultValue={parte.participante}
                                            /> :
                                            parte.participante
                                        }
                                    </TdBase>
                                </>
                            ))}
                        </>
                    </tr>

                    <tr className="grid grid-cols-[0.4fr_0.6fr] gap-20 border-b">
                        <TdBase className="flex items-center justify-center border-r bg-yellow-600 font-bold text-white">
                            <span className='print:text-white flex justify-center text-white'>
                                FAÇA SEU MELHOR NO MINISTÉRIO
                            </span>
                        </TdBase>
                    </tr>

                    <tr className="grid grid-cols-[0.1fr_0.65fr_0.25fr] border-b pl-1">
                        <>
                            {data.ministerio.map((parte, index) => (
                                <>
                                    <TdBase
                                        className="flex justify-center border-r"
                                        key={`tempo-${index}`}
                                    >
                                        {parte.tempo}
                                    </TdBase>

                                    <TdBase
                                        className="pl-1 border-r"
                                        key={`parte-${index}`}
                                    >
                                        {parte.nome}
                                    </TdBase>

                                    <TdBase className="pl-1 flex items-center">
                                        -{!visualizacao ?
                                            <Textarea
                                                required
                                                key={`participante-${index}`}
                                                name={parte.nome[0]}
                                                defaultValue={parte.participante}
                                            /> :
                                            parte.participante
                                        }
                                    </TdBase>
                                </>
                            ))}
                        </>
                    </tr>

                    <tr className="grid grid-cols-[0.301fr_0.16fr] gap-56 border-b">
                        <TdBase className="flex items-center justify-center border-r bg-red-800 font-bold text-white">
                            <span className='print:text-white flex justify-center text-white'>
                                NOSSA VIDA CRISTÃ
                            </span>
                        </TdBase>

                        <TdBase className="bg-[#d9d9d9] dark:text-gray-900 font-bold border-x pl-0 flex justify-center">
                            <span className='dark:text-gray-900 flex justify-center'>
                                {data?.canticos[1]}
                            </span>
                        </TdBase>
                    </tr>

                    <tr className="grid grid-cols-[0.1fr_0.65fr_0.25fr] border-b pl-1">
                        <>
                            {data.vida.map((parte, index) => (
                                <>
                                    <TdBase
                                        className="flex justify-center border-r"
                                        key={`tempo-${index}`}
                                    >
                                        {parte.tempo}
                                    </TdBase>

                                    <TdBase
                                        className="pl-1 border-r"
                                        key={`parte-${index}`}
                                    >
                                        {parte.nome}
                                    </TdBase>
                                    
                                    <TdBase className="pl-1 flex items-center">
                                        -{!visualizacao ?
                                            <Textarea
                                                required
                                                key={`participante-${index}`}
                                                name={parte.nome[0]}
                                                defaultValue={parte.participante}
                                            /> :
                                            parte.participante
                                        }
                                    </TdBase>
                                </>
                            ))}
                        </>
                    </tr>

                    <tr className="grid grid-cols-[0.13fr_0.25fr] justify-end border-b">
                        <TdBase className="border-x">
                            Leitor:
                        </TdBase>

                        <TdBase>
                            -{!visualizacao ? 
                                <Textarea required name="leitor" defaultValue={data?.outros.find((parte) => parte.nome === "Leitor")?.participante} /> 
                                : data?.outros.find((parte) => parte.nome === "Leitor")?.participante
                            }
                        </TdBase>
                    </tr>

                    <tr className="grid grid-cols-[0.62fr_0.13fr_0.25fr]">
                        <TdBase>
                            Recapitulação e visão geral da próxima semana
                        </TdBase>

                        <TdBase className="bg-[#d9d9d9] dark:text-gray-900 font-bold border-x pl-0 flex justify-center">
                            <span className='dark:text-gray-900 flex justify-center'>
                                {data?.canticos[2]}
                            </span>
                        </TdBase>

                        <TdBase className="flex items-center">
                            Oração: {!visualizacao ? 
                                        <Textarea required name="oracao_final" defaultValue={data?.outros.find((parte) => parte.nome === "Oração Final")?.participante} /> 
                                        : data?.outros.find((parte) => parte.nome === "Oração Final")?.participante
                                    }
                        </TdBase>
                    </tr>

                </tbody>
            </table>

            {!visualizacao && (
                <>
                
                    <div className="flex">

                        <Tooltip content="Se achou algum erro nas designações, por favor, nos informe clicando no botão abaixo!"> 
                            <Link
                                target="_blank"
                                href={`mailto:thiagomatheus2001@hotmail.com?subject=Erro encontrado na semana ${data.semana}&body=Encontrei o seguinte erro: (Coloque o erro encontrado aqui)`}
                                className="bg-red-500 hover:bg-red-600 p-2 rounded-lg dark:text-gray-900 shadow-lg font-bold cursor-pointer print:hidden flex flex-col items-center"
                            >
                                Comunicar erro
                            </Link>
                        </Tooltip>

                    </div>

                    {children}

                </>
            )}
        </form>
    );
}