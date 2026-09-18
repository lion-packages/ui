    export const VariantTypes = {
        SECONDARY: "secondary",
        PRIMARY: "primary",
        SUCCESS: "success",
        DANGER: "danger",
        WARNING: "warning",
        INFO: "info",
        LIGHT: "light",
        LINK: "link",
        DARK: "dark",
        LION_PACKAGES: "lion-packages",
        LION_PARKING: "lion-parking",
        LION_TECH: "lion-tech",
        LION_GLAM: "lion-glam",
    } as const;

    export type VariantTypes =
        (typeof VariantTypes)[keyof typeof VariantTypes];