interface PerspectiveTextProps {
  label: string;
  className?: string;
  startIndex?: number;
}

export function PerspectiveText({ label, className = "", startIndex = 0 }: PerspectiveTextProps) {
  return (
    <span className={`perspective-text-word perspective-hover-group inline-flex items-center cursor-none ${className}`}>
      {label.split("").map((char, index) => {
        if (char === " ") {
          return <span key={index} className="w-[0.25em]" />;
        }
        
        // Calculate delay incorporating the offset index
        const delay = `${(startIndex + index) * 0.02}s`;
        
        return (
          <span 
            key={index} 
            className="relative inline-block overflow-hidden h-[1.2em] leading-[1.2] [perspective:150px] [transform-style:preserve-3d]"
          >
            <span 
              className="perspective-char-primary block h-full origin-top transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" 
              style={{ transitionDelay: delay }}
            >
              {char}
            </span>
            <span 
              className="perspective-char-secondary absolute top-full left-0 block h-full origin-bottom opacity-0 [transform:rotateX(-90deg)] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" 
              style={{ transitionDelay: delay }}
              aria-hidden="true"
            >
              {char}
            </span>
          </span>
        );
      })}
    </span>
  );
}
