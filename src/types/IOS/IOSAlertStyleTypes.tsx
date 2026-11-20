/**
 * Defines the visual style variants for iOS Cupertino / SwiftUI alerts.
 */
export const IOSAlertStyleTypes = {
    TINTED: "tinted",
    FILLED: "filled",
    PLAIN: "plain",
} as const;

export type IOSAlertStyleTypes = (typeof IOSAlertStyleTypes)[keyof typeof IOSAlertStyleTypes];