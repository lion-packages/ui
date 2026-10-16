// iOS HIG Corner Styles
export const IOSButtonShapeTypes = {
    ROUNDED: "rounded", // Standard squircle (rounded rectangle)
    CAPSULE: "capsule", // Fully rounded pill shape
} as const;

export type IOSButtonShapeTypes = (typeof IOSButtonShapeTypes)[keyof typeof IOSButtonShapeTypes];