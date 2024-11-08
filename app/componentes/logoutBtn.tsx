"use client"

import { signOut } from "next-auth/react"
import toast from "react-hot-toast";

export default function LogoutBtn() {
    return (
        <button 
            onClick={async () => {

                const toastId = toast.loading("Saindo...")
                
                await signOut({ redirectTo: "/" })
                .then(() => {
                    toast.success("Que pena! Nós vemos depois...", {id: toastId})
                })
                .catch((error) => {
                    toast.error(error.message, {id: toastId})
                })
            }} 
            className="text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-400"
        >
            Sair
        </button>
    )
}