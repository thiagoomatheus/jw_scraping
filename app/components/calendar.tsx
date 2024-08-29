"use client"

import React, { useState } from "react";

import { endOfWeek, startOfWeek } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";

export function Calendar() {

    const [selectedWeek, setSelectedWeek] = useState<{
        date: DateRange
    } | undefined>();
    
    return (
        <>
            <DayPicker
                locale={ptBR}
                showOutsideDays
                fixedWeeks
                weekStartsOn={1}
                classNames={{
                    today: "",
                    selected: "bg-blue-400 text-white",
                    day: "text-xs sm:text-sm lg:text-base",
                    range_end: "rounded-e-lg",
                    range_start: "rounded-s-lg",
                    chevron: "fill-blue-300",
                    footer: "text-blue-700 text-sm lg:text-lg",
                    day_button: "w-9 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14",
                }}
                modifiers={{
                    selected: selectedWeek?.date,
                    range_start: selectedWeek?.date.from,
                    range_end: selectedWeek?.date.to,
                }}
                onDayClick={(day, modifiers) => {
                    if (modifiers.selected) {
                        setSelectedWeek(undefined); // clear the selection if the day is already selected
                        return;
                    }
                    setSelectedWeek({
                        date: {
                            from: startOfWeek(day, { weekStartsOn: 1 }),
                            to: endOfWeek(day, { weekStartsOn: 1 }),
                        }
                    })
                }}
                footer={
                    selectedWeek ?
                    `Semana de ${selectedWeek?.date.from?.toLocaleDateString()} até
                        ${selectedWeek?.date.to?.toLocaleDateString()}` :
                    "Selecione uma semana"
                }
            />
            {selectedWeek && <input type="text" className="hidden" name="dateFrom" readOnly value={selectedWeek.date.from?.toLocaleDateString()} />}
        </>
    )
}