export const SizeTypes = {
    SX: "sx",
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "lg",
    XXL: "lg",
} as const;

export type SizeTypes =
    (typeof SizeTypes)[keyof typeof SizeTypes];