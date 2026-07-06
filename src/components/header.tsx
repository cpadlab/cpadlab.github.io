import Link from "next/link";
import { PerspectiveText } from "./perspective-text";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full px-8 md:px-12 py-6 z-[9999] text-white mix-blend-difference flex items-center justify-between select-none">
      {/* Logo: Shared hover trigger and offset indexing for a continuous roll cascade */}
      <Link href="/" className="perspective-hover-group flex gap-1.5 font-sans uppercase text-xs md:text-sm cursor-none">
        <PerspectiveText label="Carlos" className="font-bold" startIndex={0} />
        <PerspectiveText label="Padilla" startIndex={7} />
      </Link>

      {/* Nav Menu */}
      <nav className="flex items-center gap-6 md:gap-8 font-sans uppercase text-[10px] md:text-xs">
        <Link href="/" className="perspective-hover-group cursor-none">
          <PerspectiveText label="Home" />
        </Link>
        <Link href="/blog" className="perspective-hover-group cursor-none">
          <PerspectiveText label="Blog" />
        </Link>
        <a href="mailto:cpadlab@proton.me" className="perspective-hover-group cursor-none">
          <PerspectiveText label="Contact" />
        </a>
      </nav>
    </header>
  );
};

export default Header;