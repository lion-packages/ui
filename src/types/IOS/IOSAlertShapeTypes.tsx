/**
 * Defines the border radius / corner shapes for iOS Cupertino / SwiftUI alerts.
 */
export const IOSAlertShapeTypes = {
    ROUNDED: "rounded",
    PILL: "pill",
    SQUARE: "square",
} as const;

export type IOSAlertShapeTypes = (typeof IOSAlertShapeTypes)[keyof typeof IOSAlertShapeTypes];