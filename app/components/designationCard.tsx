"use client"

import React from 'react';
import { Partes } from "../lib/types/types";
import { TdBase } from "./tdBase";
import Textarea from "./textarea";
import { z } from 'zod';
import toast from 'react-hot-toast';
export default function designationCard({data}: {
    data: Partes
}) {
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
                return toast.error("Algo deu errado, tente novamente mais tarde")
            }

            return toast.success("Designações salvas com sucesso!")
            
        }}>
            <table className="w-full border border-black min-w-[781px]">
                <tbody className="flex flex-col">
                    <tr className="grid grid-cols-[0.2fr_0.13fr_0.31fr_0.42fr] border-b border-black">
                        <TdBase className="border-r bg-[#d9d9d9] font-bold"><Textarea required name="data_reuniao" defaultValue={data?.diaReuniao} className="bg-transparent" /></TdBase>
                        <TdBase className="border-r bg-[#d9d9d9] font-bold flex justify-center pl-0">{data?.canticos[0]}</TdBase>
                        <TdBase className="border-r flex items-center">Oração: <Textarea required name="oracao_inicial" /></TdBase>
                        <TdBase className="flex items-center">Comentários iniciais: <Textarea required name="presidente" /></TdBase>
                    </tr>
                    <tr className="grid grid-cols-[0.4fr_0.2fr] gap-20 border-b border-black">
                        <TdBase className="flex items-center justify-center border-r bg-teal-700 font-bold text-white">TESOUROS DA PALAVRA DE DEUS</TdBase>
                        <TdBase className="flex items-center justify-center px-2 border-x font-bold bg-[#7d4d98] text-white">{data?.capitulos}</TdBase>
                    </tr>
                    <tr>
                        <TdBase key={"tesouros"} className="grid grid-cols-[0.1fr_0.65fr_0.25fr] border-b pl-1">
                            {data.tesouros.map((parte, index) => (
                                <>
                                    <p className="flex justify-center border-r border-black" key={`tempo-${index}`}>{parte.tempo}</p>
                                    <p className="pl-1 border-r border-black" key={`parte-${index}`}>{parte.nome}</p>
                                    <p className="pl-1 flex items-center">-<Textarea required key={`participante-${index}`} name={parte.nome[0]} /></p>
                                </>
                            ))}
                        </TdBase>
                    </tr>
                    <tr className="grid grid-cols-[0.4fr_0.6fr] gap-20 border-b border-black">
                        <TdBase className="flex items-center justify-center border-r bg-yellow-600 font-bold text-white">FAÇA SEU MELHOR NO MINISTÉRIO</TdBase>
                    </tr>
                    <tr>
                        <TdBase className="grid grid-cols-[0.1fr_0.65fr_0.25fr] border-b pl-1">
                            {data.ministerio.map((parte, index) => (
                                <>
                                    <p className="flex justify-center border-r border-black" key={`tempo-${index}`}>{parte.tempo}</p>
                                    <p className="pl-1 border-r border-black" key={`parte-${index}`}>{parte.nome}</p>
                                    <p className="pl-1 flex items-center">-<Textarea required key={`participante-${index}`} name={parte.nome[0]} /></p>
                                </>
                            ))}
                        </TdBase>
                    </tr>
                    <tr className="grid grid-cols-[0.301fr_0.16fr] gap-56 border-b border-black">
                        <TdBase className="flex items-center justify-center border-r bg-red-800 font-bold text-white">NOSSA VIDA CRISTÃ</TdBase>
                        <TdBase className="bg-[#d9d9d9] font-bold border-x pl-0 flex justify-center">{data?.canticos[1]}</TdBase>
                    </tr>
                    <tr>
                        <TdBase className="grid grid-cols-[0.1fr_0.65fr_0.25fr] border-b pl-1">
                            {data.vida.map((parte, index) => (
                                <>
                                    <p className="flex justify-center border-r border-black" key={`tempo-${index}`}>{parte.tempo}</p>
                                    <p className="pl-1 border-r border-black" key={`parte-${index}`}>{parte.nome}</p>
                                    <p className="pl-1 flex items-center">-<Textarea required key={`participante-${index}`} name={parte.nome[0]} /></p>
                                </>
                            ))}
                        </TdBase>
                    </tr>
                    <tr className="grid grid-cols-[0.13fr_0.25fr] justify-end border-b border-black">
                        <TdBase className="border-x">Leitor:</TdBase>
                        <TdBase>-<Textarea required name="leitor" /></TdBase>
                    </tr>
                    <tr className="grid grid-cols-[0.62fr_0.13fr_0.25fr] border-black">
                        <TdBase>Recapitulação e visão geral da próxima semana</TdBase>
                        <TdBase className="bg-[#d9d9d9] font-bold border-x pl-0 flex justify-center">{data?.canticos[2]}</TdBase>
                        <TdBase className="flex items-center">Oração: <Textarea required name="oracao_final" /></TdBase>
                    </tr>
                </tbody>
            </table>
            <input className="bg-blue-500 p-2 rounded-lg text-white shadow-lg font-bold cursor-pointer w-1/3" type="submit" value="Salvar" />
        </form>
    );
}