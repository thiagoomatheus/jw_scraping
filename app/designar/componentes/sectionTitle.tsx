import { twMerge } from "tailwind-merge";

export default function SectionTitle({ children, title, classname }: Readonly<{ children: React.ReactNode, title: string, classname?: string }>) {
    return (
        <section className={`flex flex-col ${title !== "Participantes" ? "md:flex-row" : ""} justify-between w-full gap-10`}>
            <div className={twMerge("flex justify-center items-center p-10 rounded-xl", classname)}>
                <h2 className="text-center text-white dark:text-gray-900">{title}</h2>
            </div>
            {children}
        </section>
    )
}