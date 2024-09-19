import { twMerge } from "tailwind-merge";

export function TdBase({ children, className }: { children?: React.ReactNode, className?: string }) {
    return (
        <td className={twMerge("border-black pl-2 overflow-hidden items-center flex", className)}
        >
            {children}
        </td>
    )
}