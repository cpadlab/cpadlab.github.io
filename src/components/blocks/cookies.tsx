"use client";

import { useEffect, useState, type FC } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { initAnalytics } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "cookie_consent";

export const CookieBanner: FC = () => {
    const t = useTranslations("components.cookies");
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {

        try {
            const consent = localStorage.getItem(COOKIE_CONSENT_KEY);

            if (consent === "accepted") {
                void initAnalytics();
            } else if (!consent) {
                const timer = setTimeout(() => {
                    setIsVisible(true);
                }, 800);
                return () => clearTimeout(timer);
            }
        } catch {}

        const handleOpenSettings = () => {
            setIsVisible(true);
        };

        window.addEventListener("open-cookie-settings", handleOpenSettings);
        return () => window.removeEventListener("open-cookie-settings", handleOpenSettings);

    }, []);

    const handleAccept = () => {
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
        } catch {}
        void initAnalytics();
        setIsVisible(false);
    };

    const handleDecline = () => {
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
        } catch {}
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <aside aria-label={t("aria_label")} role="region" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-background/95 backdrop-blur-md border border-border rounded-lg p-5 shadow-lg space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
            
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <h2 className="text-xs uppercase font-bold text-foreground">{t("title")}</h2>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono">{t("badge")}</span>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{t("description")}</p>
            </div>

            <div className="flex items-center justify-between pt-1">
                
                <Link href="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-4">
                    <span>{t("policy_link")}</span>
                </Link>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleDecline} className="text-xs font-medium cursor-pointer">
                        <span>{t("decline")}</span>
                    </Button>
                    <Button variant="default" size="sm" onClick={handleAccept} className="text-xs font-medium cursor-pointer">
                        <span>{t("accept")}</span>
                    </Button>
                </div>

            </div>
            
        </aside>
    );
};

export default CookieBanner;
