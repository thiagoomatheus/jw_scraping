import { twMerge } from "tailwind-merge";

export default function Btn({ children, className, ...props }: { children: React.ReactNode, className?: string } & React.ComponentProps<"button">) {
    return (
        <button
            className={twMerge(`${className?.includes("bg") ? "" : "bg-blue-500 hover:bg-blue-400"} text-white dark:text-gray-900 font-bold p-2 rounded max-w-48`, className)}
            {...props}
        >
            {children}
        </button>
    )
}