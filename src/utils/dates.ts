
const MONTH_MAP: Record<string, string> = {
    mar: "03",
    jul: "07",
    oct: "10",
    dec: "12",
    dic: "12",
    jun: "06",
};

export function parseDatesToIso(dateStr: string) {
    
    const parts = dateStr.split(" - ");

    const parsePart = (p?: string) => {
        
        if (!p) return undefined;
        const clean = p.trim().toLowerCase();
    
        if (clean.includes("present") || clean.includes("presente")) return undefined;
        const match = clean.match(/([a-z]+)\.?\s*(\d{4})/i);
    
        if (!match) return undefined;
        const monthNum = MONTH_MAP[match[1].toLowerCase()] ?? "01";

        return `${match[2]}-${monthNum}`;

  };

    return {
        startDate: parsePart(parts[0]),
        endDate: parsePart(parts[1]),
    };
}


export function formatDate(date: string): string {
    
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return date;
    }

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(parsedDate);

}