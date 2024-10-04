"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"
import { Partes } from "../types/types"

export default function useForm() {
    const [layout, setLayout] = useState<"quinzenal" | "mensal_padrao" | "mensal_especial" | undefined | null>(null)
    const [data, setData] = useState<Partes[] | undefined>()

    function comecar() {
        setLayout(undefined)
        toast("Selecione o layout", {icon: "📐📌"})
    }

    function inserirLayout(formData:FormData) {
        const layoutSchema = z.string().refine((value) => value === "quinzenal" || value === "mensal_padrao" || value === "mensal_especial", {
            message: "Selecione um layout"
        })
        const layout = formData.get("layout") as "quinzenal" | "mensal_padrao" | "mensal_especial"
        const result = layoutSchema.safeParse(layout)
        if (!result.success) return toast.error(result.error.message)
        setLayout(layout)
        toast("Selecione a semana inicial", {icon: "📅"})
    }

    async function getPartes(formData:FormData) {
        const weekAndYearSchema = z.object({
            dateFrom: z.string()
        })
        const dateFrom = formData.get("dateFrom") as string
        const resultZod = weekAndYearSchema.safeParse({dateFrom})
        if (!resultZod.success) return "Dados recebidos incorretos"
        const result = await fetch(`/api/partes?dateFrom=${dateFrom.replaceAll("/", "")}&layout=${layout === "quinzenal" ? 2 : layout === "mensal_padrao" ? 4 : 5}`)
        const response: {partes?: Partes[], error?: {message: string} } = await result.json()
        if (response.error) return response.error.message
        setData(response.partes)
    }
    
    return {
        layout,
        data,
        comecar,
        inserirLayout,
        getPartes
    }
    
}