export const AndroidInputStyleTypes = {
    FILLED: "filled",
    OUTLINED: "outlined",
} as const;

export type AndroidInputStyleTypes =
    (typeof AndroidInputStyleTypes)[keyof typeof AndroidInputStyleTypes];