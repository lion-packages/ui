export const AndroidShapeTypes = {
    PILL: "pill",
    ROUNDED: "rounded",
} as const;

export type AndroidShapeTypes = (typeof AndroidShapeTypes)[keyof typeof AndroidShapeTypes];