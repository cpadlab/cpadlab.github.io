
export interface SocialMediaItem {
    name: string;
    url: string;
    type: "link" | "email";
}

export type SocialMediaList = SocialMediaItem[];