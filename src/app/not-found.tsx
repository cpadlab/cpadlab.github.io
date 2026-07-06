import Link from "next/link";
import { PerspectiveText } from "@/components/perspective-text";

export default function NotFound() {
    return (
        <main className="bg-black text-white min-h-dvh flex flex-col justify-center items-center px-8 relative select-none">
            <div className="text-center space-y-6 max-w-lg">
                <h1 className="text-[120px] md:text-[180px] font-editorial leading-none tracking-tighter text-white">
                    404
                </h1>

                <h2 className="text-sm md:text-base font-mondwest text-neutral-400 uppercase">
                    PAGE NOT FOUND
                </h2>

                <p className="text-neutral-500 font-sans text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                    The resource you are looking for has been moved, deleted, or does not exist in this sector.
                </p>

                <div className="pt-6">
                    <Link
                        href="/"
                        className="perspective-hover-group inline-block border border-neutral-800 text-neutral-400 hover:border-neutral-500 hover:text-white px-6 py-3 text-xs font-mondwest transition-all duration-300 cursor-none"
                        style={{ borderRadius: 0 }}
                    >
                        <PerspectiveText label="RETURN TO HOMEPAGE" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
