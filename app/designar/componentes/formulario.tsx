"use client"

import React from "react";
import "react-day-picker/style.css";
import useForm from "../../lib/hooks/useForm"
import SectionTitle from "./sectionTitle"
import { Calendar } from "./calendar";
import Instrucoes from "../../componentes/instrucoes";
import CardDesignacao from "./designationCard";
import toast from "react-hot-toast";
import Btn from "@/app/minha-conta/components/btn";
import Layout from "./layout";

export default function Formulario() {
    const { layout, data, comecar, inserirLayout, getPartes } = useForm()
    return (
        <div className="flex flex-col w-full gap-3 p-3 rounded-lg" >
            {!data && layout === null && (
                <>
                    <p className="text-center">Começe a designar as partes da reunião Vida e Ministério agora mesmo. A baixo estão as instruções para você relembrar.</p>
                    <p className="text-center">Quando estiver pronto, clique no botão Iniciar.</p>
                    <Instrucoes />
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg text-white shadow-lg font-bold"
                </>
            )}
            {!data && layout === undefined && (
                <SectionTitle title="Layout" classname="bg-yellow-400">
                    <form className="flex flex-col items-center w-full gap-3" action={inserirLayout}>
                        <p>Selecione o layout que deseja:</p>
                        <div className="flex flex-col md:flex-row gap-5">
                            <Layout quantidadeDeSemanas={1} />
                            <Layout quantidadeDeSemanas={2} />
                            <Layout quantidadeDeSemanas={4} />
                        </div>
                            className="bg-yellow-400 px-3 py-2 rounded-lg text-white dark:text-gray-900 shadow-lg w-fit font-bold self-end hover:bg-yellow-500"
                    </form>
                </SectionTitle>
            )}
            {!data && layout && (
                <SectionTitle title="Semana Inicial" classname="bg-purple-400">
                    <div className="flex flex-col w-full items-center justify-center gap-5">
                        <p>Agora, selecione a semana em que as designações vão comecar.</p>
                        <form className="flex flex-col items-center w-full gap-3" action={async (formData: FormData) => {
                            const toastLoading = toast.loading("Buscando partes na apostila...")
                            getPartes(formData)
                            .then(result => {
                                if (result === undefined) return toast.success("Dados encontrados", { id: toastLoading })
                                toast.error(result, { id: toastLoading })
                            }) 
                        }}>
                            <label className="flex flex-col gap-5">
                                <Calendar />
                            </label>
                                className="bg-purple-400 hover:bg-purple-500 px-3 py-2 rounded-lg text-white dark:text-gray-900 shadow-lg w-fit font-bold self-end"
                        </form>
                    </div>
                </SectionTitle>
            )}
            {data && (
                <SectionTitle classname="bg-blue-400" title="Participantes">
                    <p>Muito bom! Nós já temos todas as partes das semanas selecionadas e é nesse momento que você entra em ação.</p>
                    <p> Veja que temos campos digitáveis para cada parte, assim, você poderá digitar o nome dos participantes. Os campos digitáveis estão indicados com uma borda pontilhada como o exemplo abaixo 👇👇</p>
                    <div className="border-2 border-dashed w-52 h-7 rounded border-teal-700 dark:border-teal-500" />
                    <p>Caso esteja num dispositivo com tela menor você terá de rolar para a direita a fim de escontrar os campos digitáveis das partes. Para voltar, basta rolar para a esquerda.</p>
                    <div className="md:hidden flex justify-between">
                        <p>👈👈👈</p>
                        <p>👉👉👉</p>
                    </div>
                    <div className="flex flex-col gap-5 print:gap-[10px] overflow-auto pb-3 md:pb-0 impressao">
                        <h1 className="hidden print:block rounded-lg text-center">Nossa Vida e Ministério</h1>
                        {data.map((parte) => (
                            <CardDesignacao key={parte.semana} data={parte} />
                        ))}
                        <Btn className="self-end print:hidden" onClick={() => window.print()}>
                            Imprimir
                        </Btn>
                    </div>
                </SectionTitle>
            )}
        </div>
    )
}