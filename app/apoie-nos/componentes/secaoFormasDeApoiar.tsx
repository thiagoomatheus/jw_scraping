export default function SecaoFormasDeApoiar() {
    return (
        <div className="py-6 flex flex-col gap-10">
            <div className="text-center flex flex-col gap-5">
                <h3 className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
                    Sua Ajuda é Bem-Vinda
                </h3>
                <h2 className="font-bold text-gray-900 dark:text-gray-100">
                    Descubra algumas formas <br />
                    de apoiar o projeto
                </h2>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center md:items-start lg:justify-around gap-8 mt-4">
                <div className="text-center">
                    <div className="bg-blue-600 dark:bg-blue-500 rounded-full p-4 inline-block">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e8eaed"
                            className="dark:fill-gray-200"
                        >
                            <path
                                d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"
                            />
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold mt-4 text-gray-800 dark:text-gray-200">Feedback</h4>
                    <p className="text-gray-500 dark:text-gray-400 max-w-60">
                        Você pode contribuir reportando uma falha, sugerindo uma melhoria ou sugerindo uma correção.
                    </p>
                    <p><a className="underline-offset-8 underline hover:text-blue-600 dark:hover:text-blue-400" href="/apoie-nos/feedback">Clique aqui</a></p>
                </div>

                <div className="text-center">
                    <div className="bg-blue-600 dark:bg-blue-500 rounded-full p-4 inline-block">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e8eaed"
                            className="dark:fill-gray-200"
                        >
                            <path
                                d="m480-336 128-184H494l80-280H360v320h120v144ZM400-80v-320H280v-480h400l-80 280h160L400-80Zm80-400H360h120Z"
                            />
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold mt-4 text-gray-800 dark:text-gray-200">Compartilhe</h4>
                    <p className="text-gray-500 dark:text-gray-400 max-w-60">
                        Lembra de alguém que seria ajudado pelo projeto? Compartilhe com ele! Quanto mais pessoas usando essa ferramenta melhor ela será.
                    </p>
                </div>

                <div className="text-center">
                    <div className="bg-blue-600 dark:bg-blue-500 rounded-full p-4 inline-block">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e8eaed"
                            className="dark:fill-gray-200"
                        >
                            <path
                                d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"
                            />
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold mt-4 text-gray-800 dark:text-gray-200">Doação</h4>
                    <p className="text-gray-500 dark:text-gray-400 max-w-60">
                        O desenvolvimento de um projeto como esse envolve custos. Você poderá fazer uma doação única ou recorrente.
                    </p>
                    <p><a className="underline-offset-8 underline hover:text-blue-600 dark:hover:text-blue-400" href="/apoie-nos/doacao">Clique aqui</a></p>
                </div>
            </div>
        </div>

    )
}