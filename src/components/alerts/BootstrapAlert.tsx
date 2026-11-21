import { Alert } from "react-bootstrap";
import type { BaseAlertProps } from "./LionAlertProps.tsx";
import { PlatformTypes } from "../../types/PlatformTypes.tsx";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { BootstrapAlertStyleTypes } from "../../types/Web/BootstrapAlertStyleTypes.tsx";
import { BootstrapAlertShapeTypes } from "../../types/Web/BootstrapAlertShapeTypes.tsx";
import { resolveAlertDefaultIcon } from "../../types/AlertIconTypes.tsx";

export interface BootstrapAlertProps extends BaseAlertProps {
    styleType?: BootstrapAlertStyleTypes | string;
    shape?: BootstrapAlertShapeTypes | string;
}

export default function BootstrapAlert({
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
                                       }: BootstrapAlertProps) {
    if (!show) return null;

    const normalizedStyle = String(styleType).toLowerCase().replace(/_/g, "-");
    const normalizedShape = String(shape).toLowerCase().replace(/_/g, "-");
    const defaultIconClass = resolveAlertDefaultIcon(variant, PlatformTypes.WEB);

    const resolvedIcon =
        icon !== undefined ? (
            icon
        ) : showIcon ? (
            <i
                className={`bi ${defaultIconClass} lion-bs-alert-icon`}
                aria-hidden="true"
            />
        ) : null;

    const classes = [
        "lion-bootstrap-alert",
        `lion-bs-variant-${variant}`,
        `lion-bs-style-${normalizedStyle}`,
        `lion-bs-shape-${normalizedShape}`,
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
}