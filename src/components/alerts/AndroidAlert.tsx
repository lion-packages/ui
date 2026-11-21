import type { BaseAlertProps } from "./LionAlertProps.tsx";
import { PlatformTypes } from "../../types/PlatformTypes.tsx";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { AndroidAlertStyleTypes } from "../../types/Android/AndroidAlertStyleTypes.tsx";
import { AndroidAlertShapeTypes } from "../../types/Android/AndroidAlertShapeTypes.tsx";
import { resolveAlertDefaultIcon } from "../../types/AlertIconTypes.tsx";

export interface AndroidAlertProps extends BaseAlertProps {
    styleType?: AndroidAlertStyleTypes | string;
    shape?: AndroidAlertShapeTypes | string;
}

export default function AndroidAlert({
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
                                     }: AndroidAlertProps) {
    if (!show) return null;

    const normalizedStyle = String(styleType).toLowerCase().replace(/_/g, "-");
    const normalizedShape = String(shape).toLowerCase().replace(/_/g, "-");
    const defaultIconClass = resolveAlertDefaultIcon(variant, PlatformTypes.ANDROID);

    const resolvedIcon =
        icon !== undefined ? (
            icon
        ) : showIcon ? (
            <i className={`bi ${defaultIconClass}`} aria-hidden="true" />
        ) : null;

    const classes = [
        "android-alert",
        `android-alert-variant-${variant}`,
        `android-alert-style-${normalizedStyle}`,
        `android-alert-shape-${normalizedShape}`,
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
}