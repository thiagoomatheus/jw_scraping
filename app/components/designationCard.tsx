import { Partes } from "../lib/types/types";
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
        <table className="w-full border border-black">
            <tbody className="flex flex-col">
                <tr className="grid grid-rows-1 md:grid-cols-[0.2fr_0.15fr_0.2fr_0.45fr] border-b border-black">
                    <td className="border-r border-black bg-[#d9d9d9] pl-2 font-bold">{data?.semana}</td>
                    <td className="border-r border-black bg-[#d9d9d9] pl-2 font-bold">{data?.canticos[0]}</td>
                    <td className="border-r border-black pl-2">Oração: Jonatã</td>
                    <td className="pl-2">Comentários iniciais: Jorge</td>
                </tr>
                <tr className="flex flex-row md:gap-[10%] border-b border-black">
                    <td className="border-r border-black px-8 bg-teal-700 font-bold text-white">TESOUROS DA PALAVRA DE DEUS</td>
                    <td className="border-x border-black px-4 font-bold bg-[#7d4d98] text-white">{data?.capitulos}</td>
                </tr>
                <tr className="grid grid-cols-1 md:grid-cols-[0.1fr_0.70fr_0.2fr] border-b border-black">
                    <td className="flex flex-col justify-center items-center border-r border-black">
                        <p>{data?.time[0]}</p>
                        <p>{data?.time[1]}</p>
                        <p>{data?.time[2]}</p>
                    </td>
                    <td className="flex flex-col justify-center items-start pl-2 border-r border-black">
                        <p>{data?.tesouros}</p>
                        <p>2. Jóias Espirituais</p>
                        <p>3. Leitura da Bíblia - {data?.leitura}</p>
                    </td>
                    <td className="flex flex-col justify-center items-start pl-2">
                        <p>- Participante 1</p>
                        <p>- Participante 2</p>
                        <p>- Participante 3</p>
                    </td>
                </tr>
                <tr className="flex flex-row border-b border-black">
                    <td className="border-r border-black px-8 bg-yellow-600 font-bold text-white">FAÇA SEU MELHOR NO MINISTÉRIO</td>
                </tr>
                <tr className="grid grid-cols-1 md:grid-cols-[0.1fr_0.70fr_0.2fr] border-b border-black">
                    <td className="flex flex-col justify-center items-center border-r border-black">
                        {timeMinistery.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </td>
                    <td className="flex flex-col justify-center items-start pl-2 border-r border-black">
                        {data?.ministerio.map((parte, i) => (
                            <p key={i}>{parte}</p>
                        ))}
                    </td>
                    <td className="flex flex-col justify-center items-start pl-2">
                        {timeMinistery.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </td>
                </tr>
                <tr className="flex flex-row gap-[25%] border-b border-black">
                    <td className="border-r border-black px-8 bg-red-800 font-bold text-white">NOSSA VIDA CRISTÃ</td>
                    <td className="bg-[#d9d9d9] px-2 font-bold border-x border-black">{data?.canticos[1]}</td>
                </tr>
                <tr className="grid grid-cols-1 md:grid-cols-[0.1fr_0.70fr_0.2fr] border-b border-black">
                    <td className="flex flex-col justify-center items-center border-r border-black">
                        {timeLife.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </td>
                    <td className="flex flex-col justify-center items-start pl-2 border-r border-black">
                        {data?.vida.map((parte, i) => (
                            <p key={i}>{parte}</p>
                        ))}
                    </td>
                    <td className="flex flex-col justify-center items-start pl-2">
                        {timeLife.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                    </td>
                </tr>
                <tr className="grid grid-rows-1 grid-cols-[0.15fr_0.2fr] justify-end border-b border-black">
                    <td className="border-x border-black pl-2">Leitor:</td>
                    <td className="pl-2">Participante</td>
                </tr>
                <tr className="grid grid-rows-1 grid-cols-[0.65fr_0.15fr_0.2fr] justify-start border-black">
                    <td className="pl-2 border-black">Recapitulação da Reunião e visão geral da próxima semana</td>
                    <td className="pl-2 border-x border-black">{data?.canticos[2]}</td>
                    <td className="pl-2">Oração Final: Darci</td>
                </tr>
            </tbody>
        </table>
    );
}