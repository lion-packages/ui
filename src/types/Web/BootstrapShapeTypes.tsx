// Bootstrap 5 Corner Radius Options
export const BootstrapShapeTypes = {
    STANDARD: "standard", // Standard Bootstrap border radius (~0.375rem)
    PILL: "pill",       // Fully rounded pill shape (.rounded-pill)
    SQUARE: "square",   // Sharp corners (.rounded-0)
} as const;

export type BootstrapShapeTypes = (typeof BootstrapShapeTypes)[keyof typeof BootstrapShapeTypes];