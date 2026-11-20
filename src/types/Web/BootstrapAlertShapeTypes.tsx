/**
 * Defines the border radius / corner shapes for Web Bootstrap alerts.
 */
export const BootstrapAlertShapeTypes = {
    ROUNDED: "rounded",
    PILL: "pill",
    SQUARE: "square",
} as const;

export type BootstrapAlertShapeTypes = (typeof BootstrapAlertShapeTypes)[keyof typeof BootstrapAlertShapeTypes];