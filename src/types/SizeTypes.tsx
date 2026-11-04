export const SizeTypes = {
    SX: "sx",
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "XL",
    XXL: "XXL",
} as const;

export type SizeTypes =
    (typeof SizeTypes)[keyof typeof SizeTypes];