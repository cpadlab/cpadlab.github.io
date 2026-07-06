interface PostHeaderProps {
    category: string;
    date: string;
    title: string;
    description: string;
}

export function PostHeader({ category, date, title, description }: PostHeaderProps) {
    return (
        <header className="mb-12">
            <div className="flex items-center gap-3 text-xs font-mondwest text-neutral-500 mb-4">
                <span>{category?.toUpperCase()}</span>
                <span className="w-1.5 h-1.5 bg-neutral-700" />
                <span>{date}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-editorial font-medium leading-tight text-white mb-6 animate-fade-in">
                {title}
            </h1>

            <p className="text-neutral-400 text-lg md:text-xl font-sans leading-relaxed max-w-2xl border-l-2 border-neutral-800 pl-6 my-6">
                {description}
            </p>
        </header>
    );
}
