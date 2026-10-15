// Official iOS / SwiftUI layout shapes and corner radiuses
export const IOSInputShapeTypes = {
    ROUNDED: "rounded", // Standard continuous iOS rounded corner
    PILL: "pill",       // Capsule shape
    SQUARE: "square",   // Sharp edges
} as const;

export type IOSInputShapeTypes =
    (typeof IOSInputShapeTypes)[keyof typeof IOSInputShapeTypes];