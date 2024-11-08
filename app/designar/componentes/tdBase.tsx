import { twMerge } from "tailwind-merge";

export function TdBase({ children, className }: { children?: React.ReactNode, className?: string }) {
    return (
        <td className={twMerge("pl-2 overflow-hidden", className)}
        >
            <p className="flex items-center justify-start">{children}</p>
        </td>
    )
}