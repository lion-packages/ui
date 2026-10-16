export const AndroidButtonStyleTypes = {
    FILLED: "filled",
    ELEVATED: "elevated",
    TONAL: "tonal",
    OUTLINED: "outlined",
    TEXT: "text",
} as const;

export type AndroidButtonStyleTypes = (typeof AndroidButtonStyleTypes)[keyof typeof AndroidButtonStyleTypes];