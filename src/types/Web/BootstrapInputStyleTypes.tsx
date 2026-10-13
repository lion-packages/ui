// Official Bootstrap 5 Input Style representations
export const BootstrapInputStyleTypes = {
    FLOATING: "floating",     // Native Bootstrap 5 .form-floating
    STANDARD: "standard",     // Native Bootstrap 5 .form-label + .form-control
} as const;

export type BootstrapInputStyleTypes =
    (typeof BootstrapInputStyleTypes)[keyof typeof BootstrapInputStyleTypes];