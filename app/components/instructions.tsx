export default function Instructions() {
    return (
        <>
            <h2 className="self-center">Instruções</h2>
            <p>Para criar a folha de designações de forma simples e rápida siga os passos abaixo:</p>
            <ol className="flex flex-col gap-2">
                <li className="flex flex-col gap-3">
                    <h3>1. Selecione o layout</h3>
                    <p>O primeiro passo é selecionar o layout da folha de designações.</p>
                    <p>Você poderá escolher entre as opções:</p>
                    <ul>
                        <li className="list-inside list-disc p-2"><span className="font-bold">Quinzenal:</span> Folha no tamanho A4 contendo designações para 2 semanas</li>
                        <li className="list-inside list-disc p-2"><span className="font-bold">Mensal Padrão:</span> Folha no tamanho A4 contendo designações para 4 semanas</li>
                        <li className="list-inside list-disc p-2"><span className="font-bold">Mensal Especial:</span> Folha no tamanho A4 contendo designações para 5 semanas</li>
                    </ul>
                    <p>Atente-se a esse ponto: quanto <strong>maior</strong> a quantidade de semanas <strong>menor</strong> será o tamanho da fonte.</p>
                </li>
                <li className="flex flex-col gap-3">
                    <h3>2. Selecione a semana inicial</h3>
                    <p>O próximo passo é selecionar a semana onde as designações vão começar.</p>
                    <p>Por que não preciso informar mais semanas?</p>
                    <p>Com a informação que você colocou na seção anterior (layout) conseguimos calcular as próximas semanas para incluir em sua designação.</p>
                </li>
                <li className="flex flex-col gap-3">
                    <h3>3. Preencha as designações</h3>
                    <p>Você será redirecionado para outra página onde receberá as partes da apostila já preenchidas.</p>
                    <p>Você poderá editá-las caso seja necessário fazer algum ajuste.</p>
                    <p>Campos para incluir o nome do participante estarão do título da parte.</p>
                    <p>Basta preencher os campos e depois mandar imprimir.</p>
                </li>
            </ol>
        </>
    )
}