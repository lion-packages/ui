import React from "react";
import type { LionAlertProps } from "./LionAlertProps.tsx";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { AndroidAlertStyleTypes } from "../../types/Android/AndroidAlertStyleTypes.tsx";
import { AndroidAlertShapeTypes } from "../../types/Android/AndroidAlertShapeTypes.tsx";

const ANDROID_ICONS: Record<string, string> = {
    primary: "bi-info-circle",
    secondary: "bi-chat-square-text",
    success: "bi-check-circle",
    danger: "bi-exclamation-circle",
    warning: "bi-exclamation-triangle",
    info: "bi-info-circle",
    dark: "bi-bell",
};

/**
 * Android Material Design 3 Alert built from scratch with tonal, filled, and outlined surfaces.
 */
export const AndroidAlert: React.FC<LionAlertProps> = ({
                                                           variant = VariantTypes.PRIMARY,
                                                           styleType = AndroidAlertStyleTypes.TONAL,
                                                           shape = AndroidAlertShapeTypes.ROUNDED,
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
            <i className={`bi ${ANDROID_ICONS[variant] || "bi-info-circle"}`} aria-hidden="true" />
        ) : null;

    const classes = [
        "android-alert",
        `android-alert-variant-${variant}`,
        `android-alert-style-${styleType}`,
        `android-alert-shape-${shape}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} role="alert">
            {resolvedIcon && <div className="android-alert-icon">{resolvedIcon}</div>}

            <div className="android-alert-content">
                {title && <div className="android-alert-title">{title}</div>}
                {message && <div className="android-alert-message">{message}</div>}
                {children}
            </div>

            {dismissible && (
                <button
                    type="button"
                    className="android-alert-close"
                    onClick={onClose}
                    aria-label="Close alert"
                >
                    <i className="bi bi-x-lg" aria-hidden="true" />
                </button>
            )}
        </div>
    );
};

export default AndroidAlert;