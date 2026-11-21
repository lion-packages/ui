import type { BaseAlertProps } from "./LionAlertProps.tsx";
import { PlatformTypes } from "../../types/PlatformTypes.tsx";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { IOSAlertStyleTypes } from "../../types/IOS/IOSAlertStyleTypes.tsx";
import { IOSAlertShapeTypes } from "../../types/IOS/IOSAlertShapeTypes.tsx";
import { resolveAlertDefaultIcon } from "../../types/AlertIconTypes.tsx";

export interface IOSAlertProps extends BaseAlertProps {
    styleType?: IOSAlertStyleTypes | string;
    shape?: IOSAlertShapeTypes | string;
}

export default function IOSAlert({
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
                                 }: IOSAlertProps) {
    if (!show) return null;

    const normalizedStyle = String(styleType).toLowerCase().replace(/_/g, "-");
    const normalizedShape = String(shape).toLowerCase().replace(/_/g, "-");
    const defaultIconClass = resolveAlertDefaultIcon(variant, PlatformTypes.IOS);

    const resolvedIcon =
        icon !== undefined ? (
            icon
        ) : showIcon ? (
            <i className={`bi ${defaultIconClass}`} aria-hidden="true" />
        ) : null;

    const classes = [
        "ios-alert",
        `ios-alert-variant-${variant}`,
        `ios-alert-style-${normalizedStyle}`,
        `ios-alert-shape-${normalizedShape}`,
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
}