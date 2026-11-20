/**
 * Defines the border radius / corner shapes for Android Material Design 3 alerts.
 */
export const AndroidAlertShapeTypes = {
    ROUNDED: "rounded",
    SQUARE: "square",
} as const;

export type AndroidAlertShapeTypes = (typeof AndroidAlertShapeTypes)[keyof typeof AndroidAlertShapeTypes];