export const ButtonTypes = {
    SUBMIT: "submit",
    BUTTON: "button",
    RESET: "reset",
    UNDEFINED: undefined,
};

export type ButtonTypes =
    (typeof ButtonTypes)[keyof typeof ButtonTypes];