export const Platform = {
    WEB: "web",
    ANDROID: "android",
    IOS: "ios",
    DESKTOP: "desktop",
};

export type Platform =
    (typeof Platform)[keyof typeof Platform];