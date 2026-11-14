import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

let app: FirebaseApp | null = null;
let analyticsInstance: Analytics | null = null;

export const getFirebaseApp = (): FirebaseApp | null => {
    if (typeof window === "undefined") return null;
    if (!firebaseConfig.apiKey) return null;
    if (!app) {
        app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    }
    return app;
};

export const initAnalytics = async (): Promise<Analytics | null> => {

    if (typeof window === "undefined") return null;
    if (analyticsInstance) return analyticsInstance;

    try {
        const supported = await isSupported().catch(() => false);
        if (!supported) return null;

        const firebaseApp = getFirebaseApp();
        if (!firebaseApp) return null;

        analyticsInstance = getAnalytics(firebaseApp);
        return analyticsInstance;
    } catch {
        return null;
    }
    
};

export const getAnalyticsInstance = (): Analytics | null => analyticsInstance;
