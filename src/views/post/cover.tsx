interface PostCoverProps {
    cover: string;
    title: string;
}

export function PostCover({ cover, title }: PostCoverProps) {
    if (!cover) return null;
    return (
        <div className="w-full aspect-[21/9] overflow-hidden mb-12 border border-neutral-800 bg-neutral-950">
            <img src={cover} alt={title} className="w-full h-full object-cover filter grayscale contrast-110"/>
        </div>
    );
}
