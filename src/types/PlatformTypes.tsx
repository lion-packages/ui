export const PlatformTypes = {
    WEB: "web",
    ANDROID: "android",
    IOS: "ios",
    DESKTOP: "desktop",
};

export type PlatformTypes =
    (typeof PlatformTypes)[keyof typeof PlatformTypes];