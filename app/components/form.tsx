"use client"

import "react-day-picker/style.css";
import useForm from "../lib/hooks/useForm"
import SectionTitle from "./sectionTitle"
import { Calendar } from "./calendar";
import Instructions from "./instructions";
import DesignationCard from "./designationCard";
import toast from "react-hot-toast";

export default function Form() {
    const { layout, data, comecar, inserirLayout, getPartes } = useForm()
    return (
        <div className="flex flex-col w-full border gap-3 p-3 rounded-lg" >
            {!data && layout === null && (
                <>
                    <Instructions />
                    <button className="bg-blue-500 p-2 rounded-lg text-white shadow-lg font-bold" onClick={comecar}>Começar</button>
                </>
            )}
            {!data && layout === undefined && (
                <SectionTitle title="Layout">
                    <form className="flex flex-col items-center w-full gap-3" action={inserirLayout}>
                        <p>Selecione o layout que deseja:</p>
                        <div className="flex flex-col md:flex-row gap-5">
                            <label className="flex flex-col justify-start items-center gap-5">
                                <p className="font-bold">Quinzenal</p>
                                <div className="w-32 h-48 border flex flex-col gap-1 p-1 justify-between">
                                    <div className="border h-full"></div>
                                    <div className="border h-full"></div>
                                </div>
                                <input className="bg-blue-500 p-2 rounded-lg text-white shadow-lg font-bold" required type="radio" name="layout" value="quinzenal" />
                            </label>
                            <label className="flex flex-col justify-start items-center gap-5">
                                <p className="font-bold">Mensal Padrão</p>
                                <div className="w-32 h-48 border flex flex-col gap-1 p-1 justify-between">
                                    <div className="border h-full"></div>
                                    <div className="border h-full"></div>
                                    <div className="border h-full"></div>
                                    <div className="border h-full"></div>
                                </div>
                                <input className="bg-blue-500 p-2 rounded-lg text-white shadow-lg font-bold" required type="radio" name="layout" value="mensal_padrao" />
                            </label>
                            <label className="flex flex-col justify-start items-center gap-5">
                                <p className="font-bold">Mensal Especial</p>
                                <div className="w-32 h-48 border flex flex-col gap-1 p-1 justify-between">
                                    <div className="border h-full"></div>
                                    <div className="border h-full"></div>
                                    <div className="border h-full"></div>
                                    <div className="border h-full"></div>
                                    <div className="border h-full"></div>
                                </div>
                                <input className="bg-blue-500 p-2 rounded-lg text-white shadow-lg font-bold" required type="radio" name="layout" value="mensal_especial" />
                            </label>
                        </div>
                        <button className="bg-blue-500 px-3 py-2 rounded-lg text-white shadow-lg w-fit font-bold self-end" type="submit" value="Próximo">Próximo</button>
                    </form>
                </SectionTitle>
            )}
            {!data && layout && (
                <SectionTitle title="Semana Inicial">
                    <div className="flex flex-col gap-5">
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
                            <button className="bg-blue-500 px-3 py-2 rounded-lg text-white shadow-lg w-fit font-bold self-end" type="submit" value="Próximo">Próximo</button>
                        </form>
                    </div>
                </SectionTitle>
            )}
            {data && (
                <SectionTitle classname="md:flex-col" title="Participantes">
                    <p>Muito bom! Nós já temos todas as partes das semanas selecionadas e é nesse momento que você entra em ação.</p>
                    <p> Veja que temos campos digitáveis para cada parte, assim, você poderá digitar o nome dos participantes. Os campos digitáveis estão indicados com uma borda pontilhada como o exemplo abaixo 👇👇</p>
                    <div className="border-2 border-dashed w-52 h-7 rounded border-teal-700" />
                    <p>Caso esteja num dispositivo com tela menor você terá de rolar para a direita a fim de escontrar os campos digitáveis das partes. Para voltar, basta rolar para a esquerda.</p>
                    <div className="md:hidden flex justify-between">
                        <p>👈👈👈</p>
                        <p>👉👉👉</p>
                    </div>
                    <div className="flex flex-col gap-5 overflow-auto pb-3 md:pb-0">
                        {data.map((parte, i) => (
                            <DesignationCard key={i} data={parte} />
                        ))}
                    </div>
                </SectionTitle>
            )}
        </div>
    )
}