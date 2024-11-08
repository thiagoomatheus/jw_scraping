import { auth } from "../lib/auth/auth"
import LogoutBtn from "./logoutBtn"
import LinkMenu from "./linkMenu"
import Link from "next/link"
import Image from "next/image"
import LogoDark from "@/public/icons8-d-file-67 dark.png"
import Logo from "@/public/icons8-d-file-67.png"

export default async function Menu() {

    const sessao = await auth()

    return ( 
        <nav className="bg-white dark:bg-gray-800 p-4 shadow w-full">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-gray-800 dark:text-white text-2xl font-bold flex items-center gap-2">
              <Image src={LogoDark} alt="Designações NVMC" className="hidden dark:block dark:w-8 dark:h-8 dark:md:w-10 dark:md:h-10 dark:lg:w-12 dark:lg:h-12" />
              <Image src={Logo} alt="Designações NVMC" className="dark:hidden w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
            </Link>

            {!sessao && 
              <div className="flex-grow flex justify-center gap-2 md:gap-4">
                <LinkMenu href="/#instrucoes">Instruções</LinkMenu>
                <LinkMenu href="/apoie-nos">Apoie-nos</LinkMenu>
              </div>
            }
        
            {sessao && 
              <div className="flex-grow flex justify-center gap-2 md:gap-4">
                <LinkMenu href="/designar">Designar</LinkMenu>
                <LinkMenu href="/designacoes">Designações</LinkMenu>
                <LinkMenu href="/minha-conta">Minha Conta</LinkMenu>
              </div>
            }
        
            {/* <!-- Botão de Login --> */}
            {!sessao && 
              <div className="block">
                <Link href="/login" className="text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-400">Entrar</Link>
              </div>
            }

            {sessao && 
              <div className="block">
                <LogoutBtn />
              </div>
            }
          </div>
        </nav>
    )        
}