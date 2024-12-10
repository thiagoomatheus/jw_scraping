export default function Modal({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="flex flex-col justify-center items-center gap-5 border p-2 md:p-10 rounded-lg bg-white dark:bg-gray-700 max-w-lg m-5 modal overflow-y-auto max-h-[95vh]">
                {children}
            </div>
        </div>
    )
}