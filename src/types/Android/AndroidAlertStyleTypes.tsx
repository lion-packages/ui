/**
 * Defines the visual style variants for Android Material Design 3 alerts.
 */
export const AndroidAlertStyleTypes = {
    TONAL: "tonal",
    FILLED: "filled",
    OUTLINED: "outlined",
} as const;

export type AndroidAlertStyleTypes = (typeof AndroidAlertStyleTypes)[keyof typeof AndroidAlertStyleTypes];