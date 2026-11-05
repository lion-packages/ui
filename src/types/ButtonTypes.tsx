export const ButtonTypes = {
    SUBMIT: "submit",
    BUTTON: "button",
    RESET: "reset",
} as const;

export type ButtonTypes =
    (typeof ButtonTypes)[keyof typeof ButtonTypes];