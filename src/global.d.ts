import en from "@/assets/locales/en.json";

declare module "next-intl" {
    interface AppConfig {
        Locale: "en" | "es";
        Messages: typeof en;
    }
}
