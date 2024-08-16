"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"

export default function useForm() {
    const [data, setData] = useState<{
        layout?: "quinzenal" | "mensal_padrao" | "mensal_especial"
        inicialDate?: number
    } | undefined>(undefined)

    function comecar() {
        setData({
            layout: undefined,
            inicialDate: undefined
        })
        return toast("Selecione o layout", {
            icon: "📐📌",
        })
    }

    function inserirLayout(formData:FormData) {
        const layoutSchema = z.string().refine((value) => value === "quinzenal" || value === "mensal_padrao" || value === "mensal_especial", {
            message: "Selecione um layout"
        })
        const layout = formData.get("layout") as "quinzenal" | "mensal_padrao" | "mensal_especial"
        const result = layoutSchema.safeParse(layout)
        if (!result.success) {
            return toast.error(result.error.message)
        }
        setData({
            ...data,
            layout: layout
        })
        toast("Selecione a semana inicial", {
            icon: "📅",
        })
        return 
    }
    function inserirWeek(formData:FormData) {
        const layoutSchema = z.number({
            message: "Selecione um layout"
        })
        const weekInString = formData.get("semana_inicial") as string
        const week = parseInt(weekInString)
        const result = layoutSchema.safeParse(week)
        if (!result.success) {
            return toast.error(result.error.message)
        }
        setData({
            ...data,
            inicialDate: week
        })
        console.log(data);
        return 
    }
    return {
        data,
        comecar,
        inserirLayout,
        inserirWeek
    }
    
}