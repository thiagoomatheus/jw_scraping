export default function Instrucoes() {
    return (
        <section className="w-full flex flex-col gap-5">
            <h2 id="instrucoes" className="self-center gradient-txt p-2">Instruções</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
            <div className="border-t-4 border-yellow-400 rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center mb-4">Selecione o layout <span className="ml-2">⚡</span></h3>
                <p className="text-gray-600 dark:text-gray-300">Você poderá escolher entre 1 semana, 2 semanas ou 4 semanas.</p>
            </div>

            <div className="border-t-4 border-purple-400 rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center mb-4">Selecione a semana <span className="ml-2">📊</span></h3>
                <p className="text-gray-600 dark:text-gray-300">Selecione no calendário a semana onde as designações vão começar.</p>
            </div>

            <div className="border-t-4 border-blue-400 rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center mb-4">Designe <span className="ml-2">🎨</span></h3>
                <p className="text-gray-600 dark:text-gray-300">Você receberá as partes da apostila já preenchidas. Aí é só adicionar o nome dos participantes.</p>
            </div>

            <div className="border-t-4 border-green-400 rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center mb-4">Notifique <span className="ml-2">🔗</span></h3>
                <p className="text-gray-600 dark:text-gray-300">Agora é só colocar o número do WhatsApp do participante e enviar a notificação.</p>
            </div>
            </div>
        </section>
    )
}