import type { ReactNode } from "react";
import type { PlatformTypes } from "../../types/PlatformTypes.tsx";
import type { VariantTypes } from "../../types/VariantTypes.tsx";
import type { AndroidAlertStyleTypes } from "../../types/Android/AndroidAlertStyleTypes.tsx";
import type { BootstrapAlertStyleTypes } from "../../types/Web/BootstrapAlertStyleTypes.tsx";
import type { IOSAlertStyleTypes } from "../../types/IOS/IOSAlertStyleTypes.tsx";
import type { AndroidAlertShapeTypes } from "../../types/Android/AndroidAlertShapeTypes.tsx";
import type { BootstrapAlertShapeTypes } from "../../types/Web/BootstrapAlertShapeTypes.tsx";
import type { IOSAlertShapeTypes } from "../../types/IOS/IOSAlertShapeTypes.tsx";

export type PlatformMapping<T> = {
    [PlatformTypes.ANDROID]?: T;
    [PlatformTypes.IOS]?: T;
    [PlatformTypes.WEB]?: T;
};

export interface BaseAlertProps {
    variant?: VariantTypes | string;
    title?: ReactNode | string;
    message?: ReactNode | string;
    children?: ReactNode;
    icon?: ReactNode;
    showIcon?: boolean;
    dismissible?: boolean;
    show?: boolean;
    onClose?: () => void;
    className?: string;
}

export type LionAlertProps = BaseAlertProps & {
    platform?: string;
    shape?:
        | BootstrapAlertShapeTypes
        | AndroidAlertShapeTypes
        | IOSAlertShapeTypes
        | string
        | PlatformMapping<BootstrapAlertShapeTypes | AndroidAlertShapeTypes | IOSAlertShapeTypes | string>;
    styleType?:
        | BootstrapAlertStyleTypes
        | AndroidAlertStyleTypes
        | IOSAlertStyleTypes
        | string
        | PlatformMapping<BootstrapAlertStyleTypes | AndroidAlertStyleTypes | IOSAlertStyleTypes | string>;
};