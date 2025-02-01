"use server"

import { Contato } from "@/app/lib/types/types"

export async function receberContatos(instanciaWhatsApp: string | null): Promise<Contato[]> {

    if (!instanciaWhatsApp) return []

    const contatos: Contato[] = await fetch(`${process.env.EVOLUTION_API_URL}/chat/findContacts/${instanciaWhatsApp}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apiKey": process.env.AUTHENTICATION_API_KEY!
        },
    })
    .then(async (res) => {
        return await res.json()
    })
    
    return contatos
}