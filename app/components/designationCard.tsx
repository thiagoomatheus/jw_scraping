import { Partes } from "../lib/types/types";
import { TdBase } from "./tdBase";
import Textarea from "./textarea";
export default function designationCard({data}: {
    data?: Partes
}) {
    const timeMinistery: string[] = []
    for (let i = 0; i < data!.ministerio.length; i++) {
        timeMinistery.push(data!.time[3 + i])
    }
    const timeLife: string[] = []
    for (let i = 0; i < data!.vida.length; i++) {
        timeLife.push(data!.time[3 + data!.ministerio.length + i])
    }
    return (
        <table className="w-full border border-black min-w-[750px]">
            <tbody className="flex flex-col">
                <tr className="grid grid-cols-[0.2fr_0.14fr_0.25fr_0.45fr] border-b border-black">
                    <TdBase className="border-r bg-[#d9d9d9] font-bold"><Textarea defaultValue={data?.semana} className="bg-transparent"></Textarea></TdBase>
                    <TdBase className="border-r bg-[#d9d9d9] font-bold">{data?.canticos[0]}</TdBase>
                    <TdBase className="border-r flex items-center">Oração: <Textarea /></TdBase>
                    <TdBase className="flex items-center">Comentários iniciais: <Textarea /></TdBase>
                </tr>
                <tr className="grid grid-cols-[0.4fr_0.2fr] gap-20 border-b border-black">
                    <TdBase className="flex items-center justify-center border-r bg-teal-700 font-bold text-white">TESOUROS DA PALAVRA DE DEUS</TdBase>
                    <TdBase className="flex items-center justify-center px-2 border-x font-bold bg-[#7d4d98] text-white">{data?.capitulos}</TdBase>
                </tr>
                <tr className="grid grid-cols-[0.1fr_0.65fr_0.25fr] border-b border-black">
                    <TdBase className="flex flex-col justify-center items-center border-r">
                        <p>{data?.time[0]}</p>
                        <p>{data?.time[1]}</p>
                        <p>{data?.time[2]}</p>
                    </TdBase>
                    <TdBase className="flex flex-col justify-center items-start border-r">
                        <p>{data?.tesouros}</p>
                        <p>2. Jóias Espirituais</p>
                        <p>3. Leitura da Bíblia - {data?.leitura}</p>
                    </TdBase>
                    <TdBase className="flex flex-col justify-center items-start">
                        <p className="flex items-center">-<Textarea /></p>
                        <p className="flex items-center">-<Textarea /></p>
                        <p className="flex items-center">-<Textarea /></p>
                    </TdBase>
                </tr>
                <tr className="grid grid-cols-[0.4fr_0.6fr] gap-20 border-b border-black">
                    <TdBase className="flex items-center justify-center border-r bg-yellow-600 font-bold text-white">FAÇA SEU MELHOR NO MINISTÉRIO</TdBase>
                </tr>
                <tr className="grid grid-cols-[0.1fr_0.65fr_0.25fr] border-b border-black">
                    <TdBase className="flex flex-col justify-center items-center border-r">
                        {timeMinistery.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </TdBase>
                    <TdBase className="flex flex-col justify-center items-start border-r border-black">
                        {data?.ministerio.map((parte, i) => (
                            <p key={i}>{parte}</p>
                        ))}
                    </TdBase>
                    <TdBase className="flex flex-col justify-center items-start">
                        {timeMinistery.map((_, index) => (
                            <p key={`participante-${index}`}className="flex items-center">-<Textarea /></p>
                        ))}
                    </TdBase>
                </tr>
                <tr className="grid grid-cols-[0.4fr_0.18fr] gap-52 border-b border-black">
                    <TdBase className="flex items-center justify-center border-r bg-red-800 font-bold text-white">NOSSA VIDA CRISTÃ</TdBase>
                    <TdBase className="bg-[#d9d9d9] font-bold border-x">{data?.canticos[1]}</TdBase>
                </tr>
                <tr className="grid grid-cols-[0.1fr_0.65fr_0.25fr] border-b border-black">
                    <TdBase className="flex flex-col justify-center items-center border-r">
                        {timeLife.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </TdBase>
                    <TdBase className="flex flex-col justify-center items-start border-r">
                        {data?.vida.map((parte, i) => (
                            <p key={i}>{parte}</p>
                        ))}
                    </TdBase>
                    <TdBase className="flex flex-col justify-center items-start">
                        {timeLife.map((_, index) => (
                            <p key={`participante-${index}`}className="flex items-center">-<Textarea /></p>
                        ))}
                    </TdBase>
                </tr>
                <tr className="grid grid-cols-[0.149fr_0.251fr] justify-end border-b border-black">
                    <TdBase className="border-x">Leitor:</TdBase>
                    <TdBase>-<Textarea /></TdBase>
                </tr>
                <tr className="grid grid-rows-1 grid-cols-[0.6fr_0.15fr_0.251fr] justify-start border-black">
                    <TdBase>Recapitulação e visão geral da próxima semana</TdBase>
                    <TdBase className="bg-[#d9d9d9] font-bold border-x">{data?.canticos[2]}</TdBase>
                    <TdBase className="flex items-center">Oração: <Textarea /></TdBase>
                </tr>
            </tbody>
        </table>
    );
}