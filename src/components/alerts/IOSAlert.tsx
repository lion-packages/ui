import React from "react";
import type { LionAlertProps } from "./LionAlertProps.tsx";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { IOSAlertStyleTypes } from "../../types/IOS/IOSAlertStyleTypes.tsx";
import { IOSAlertShapeTypes } from "../../types/IOS/IOSAlertShapeTypes.tsx";

const IOS_ICONS: Record<string, string> = {
    primary: "bi-info-circle-fill",
    secondary: "bi-bubble-left-fill",
    success: "bi-check-circle-fill",
    danger: "bi-exclamation-circle-fill",
    warning: "bi-exclamation-triangle-fill",
    info: "bi-info-circle-fill",
    dark: "bi-bell-fill",
};

/**
 * iOS Cupertino / SwiftUI Alert built from scratch with tinted, filled, and plain surfaces.
 */
export const IOSAlert: React.FC<LionAlertProps> = ({
                                                       variant = VariantTypes.PRIMARY,
                                                       styleType = IOSAlertStyleTypes.TINTED,
                                                       shape = IOSAlertShapeTypes.ROUNDED,
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
            <i className={`bi ${IOS_ICONS[variant] || "bi-info-circle-fill"}`} aria-hidden="true" />
        ) : null;

    const classes = [
        "ios-alert",
        `ios-alert-variant-${variant}`,
        `ios-alert-style-${styleType}`,
        `ios-alert-shape-${shape}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} role="alert">
            {resolvedIcon && <div className="ios-alert-icon">{resolvedIcon}</div>}

            <div className="ios-alert-content">
                {title && <div className="ios-alert-title">{title}</div>}
                {message && <div className="ios-alert-message">{message}</div>}
                {children}
            </div>

            {dismissible && (
                <button
                    type="button"
                    className="ios-alert-close"
                    onClick={onClose}
                    aria-label="Close alert"
                >
                    <i className="bi bi-x" aria-hidden="true" />
                </button>
            )}
        </div>
    );
};

export default IOSAlert;