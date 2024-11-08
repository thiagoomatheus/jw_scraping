import Link from "next/link";

export default function LinkMenu( { children, href }: { children: React.ReactNode, href: string } ) {
    return (
        <Link href={href} className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 border-b-2 pb-1 border-gray-800 dark:border-white">
            {children}
        </Link>
    )
}