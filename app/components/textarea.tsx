import { twMerge } from "tailwind-merge";

export default function Textarea({ children, className }: { children?: React.ReactNode, className?: string } & React.ComponentProps<"textarea">) {
    return (
        <textarea
            className={twMerge("pl-2 leading-5 h-5 max-h-5 lg:leading-6 lg:h-6 lg:max-h-6 overflow-hidden flex items-center", className)}
        >
            {children}
        </textarea>
    )
}