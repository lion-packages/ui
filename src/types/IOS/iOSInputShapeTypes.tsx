// Official iOS / SwiftUI layout shapes and corner radiuses
export const iOSInputShapeTypes = {
    ROUNDED: "rounded", // Standard continuous iOS rounded corner
    PILL: "pill",       // Capsule shape
    SQUARE: "square",   // Sharp edges
} as const;

export type iOSInputShapeTypes =
    (typeof iOSInputShapeTypes)[keyof typeof iOSInputShapeTypes];