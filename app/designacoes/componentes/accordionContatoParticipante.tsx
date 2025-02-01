import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/componentes/accordion";
import { Contato } from "@/app/lib/types/types";
import { SelecaoDeContato } from "./selecaoDeContato";

export default function AccordionContatoParticipante({ contatos }: {contatos: Contato[]}) {

    return (
        <Accordion 
            type="single" 
            collapsible
        >
            {contatos.length > 1 && (
                <AccordionItem 
                value="item-1"
                >
                    <AccordionTrigger>
                        <p>Usar um contato do meu WhatsApp</p>
                    </AccordionTrigger>
                    <AccordionContent>
                        <SelecaoDeContato contatos={contatos} />
                    </AccordionContent>
                </AccordionItem>
            )}
            <AccordionItem 
                value="item-2"
            >
                <AccordionTrigger>
                    <p>Inserir número de WhatsApp</p>
                </AccordionTrigger>
                <AccordionContent>
                    <input 
                        className="border-2 border-blue-300 w-full"
                        type="tel"
                        name="telefone"
                        placeholder="Ex.: 11999990000"
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}