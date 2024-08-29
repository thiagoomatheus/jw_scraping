"use client"

import "react-day-picker/style.css";
import useForm from "../lib/hooks/useForm"
import SectionTitle from "./sectionTitle"
import { Calendar } from "./calendar";
import Instructions from "./instructions";
import DesignationCard from "./designationCard";

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
                        <form className="flex flex-col items-center w-full gap-3" action={getPartes}>
                            <label className="flex flex-col gap-5">
                                <Calendar />
                            </label>
                            <button className="bg-blue-500 px-3 py-2 rounded-lg text-white shadow-lg w-fit font-bold self-end" type="submit" value="Próximo">Próximo</button>
                        </form>
                    </div>
                </SectionTitle>
            )}
            {data && (
                <>
                    {data.map((parte, i) => (
                        <DesignationCard key={i} data={parte} />
                    ))}
                </>
            )}
        </div>
    )
}