"use client"


import { TdBase } from "./tdBase";
import Textarea from "./textarea";
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useState } from "react";
import { Partes } from "@/app/lib/types/types";
import Link from "next/link";

export default function DesignationCard({data}: {
    data: Partes
}) {

    const [salvo, setSalvo] = useState<boolean>(false)

    return (
        <form className="flex flex-col gap-3" action={async (formData: FormData) => {

            const designacoes: Partes = {
                ...data,
                diaReuniao: formData.get("data_reuniao") as string,
                tesouros: data.tesouros.map((parte) => {
                    return {
                        ...parte,
                        participante: formData.get(parte.nome[0]) as string
                    }
                }),
                ministerio: data.ministerio.map((parte) => {
                    return {
                        ...parte,
                        participante: formData.get(parte.nome[0]) as string
                    }
                }),
                vida: data.vida.map(parte => {
                    return {
                        ...parte,
                        participante: formData.get(parte.nome[0]) as string
                    }
                }),
                outros: data.outros.map(parte => {
                    return {
                        ...parte,
                        participante: formData.get(parte.nome.toLowerCase().replaceAll(" ", "_").replaceAll("çã", "ca")) as string
                    }
                })
            }

            const designacoesSchema = z.object({
                id: z.string(),
                semana: z.string(),
                canticos: z.array(z.string()),
                capitulos: z.string(),
                diaReuniao: z.string(),
                tesouros: z.array(z.object({
                    id: z.string(),
                    nome: z.string(),
                    tempo: z.string(),
                    participante: z.string()
                })),
                ministerio: z.array(z.object({
                    id: z.string(),
                    nome: z.string(),
                    tempo: z.string(),
                    participante: z.string()
                })),
                vida: z.array(z.object({
                    id: z.string(),
                    nome: z.string(),
                    tempo: z.string(),
                    participante: z.string()
                })),
                outros: z.array(z.object({
                    id: z.string(),
                    nome: z.string(),
                    participante: z.string()
                }, {message: "Dados recebidos incorretos"}))
            })

            const resultZod = designacoesSchema.safeParse(designacoes)

            if (!resultZod.success) return toast.error(resultZod.error.message)

            const resutl = await fetch("/api/partes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(designacoes)
            })
            
            if (resutl.status !== 200) {
                return toast.error((await resutl.json()).error)
            }

            setSalvo(true)

            return toast.success("Designações salvas com sucesso!")
            
        }}>
            <table className="w-full border-2 min-w-[781px] print:min-w-0">
                {salvo && (
                    <div className="absolute -m-6 p-2 flex justify-center rounded-xl bg-green-200 text-green-800">
                        Salvo
                    </div>
                )}
                <tbody className="flex flex-col">
                    <tr className="grid grid-cols-[0.2fr_0.13fr_0.3fr_0.42fr] print:grid-cols-[0.2fr_0.13fr_0.25fr_0.42fr] border-b">
                        <TdBase className="border-r bg-[#d9d9d9] font-bold"><Textarea {...salvo ? {disabled: true} : ""} {...salvo ? {disabled: true} : ""} required name="data_reuniao" defaultValue={data?.diaReuniao} className="bg-transparent dark:text-gray-900" /></TdBase>
                        <TdBase className="border-r bg-[#d9d9d9] dark:text-gray-900 font-bold flex justify-center pl-0"><span className='dark:text-gray-900 flex justify-center'>{data?.canticos[0]}</span></TdBase>
                        <TdBase className="border-r flex items-center">Oração:<Textarea {...salvo ? {disabled: true} : ""} required name="oracao_inicial" /></TdBase>
                        <TdBase className="flex items-center">Comentários iniciais:<Textarea {...salvo ? {disabled: true} : ""} required name="presidente" /></TdBase>
                    </tr>
                    <tr className="grid grid-cols-[0.4fr_0.2fr] gap-20 border-b ">
                        <TdBase className="flex items-center justify-center border-r bg-teal-700 font-bold text-white"><span className='print:text-white flex justify-center text-white'>TESOUROS DA PALAVRA DE DEUS</span></TdBase>
                        <TdBase className="flex items-center justify-center px-2 border-x font-bold bg-[#7d4d98] text-white"><span className='print:text-white flex justify-center text-white'>{data?.capitulos}</span></TdBase>
                    </tr>
                    <tr className="grid grid-cols-[0.1fr_0.65fr_0.25fr] border-b pl-1">
                        <>
                            {data.tesouros.map((parte, index) => (
                                <>
                                    <TdBase className="flex justify-center border-r" key={`tempo-${index}`}>
                                        {parte.tempo}
                                    </TdBase>
                                    <TdBase className="pl-1 border-r" key={`parte-${index}`}>
                                        {parte.nome}
                                    </TdBase>
                                    <TdBase className="pl-1 flex items-center">
                                        -<Textarea {...salvo ? {disabled: true} : ""} required key={`participante-${index}`} name={parte.nome[0]} />
                                    </TdBase>
                                </>
                            ))}
                        </>
                    </tr>
                    <tr className="grid grid-cols-[0.4fr_0.6fr] gap-20 border-b">
                        <TdBase className="flex items-center justify-center border-r bg-yellow-600 font-bold text-white"><span className='print:text-white flex justify-center text-white'>FAÇA SEU MELHOR NO MINISTÉRIO</span></TdBase>
                    </tr>
                    <tr className="grid grid-cols-[0.1fr_0.65fr_0.25fr] border-b pl-1">
                        <>
                            {data.ministerio.map((parte, index) => (
                                <>
                                    <TdBase className="flex justify-center border-r" key={`tempo-${index}`}>
                                        {parte.tempo}
                                    </TdBase>
                                    <TdBase className="pl-1 border-r" key={`parte-${index}`}>
                                        {parte.nome}
                                    </TdBase>
                                    <TdBase className="pl-1 flex items-center">
                                       -<Textarea {...salvo ? {disabled: true} : ""} required key={`participante-${index}`} name={parte.nome[0]} />
                                    </TdBase>
                                </>
                            ))}
                        </>
                    </tr>
                    <tr className="grid grid-cols-[0.301fr_0.16fr] gap-56 border-b">
                        <TdBase className="flex items-center justify-center border-r bg-red-800 font-bold text-white"><span className='print:text-white flex justify-center text-white'>NOSSA VIDA CRISTÃ</span></TdBase>
                        <TdBase className="bg-[#d9d9d9] dark:text-gray-900 font-bold border-x pl-0 flex justify-center"><span className='dark:text-gray-900 flex justify-center'>{data?.canticos[1]}</span></TdBase>
                    </tr>
                    <tr className="grid grid-cols-[0.1fr_0.65fr_0.25fr] border-b pl-1">
                        <>
                            {data.vida.map((parte, index) => (
                                <>
                                    <TdBase className="flex justify-center border-r" key={`tempo-${index}`}>
                                        {parte.tempo}
                                    </TdBase>
                                    <TdBase className="pl-1 border-r" key={`parte-${index}`}>
                                        {parte.nome}
                                    </TdBase>
                                    <TdBase className="pl-1 flex items-center">
                                        -<Textarea {...salvo ? {disabled: true} : ""} required key={`participante-${index}`} name={parte.nome[0]} />
                                    </TdBase>
                                </>
                            ))}
                        </>
                    </tr>
                    <tr className="grid grid-cols-[0.13fr_0.25fr] justify-end border-b ">
                        <TdBase className="border-x">Leitor:</TdBase>
                        <TdBase>-<Textarea {...salvo ? {disabled: true} : ""} required name="leitor" /></TdBase>
                    </tr>
                    <tr className="grid grid-cols-[0.62fr_0.13fr_0.25fr] ">
                        <TdBase>Recapitulação e visão geral da próxima semana</TdBase>
                        <TdBase className="bg-[#d9d9d9] dark:text-gray-900 font-bold border-x pl-0 flex justify-center"><span className='dark:text-gray-900 flex justify-center'>{data?.canticos[2]}</span></TdBase>
                        <TdBase className="flex items-center">Oração: <Textarea {...salvo ? {disabled: true} : ""} required name="oracao_final" /></TdBase>
                    </tr>
                </tbody>
            </table>
            <div className="flex gap-3">
                <Link href={`mailto:thiagomatheus2001@hotmail.com?subject=Erro encontrado na semana ${data.semana}&body=Encontrei o seguinte erro: (Coloque o erro encontrado aqui)`} className="bg-red-500 hover:bg-red-400 p-2 rounded-lg dark:text-gray-900 shadow-lg font-bold cursor-pointer w-1/3 print:hidden flex flex-col items-center">Comunicar erro</Link>
                {!salvo && <input className="bg-blue-500 hover:bg-blue-400 p-2 rounded-lg shadow-lg font-bold cursor-pointer w-1/3 print:hidden flex flex-col items-center" type="submit" value="Salvar" />}
                {salvo && <Link href={`/designacoes?semana=${data.semana}`} className="bg-blue-500 hover:bg-blue-400 p-2 rounded-lg dark:text-gray-900 shadow-lg font-bold cursor-pointer w-1/3 print:hidden flex flex-col items-center">Ir para designacoes</Link>}
            </div>
        </form>
    );
}