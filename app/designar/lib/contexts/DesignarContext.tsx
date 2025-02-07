"use client"

import { Partes } from "@/app/lib/types/types";
import { createContext, useReducer } from "react";

type TipoEstadoInicial = {
    layout: "unico" | "quinzenal" | "mensal_padrao" | undefined | null
    semanas: Partes[] | undefined
}

type TipoDesiganacaoReducer = {
    type: "comecar" | "inserirLayout" | "adicionandoDados" | "adicionandoDesignacoes",
    layout?: "unico" | "quinzenal" | "mensal_padrao" | undefined | null,
    id?: string,
    diaReuniao?: string
    semanas?: Partes[]
    designacoes?: Partes
}

const estadoInicial: TipoEstadoInicial = {
    layout: null,
    semanas: undefined
}

export const DesignarContext = createContext<TipoEstadoInicial>(estadoInicial);

export const DesignarDispatch = createContext<React.Dispatch<TipoDesiganacaoReducer>>(() => {});

function designacoesReducer(state:TipoEstadoInicial, action:TipoDesiganacaoReducer): TipoEstadoInicial {
    switch (action.type) {
        case "comecar":
            return {
                ...state,
                layout: undefined
            }
        case "inserirLayout":
            return {
                ...state,
                layout: action.layout || state.layout
            }
        case "adicionandoDados":
            return {
                ...state,
                semanas: action.semanas || state.semanas
            }
        case "adicionandoDesignacoes":
            return {
                ...state,
                semanas: state.semanas?.map((semana) => {
                    if (semana.id === action.id) {
                        return {
                            ...action.designacoes || semana
                        }
                    }
                    return semana
                })
            }
        default:
            return state
    }
}

export default function DesignarContextProvider ({ children }: { children: React.ReactNode }) {

    const [dados, dispatch] = useReducer(designacoesReducer, estadoInicial)

    return (
        <DesignarContext.Provider value={dados}>
            <DesignarDispatch.Provider value={dispatch}>
                {children}
            </DesignarDispatch.Provider>
        </DesignarContext.Provider>
    )
}