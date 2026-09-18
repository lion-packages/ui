export const AndroidStyleTypes = {
    FILLED: "filled",
    ELEVATED: "elevated",
    TONAL: "tonal",
    OUTLINED: "outlined",
    TEXT: "text",
} as const;

export type AndroidStyleTypes = (typeof AndroidStyleTypes)[keyof typeof AndroidStyleTypes];