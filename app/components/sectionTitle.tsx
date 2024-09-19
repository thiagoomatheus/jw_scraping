import { twMerge } from "tailwind-merge";

export default function SectionTitle({ children, title, classname }: Readonly<{ children: React.ReactNode, title: string, classname?: string }>) {
    return (
        <section className={twMerge("flex flex-col md:flex-row w-full gap-5", classname)}>
            <div className="bg-blue-500 flex justify-center items-center p-10 rounded-xl text-white">
                <h2 className="text-center">{title}</h2>
            </div>
            {children}
        </section>
    )
}