import React from "react";
import { Alert } from "react-bootstrap";
import type { LionAlertProps } from "./LionAlertProps.tsx";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { BootstrapAlertStyleTypes } from "../../types/Web/BootstrapAlertStyleTypes.tsx";
import { BootstrapAlertShapeTypes } from "../../types/Web/BootstrapAlertShapeTypes.tsx";

const DEFAULT_ICONS: Record<string, string> = {
    primary: "bi-info-circle-fill",
    secondary: "bi-chat-left-text-fill",
    success: "bi-check-circle-fill",
    danger: "bi-exclamation-octagon-fill",
    warning: "bi-exclamation-triangle-fill",
    info: "bi-info-circle-fill",
    dark: "bi-bell-fill",
    light: "bi-bell",
};

/**
 * Bootstrap Web Alert built on top of react-bootstrap with Lion styles, shapes, and custom variants.
 */
export const BootstrapAlert: React.FC<LionAlertProps> = ({
                                                             variant = VariantTypes.PRIMARY,
                                                             styleType = BootstrapAlertStyleTypes.SOFT,
                                                             shape = BootstrapAlertShapeTypes.ROUNDED,
                                                             title,
                                                             message,
                                                             children,
                                                             icon,
                                                             showIcon = true,
                                                             dismissible = false,
                                                             show = true,
                                                             onClose,
                                                             className = "",
                                                         }) => {
    if (!show) return null;

    const resolvedIcon =
        icon !== undefined ? (
            icon
        ) : showIcon ? (
            <i className={`bi ${DEFAULT_ICONS[variant] || "bi-info-circle-fill"} lion-bs-alert-icon`} aria-hidden="true" />
        ) : null;

    const classes = [
        "lion-bootstrap-alert",
        `lion-bs-variant-${variant}`,
        `lion-bs-style-${styleType}`,
        `lion-bs-shape-${shape}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Alert
            variant={variant}
            dismissible={dismissible}
            onClose={onClose}
            className={classes}
        >
            <div className="lion-bs-alert-body">
                {resolvedIcon && <div className="lion-bs-alert-icon-wrapper">{resolvedIcon}</div>}
                <div className="lion-bs-alert-content">
                    {title && <Alert.Heading className="lion-bs-alert-title">{title}</Alert.Heading>}
                    {message && <div className="lion-bs-alert-message">{message}</div>}
                    {children}
                </div>
            </div>
        </Alert>
    );
};

export default BootstrapAlert;