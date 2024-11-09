import React from "react"
import { signIn } from "../lib/auth/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function Page() {
    return (
        <section className="flex flex-col items-center justify-start gap-7 w-full">
            <div className="flex flex-col gap-5 max-w-md mx-auto p-6 mt-4 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">Conecte-se</h2>
                <p className="text-white">Utilizamos a autenticação com Google via protocolo OAuth com o objetivo de tornar o processo de autenticação mais seguro e simplificado.</p>
                <p className="text-white">Essa forma é mais segura do que credenciais por email e senha.</p>
                <p className="text-white">Veja mais <a className="text-blue-500 underline hover:text-blue-700" href="https://auth0.com/pt/intro-to-iam/what-is-oauth-2" target="_blank">aqui</a></p>

                <form 
                    action={async () => {
                        "use server"
                            await signIn("google")
                            redirect("/minha-conta")
                    }} 
                    className="flex flex-col space-y-4">
                    <button type="submit" className="flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    Continuar com Google
                    </button>
                </form>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                    Por continuar, você concorda com nossos <Link href="/termos-de-servico" className="underline text-xs">Termos de serviços</Link>. Leia nossas <Link href="/politica-de-privacidade" className="underline text-xs">Políticas de privacidade</Link>.
                </p>
            </div>

        </section>
    )
}