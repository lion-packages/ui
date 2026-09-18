// Bootstrap 5 Button Styles
export const BootstrapStyleTypes = {
    FILLED: "filled",     // Standard solid Bootstrap button (e.g., .btn-primary)
    OUTLINED: "outlined", // Bordered transparent button (e.g., .btn-outline-primary)
} as const;

export type BootstrapStyleTypes = (typeof BootstrapStyleTypes)[keyof typeof BootstrapStyleTypes];