import axios from "axios"
import * as cheerio from "cheerio"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

function returnProps(date:Date) {
    const data: {
        month1: string
        month2: string
        year: number
        date: string
    } = {
        month1: '',
        month2: '',
        year: 0,
        date: ''
    }
    let month: string = ""
    const year: number = date.getFullYear()
    data.year = year
    switch (date.getMonth() + 1) {
        case 1:
            month = "janeiro"
            data.month1 = "janeiro"
            data.month2 = "fevereiro"
            break;
        case 2:
            month = "fevereiro"
            data.month1 = "janeiro"
            data.month2 = "fevereiro"
            break;
        case 3:
            month = "março"
            data.month1 = "março"
            data.month2 = "abril"
            break;
        case 4:
            month = "abril"
            data.month1 = "março"
            data.month2 = "abril"
            break;
        case 5:
            month = "maio"
            data.month1 = "maio"
            data.month2 = "junho"
            break;
        case 6:
            month = "junho"
            data.month1 = "maio"
            data.month2 = "junho"
            break;
        case 7:
            month = "julho"
            data.month1 = "jullho"
            data.month2 = "agosto"
            break;
        case 8:
            month = "agosto"
            data.month1 = "jullho"
            data.month2 = "agosto"
            break;
        case 9:
            month = "setembro"
            data.month1 = "setembro"
            data.month2 = "outubro"
            break;
        case 10:
            month = "outubro"
            data.month1 = "setembro"
            data.month2 = "outubro"
            break;
        case 11:
            month = "novembro"
            data.month1 = "novembro"
            data.month2 = "dezembro"
            break;
        case 12:
            month = "dezembro"
            data.month1 = "novembro"
            data.month2 = "dezembro"
            break;
    }
    const mondayOfWeek = new Date(date.getDate() + 6)
    if (date.getMonth() !== mondayOfWeek.getMonth()) {
        switch (mondayOfWeek.getMonth() + 1) {
            case 1:
                data.date = `${date.getDate()}-de-${month}-${mondayOfWeek.getDate()}-de-janeiro-de-${year}`
                return data
            case 2:
                data.date = `${date.getDate()}-de-${month}-${mondayOfWeek.getDate()}-de-fevereiro-de-${year}`
                return data
            case 3:
                data.date = `${date.getDate()}-de-${month}-${mondayOfWeek.getDate()}-de-março-de-${year}`
                return data
            case 4:
                data.date = `${date.getDate()}-de-${month}-${mondayOfWeek.getDate()}-de-abril-de-${year}`
                return data
            case 5:
                data.date = `${date.getDate()}-de-${month}-${mondayOfWeek.getDate()}-de-maio-de-${year}`
                return data
            case 6:
                data.date = `${date.getDate()}-de-${month}-${mondayOfWeek.getDate()}-de-junho-de-${year}`
                return data
            case 7:
                data.date = `${date.getDate()}-de-${month}-${mondayOfWeek.getDate()}-de-julho-de-${year}`
                return data
            case 8:
                data.date = `${date.getDate()}-de-${month}-${mondayOfWeek.getDate()}-de-agosto-de-${year}`
                return data
            case 9:
                data.date = `${date.getDate()}-de-${month}-${mondayOfWeek.getDate()}-de-setembro-de-${year}`
                return data
            case 10:
                data.date = `${date.getDate()}-de-${month}-${mondayOfWeek.getDate()}-de-outubro-de-${year}`
                return data
            case 11:                
                data.date = `${date.getDate()}-de-${month}-${mondayOfWeek.getDate()}-de-novembro-de-${year}`
                return data
            case 12:
                data.date = `${date.getDate()}-de-${month}-${mondayOfWeek.getDate()}-de-dezembro-de-${year}`
                return data
        }
    }
    data.date = `${date.getDate()}-${mondayOfWeek.getDate()}-de-${month}-de-${year}`
    return data
}

async function scrapePartes(month1: string, month2: string, year: number, date: string) {
    const url = "https://www.jw.org/pt/biblioteca/jw-apostila-do-mes"
    const response = await axios.get(`${url}/${month1}-${month2}-${year}-mwb/Programação-da-Reunião-Vida-e-Ministério-para-${date}/`)
    const html = response.data
    const $ = cheerio.load(html)
    const partes: {
        canticos: string[],
        capitulos: string,
        tesouros: string,
        leitura: string,
        ministerio: string[],
        vida: string[],
        time: string[]
    } = { canticos: [], capitulos: '', tesouros: "", leitura: '', ministerio: [], vida: [], time: [] }

    partes.capitulos = $("#p2").text()

    $('.dc-icon--music').each(function () {
        const cantico = $(this).text()
        partes.canticos.push(cantico)
    })

    partes.tesouros = $("#p5").text()

    partes.leitura = $("#p18 a:first").text()

    $("h3.du-color--gold-700").each(function () {
        const ministerio = $(this).text()
        partes.ministerio.push(ministerio)
    })

    $(`p:contains(min)`).each(function () {
        const time = $(this).text()
        partes.time.push(time)
    })

    $("h3.du-color--maroon-600").each(function () {
        const vida = $(this).text()
        partes.vida.push(vida)
    })
    return partes
}

async function GET(req:NextRequest, res: NextResponse) {
    const getPartesSchema = z.object({date: z.date()})

    const body = getPartesSchema.parse(await req.json())

    const { month1, month2, year, date } = returnProps(body.date)

    try {
        const partes = await scrapePartes(month1, month2, year, date )
        return NextResponse.json({ partes }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}