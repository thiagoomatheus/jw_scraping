import LinkMenu from "./linkMenu";

export default function Rodape() {
    return (
        <footer className="w-full flex flex-col justify-center items-center gap-5 p-2 md:p-5 xl:p-8">
            <nav className="flex flex-col md:flex-row justify-center items-center gap-4">
                <LinkMenu href="/">Início</LinkMenu>
                <LinkMenu href="/politica-de-privacidade">Política de Privacidade</LinkMenu>
                <LinkMenu href="/termos-de-servico">Termos de Serviço</LinkMenu>
                <LinkMenu href="/apoie-nos">Apoie-nos</LinkMenu>
            </nav>
            <p className="text-sm">&copy; 2024. Desenvolvido por <a className="underline text-sm hover:text-blue-500" href="https://github.com/thiagoomatheus">thiagoomatheus</a></p>
        </footer>
    )
}