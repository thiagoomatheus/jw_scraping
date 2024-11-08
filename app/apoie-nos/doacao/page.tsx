import Btn from "./btn";

export default function Page() {
    return (
        <section className="flex flex-col gap-5 justify-center items-center w-full max-w-7xl">
            <h1>Doação</h1>
            
            <div className="py-12 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">Você escolhe o valor</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Você pode escolher entre doar um valor uma única vez ou doar um valor recorrente
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Único</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-300"></p>
                        <p className="text-sm text-gray-400 dark:text-gray-500"></p>

                        <ul className="mt-6 space-y-4 text-gray-700 dark:text-gray-300 flex-grow">
                            <li className="flex items-center"><span className="mr-2">✔</span> Valor mínimo de R$ 5,00</li>
                            <li className="flex items-center"><span className="mr-2">✔</span> Transação processada por Asaas</li>
                            <li className="flex items-center"><span className="mr-2">✔</span> Cartão de Crédito</li>
                        </ul>

                        <Btn tipo="unico"/>
                    </div>

                    <div className="flex flex-col bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Recorrente</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-300"></p>
                        <p className="text-sm text-gray-400 dark:text-gray-500"></p>

                        <ul className="mt-6 space-y-4 text-gray-700 dark:text-gray-300 flex-grow">
                            <li className="flex items-center"><span className="mr-2">✔</span> Valor mínimo de R$ 5,00</li>
                            <li className="flex items-center"><span className="mr-2">✔</span> Transação processada por Asaas</li>
                            <li className="flex items-center"><span className="mr-2">✔</span> Cartão de Crédito</li>
                            <li className="flex items-center"><span className="mr-2">✔</span> Valor cobrado mensalmente</li>
                        </ul>

                        <Btn tipo="recorrente"/>
                    </div>

                </div>
            </div>
        </section>
    )
}