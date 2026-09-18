// iOS HIG Corner Styles
export const IOSShapeTypes = {
    ROUNDED: "rounded", // Standard squircle (rounded rectangle)
    CAPSULE: "capsule", // Fully rounded pill shape
} as const;

export type IOSShapeTypes = (typeof IOSShapeTypes)[keyof typeof IOSShapeTypes];