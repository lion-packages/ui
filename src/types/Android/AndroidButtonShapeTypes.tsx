export const AndroidButtonShapeTypes = {
    PILL: "pill",
    ROUNDED: "rounded",
} as const;

export type AndroidButtonShapeTypes = (typeof AndroidButtonShapeTypes)[keyof typeof AndroidButtonShapeTypes];