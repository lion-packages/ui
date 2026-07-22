export const Variant = {
    SECONDARY: "secondary",
    PRIMARY: "primary",
    SUCCESS: "success",
    DANGER: "danger",
    WARNING: "warning",
    INFO: "info",
    LIGHT: "light",
    DARK: "dark",
    LION_RED: "lion-red",
    LION_ORANGE: "lion-red",
} as const;

export type Variant =
    (typeof Variant)[keyof typeof Variant];