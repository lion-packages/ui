// Official Bootstrap 5 layout shapes matching border-radius utilities
export const BootstrapInputShapeTypes = {
    ROUNDED: "rounded",       // Default Bootstrap border-radius
    PILL: "rounded-pill",     // Native Bootstrap .rounded-pill class
    SQUARE: "rounded-0",      // Native Bootstrap .rounded-0 class
} as const;

export type BootstrapInputShapeTypes =
    (typeof BootstrapInputShapeTypes)[keyof typeof BootstrapInputShapeTypes];