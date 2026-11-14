"use client";

import type { FC } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

type ManageCookiesButtonProps = {
    label?: string;
};

export const ManageCookiesButton: FC<ManageCookiesButtonProps> = ({ label }) => {
    const t = useTranslations("pages.cookies.sections.manage_consent");
    
    const handleOpen = () => {
        window.dispatchEvent(new CustomEvent("open-cookie-settings"));
    };

    return (
        <Button variant="outline" size="sm" onClick={handleOpen} className="text-xs font-mono uppercase cursor-pointer" >
            <span>{label ?? t("button")}</span>
        </Button>
    );

};

export default ManageCookiesButton;
