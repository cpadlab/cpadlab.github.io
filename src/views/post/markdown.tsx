import React from "react";

interface MarkdownProps {
    content: string;
}

export function Markdown({ content }: MarkdownProps) {
    const lines = content.split("\n");
    const blocks: React.ReactNode[] = [];

    let inCodeBlock = false;
    let codeLang = "";
    let codeLines: string[] = [];

    let inList = false;
    let listItems: string[] = [];

    const flushList = (key: number) => {
        if (listItems.length > 0) {
            blocks.push(
                <ul key={`list-${key}`} className="list-disc pl-6 mb-6 space-y-2 text-neutral-300">
                    {listItems.map((item, idx) => (
                        <li key={idx} className="leading-relaxed font-sans">{parseInline(item)}</li>
                    ))}
                </ul>
            );
            listItems = [];
            inList = false;
        }
    };

    const parseInline = (text: string): React.ReactNode[] => {
        const parts: React.ReactNode[] = [];
        let currentText = text;
        let key = 0;

        while (currentText) {
            const boldMatch = currentText.match(/\*\*(.*?)\*\*/);
            const codeMatch = currentText.match(/`(.*?)`/);
            const linkMatch = currentText.match(/\[(.*?)\]\((.*?)\)/);

            const matches = [
                boldMatch && { type: "bold", index: boldMatch.index!, length: boldMatch[0].length, content: boldMatch[1] },
                codeMatch && { type: "code", index: codeMatch.index!, length: codeMatch[0].length, content: codeMatch[1] },
                linkMatch && { type: "link", index: linkMatch.index!, length: linkMatch[0].length, text: linkMatch[1], url: linkMatch[2] },
            ].filter(Boolean) as any[];

            if (matches.length === 0) {
                parts.push(<span key={key++}>{currentText}</span>);
                break;
            }

            matches.sort((a, b) => a.index - b.index);
            const first = matches[0];

            if (first.index > 0) {
                parts.push(<span key={key++}>{currentText.slice(0, first.index)}</span>);
            }

            if (first.type === "bold") {
                parts.push(<strong key={key++} className="font-bold text-white">{first.content}</strong>);
            } else if (first.type === "code") {
                parts.push(<code key={key++} className="font-mono bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 text-sm text-neutral-300">{first.content}</code>);
            } else if (first.type === "link") {
                parts.push(<a key={key++} href={first.url} target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-neutral-400 transition-colors cursor-none">{first.text}</a>);
            }

            currentText = currentText.slice(first.index + first.length);
        }

        return parts;
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith("```")) {
            flushList(i);
            if (inCodeBlock) {
                blocks.push(
                    <div key={`code-${i}`} className="relative my-6 border border-neutral-800">
                        {codeLang && (
                            <div className="absolute top-0 right-0 bg-neutral-950 border-l border-b border-neutral-800 px-3 py-1 text-[10px] font-mondwest text-neutral-500 uppercase tracking-widest">
                                {codeLang}
                            </div>
                        )}
                        <pre className="font-mono bg-neutral-950 text-neutral-300 p-5 md:p-6 overflow-x-auto text-sm leading-relaxed whitespace-pre select-text">
                            <code>{codeLines.join("\n")}</code>
                        </pre>
                    </div>
                );
                codeLines = [];
                inCodeBlock = false;
            } else {
                inCodeBlock = true;
                codeLang = line.slice(3).trim();
            }
            continue;
        }

        if (inCodeBlock) {
            codeLines.push(line);
            continue;
        }

        if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
            inList = true;
            listItems.push(line.trim().slice(2));
            continue;
        } else if (inList && line.trim() === "") {
            flushList(i);
            continue;
        } else if (inList && !line.trim().startsWith("- ") && !line.trim().startsWith("* ")) {
            flushList(i);
        }

        if (line.startsWith("#")) {
            const level = line.match(/^#+/)?.[0].length || 1;
            const text = line.replace(/^#+\s*/, "");
            const headerClasses = [
                "",
                "text-4xl md:text-5xl font-editorial font-medium mt-12 mb-6 text-white leading-tight",
                "text-3xl md:text-4xl font-editorial font-medium mt-10 mb-5 text-white leading-snug",
                "text-2xl md:text-3xl font-editorial font-medium mt-8 mb-4 text-white",
                "text-xl md:text-2xl font-editorial font-medium mt-6 mb-3 text-white",
            ];
            const hClass = headerClasses[level] || headerClasses[4];
            const Tag = `h${Math.min(level, 6)}` as React.ElementType;
            blocks.push(
                <Tag key={`h-${i}`} className={hClass}>
                    {parseInline(text)}
                </Tag>
            );
            continue;
        }

        const imageMatch = line.match(/^!\[(.*?)\]\((.*?)\)/);
        if (imageMatch) {
            const alt = imageMatch[1];
            const src = imageMatch[2];
            blocks.push(
                <div key={`img-${i}`} className="my-8 border border-neutral-800 bg-neutral-950 overflow-hidden">
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-auto object-contain filter grayscale contrast-105 hover:grayscale-0 transition-all duration-500 ease-in-out"
                    />
                    {alt && (
                        <div className="border-t border-neutral-800 bg-neutral-950 px-4 py-2 text-center text-xs font-mondwest text-neutral-500 uppercase tracking-wider">
                            {alt}
                        </div>
                    )}
                </div>
            );
            continue;
        }

        if (line.trim() === "---" || line.trim() === "***" || line.trim() === "___") {
            blocks.push(<hr key={`hr-${i}`} className="my-10 border-t border-neutral-800" />);
            continue;
        }

        if (line.trim() !== "") {
            blocks.push(
                <p key={`p-${i}`} className="text-neutral-300 font-sans leading-relaxed text-base md:text-lg mb-6">
                    {parseInline(line)}
                </p>
            );
        }
    }

    if (inList) {
        flushList(lines.length);
    }

    return <div className="markdown-content select-text selection:bg-neutral-800 selection:text-white">{blocks}</div>;
}
