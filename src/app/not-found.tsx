import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 - Página no encontrada",
    description: "La página que buscas no existe o ha sido movida.",
};

export default function NotFound() {
    return (
        <main className="md:max-w-4xl max-w-xl space-y-2 mx-auto px-8 w-full">
            
            <h1 className="capitalize text-2xl font-bold">404: Lost in the code.</h1>

            <ul className="text-sm text-muted-foreground">
                <li>{">"} Searching for requested resource...</li>
                <li>{">"} Resource not found.</li>
                <li>{">"} Status: 404</li>
            </ul>

            <p className="capitalize text-muted-foreground">It looks like you've reached a dead end. But don't worry—there's still plenty of code to explore.</p>

            <Link href="/blog" className="text-sm uppercase hover:text-primary transition-colors text-muted-foreground flex items-center gap-2">
                <svg aria-hidden="true" className="w-3.5 h-3.5 min-w-3.5 min-h-3.5 size-3.5 -rotate-135" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4h8v2h-8zM16 6h4v2h-4zM14 8h2v2h-2zM18 8h2v4h-2zM12 10h2v2h-2zM10 12h2v2h-2zM8 14h2v2h-2zM6 16h2v2h-2zM4 18h2v2h-2z" />
                </svg>
                <b>Let's keep exploring</b>
            </Link>

        </main>
    );
}