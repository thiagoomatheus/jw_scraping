import Image from "next/image";
import DesignacaoImagem from "@/public/files.svg"
import Link from "next/link";

export default function Apresentacao() {
    return (
        <div
            className="flex flex-col md:flex-row justify-between items-center h-full bg-white dark:bg-gray-900 md:gap-10 xl:gap-40 w-full"
        >
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-4">
                <h1 className="font-black font-redhat">
                    Faça as designações da reunião Vida e Ministério <span className="text-blue-600 dark:text-blue-400">em poucos minutos</span>
                </h1>
                <p className="text-lg mt-4 text-gray-700 dark:text-gray-300">
                    O processo de designação irá ficar bem mais simples e rápido. Em instantes você seleciona as semanas, os participantes e os notifica.
                </p>
                <Link href="/designar" className="text-sm w-fit lg:text-lg px-8 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-3xl hover:bg-blue-700 dark:hover:bg-blue-600">
                    Quero começar agora
                </Link>
            </div>
            <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
                <Image
                    src={DesignacaoImagem}
                    alt="Designação"
                    className="w-64 h-auto md:w-96 md:h-96 object-contain"
                />
            </div>
        </div>

    );
}