export const Size = {
    SX: "sm",
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "lg",
    XXL: "lg",
} as const;

export type Size =
    (typeof Size)[keyof typeof Size];