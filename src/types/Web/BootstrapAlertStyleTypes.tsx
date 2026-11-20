/**
 * Defines the visual style variants for Web Bootstrap alerts.
 */
export const BootstrapAlertStyleTypes = {
    SOFT: "soft",
    FILLED: "filled",
    OUTLINED: "outlined",
} as const;

export type BootstrapAlertStyleTypes = (typeof BootstrapAlertStyleTypes)[keyof typeof BootstrapAlertStyleTypes];