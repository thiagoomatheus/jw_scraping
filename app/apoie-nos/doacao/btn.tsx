import Link from "next/link";

export default function Btn({tipo}: {tipo: "unico" | "recorrente"}) {

    const linkPagamentoUnico = "https://sandbox.asaas.com/c/phdfgj6xdmdke44x"
    const linkPagamentoRecorrente = "https://sandbox.asaas.com/c/c9w7ll553bt9au2p"

    return (
        <Link href={tipo === "unico" ? linkPagamentoUnico : linkPagamentoRecorrente} target="_blank">
            <button className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Doar valor {tipo === "unico" ? "único" : "recorrente"}
            </button>
        </Link>
    )
}