import { isValidElement, type ReactNode } from "react";
import { MarkdownAsync, type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { codeToHtml } from "shiki";
import { isExternalUrl } from "@/utils/blog";

interface MarkdownRendererProps {
    content: string;
}

function extractText(node: ReactNode): string {
    if (typeof node === "string" || typeof node === "number") {
        return String(node);
    }
    if (Array.isArray(node)) {
        return node.map(extractText).join("");
    }
    if (isValidElement<{ children?: ReactNode }>(node)) {
        return extractText(node.props.children);
    }
    return "";
}

async function highlightCodeBlock(code: string, language: string): Promise<string> {
    const cleanCode = code.replace(/\n$/, "");
    const options = {
        themes: {
            light: "github-light",
            dark: "github-dark",
        },
        defaultColor: false as const,
    };

    try {
        return await codeToHtml(cleanCode, { lang: language, ...options });
    } catch {
        return await codeToHtml(cleanCode, { lang: "text", ...options });
    }
}

const components: Components = {
    async pre({ children }) {
        const codeElement = isValidElement<{ className?: string; children?: ReactNode }>(children)
            ? children
            : null;
        const className = codeElement?.props.className ?? "";
        const match = /language-([\w-]+)/.exec(className);
        const language = match?.[1] ?? "text";
        const code = extractText(codeElement ? codeElement.props.children : children);
        const html = await highlightCodeBlock(code, language);

        return (
            <div
                className="not-prose my-6 overflow-x-auto rounded-lg border border-border text-sm [&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:leading-relaxed"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates static syntax-highlighted HTML at build time.
                dangerouslySetInnerHTML={{ __html: html }}
            />
        );
    },
    code({ className, children, ...props }) {
        return (
            <code
                className={`rounded bg-muted px-1.5 py-0.5 text-[0.875em] font-normal text-foreground before:content-none after:content-none ${className ?? ""}`}
                {...props}
            >
                {children}
            </code>
        );
    },
    p({ node, children, ...props }) {
        const firstChild = node?.children?.[0];
        if (
            node?.children?.length === 1 &&
            firstChild?.type === "element" &&
            firstChild.tagName === "img"
        ) {
            const alt = typeof firstChild.properties?.alt === "string" ? firstChild.properties.alt : "";
            return (
                <figure className="my-8">
                    {children}
                    {alt ? (
                        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                            {alt}
                        </figcaption>
                    ) : null}
                </figure>
            );
        }

        return <p {...props}>{children}</p>;
    },
    img({ src, alt, ...props }) {
        if (!src || typeof src !== "string") {
            return null;
        }

        return (
            // biome-ignore lint/performance/noImgElement: Markdown images have dynamic dimensions and static export uses unoptimized images.
            <img
                src={src}
                alt={alt ?? ""}
                loading="lazy"
                className="mx-auto block h-auto w-full"
                {...props}
            />
        );
    },
    a({ href, children, ...props }) {
        if (!href) {
            return <span {...props}>{children}</span>;
        }

        const external = isExternalUrl(href);
        return (
            <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
                {...props}
            >
                {children}
            </a>
        );
    },
    table({ children, ...props }) {
        return (
            <div className="my-6 overflow-x-auto">
                <table {...props}>{children}</table>
            </div>
        );
    },
    h2({ children, ...props }) {
        return (
            <h2 className="scroll-mt-24" {...props}>
                {children}
            </h2>
        );
    },
    h3({ children, ...props }) {
        return (
            <h3 className="scroll-mt-24" {...props}>
                {children}
            </h3>
        );
    },
};

export async function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-li:leading-relaxed prose-hr:border-border prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-strong:text-foreground">
            <MarkdownAsync remarkPlugins={[remarkGfm]} components={components}>
                {content}
            </MarkdownAsync>
        </div>
    );
}
