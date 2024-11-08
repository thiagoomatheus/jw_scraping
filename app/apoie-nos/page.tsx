import SecaoFormasDeApoiar from "./componentes/secaoFormasDeApoiar";

export default function Page() {
    return (
        <section className="flex flex-col gap-5 justify-center items-center w-full max-w-7xl">
            <h1>Apoie-nos</h1>
            <SecaoFormasDeApoiar />
        </section>
    )
}