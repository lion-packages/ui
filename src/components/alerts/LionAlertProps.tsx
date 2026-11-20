import type { ReactNode } from "react";
import type { AndroidAlertStyleTypes } from "../../types/Android/AndroidAlertStyleTypes.tsx";
import type { BootstrapAlertStyleTypes } from "../../types/Web/BootstrapAlertStyleTypes.tsx";
import type { IOSAlertStyleTypes } from "../../types/IOS/IOSAlertStyleTypes.tsx";
import type { AndroidAlertShapeTypes } from "../../types/Android/AndroidAlertShapeTypes.tsx";
import type { BootstrapAlertShapeTypes } from "../../types/Web/BootstrapAlertShapeTypes.tsx";
import type { IOSAlertShapeTypes } from "../../types/IOS/IOSAlertShapeTypes.tsx";
import type { PlatformTypes } from "../../types/PlatformTypes.tsx";
import type { VariantTypes } from "../../types/VariantTypes.tsx";

export type AlertStyleType =
    | AndroidAlertStyleTypes
    | BootstrapAlertStyleTypes
    | IOSAlertStyleTypes
    | string;

export type AlertShapeType =
    | AndroidAlertShapeTypes
    | BootstrapAlertShapeTypes
    | IOSAlertShapeTypes
    | string;

export interface LionAlertProps {
    platform?: PlatformTypes;
    variant?: VariantTypes | string;
    styleType?: AlertStyleType;
    shape?: AlertShapeType;
    title?: string;
    message?: string;
    children?: ReactNode;
    icon?: ReactNode;
    showIcon?: boolean;
    dismissible?: boolean;
    show?: boolean;
    onClose?: () => void;
    className?: string;
}