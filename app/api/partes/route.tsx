import { Partes } from "@/app/lib/types/types"
import axios from "axios"
import * as cheerio from "cheerio"
import { add, format, getWeek } from "date-fns"
import { ptBR } from "date-fns/locale"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

async function scrapePartes(year: number, date: Date) {
    const week = getWeek(date, { weekStartsOn: 1 })
    const response = await axios.get(`https://wol.jw.org/pt/wol/meetings/r5/lp-t/${year}/${week}`)
    const html = response.data
    const $ = cheerio.load(html)
    const partes: Partes = { semana: format(date, "dd 'de' MMMM", { locale: ptBR }), canticos: [], capitulos: '', tesouros: "", leitura: '', ministerio: [], vida: [], time: [] }

    partes.capitulos = $("#p2").text()

    $('.dc-icon--music').each(function () {
        const cantico = $(this).text().split(" e")[0]
        partes.canticos.push(cantico)
    })

    partes.tesouros = $(".pub-mwb #p5").text()

    partes.leitura = $(`p:contains("(4 min) ${partes.capitulos[0]}")`).text().split(") ")[1].split(" (")[0]

    $("h3.du-color--gold-700").each(function () {
        const ministerio = $(this).text()
        partes.ministerio.push(ministerio)
    })

    $(`p:contains(min)`).each(function () {
        let time = $(this).text()
        if (!time.startsWith("(")) return
        time = time.split("(")[1].split(")")[0]
        partes.time.push(time)
    })

    $("h3.du-color--maroon-600").each(function () {
        const vida = $(this).text()
        partes.vida.push(vida.length > 62 ? `${vida.slice(0, 62)}...` : vida)
    })
    return partes
}

export async function GET(req:NextRequest) {
    console.log("GET /partes");
    const getPartesSchema = z.object({
        dateFrom: z.string(),
        layout: z.number()
    }, {
        message: "Dados recebidos incorretos"
    })

    const searchParams = req.nextUrl.searchParams

    const dateFrom = searchParams.get("dateFrom") as string
    const layout = parseFloat(searchParams.get("layout") as string)
    const day = dateFrom.slice(0, 2)
    const month = dateFrom.slice(2, 4)
    const year = dateFrom.slice(4, 8)
    
    const result = getPartesSchema.safeParse({
        dateFrom,
        layout
    })

    if(!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 })
    }

    try {
        const partes: Partes[] = []
        let date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        for (let i = 0; i < layout; i++) {
            date = add(date, { days: 7 * i })
            const year = date.getFullYear()
            partes.push(await scrapePartes(year, date))
        }
        return NextResponse.json({ partes }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 })
    }
}