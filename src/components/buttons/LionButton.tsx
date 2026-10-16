import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useLionUI } from '../../context/LionUIComponentsContext.tsx';
import { PlatformTypes } from "../../types/PlatformTypes.tsx";
// @ts-ignore
import { SizeTypes } from "../../types/SizeTypes.tsx";
import type { AndroidButtonStyleTypes } from "../../types/Android/AndroidButtonStyleTypes.tsx";
import type { AndroidButtonShapeTypes } from "../../types/Android/AndroidButtonShapeTypes.tsx";
import type { BootstrapButtonShapeTypes } from "../../types/Web/BootstrapButtonShapeTypes.tsx";
import type { BootstrapButtonStyleTypes } from "../../types/Web/BootstrapButtonStyleTypes.tsx";
import type { IOSButtonShapeTypes } from "../../types/IOS/IOSButtonShapeTypes.tsx";
import type { IOSButtonStyleTypes } from "../../types/IOS/IOSButtonStyleTypes.tsx";
import AndroidButton from "./AndroidButton.tsx";
import IOSButton from "./IOSButton.tsx";
import BootstrapButton from "./BootstrapButton.tsx";

type PlatformMapping<T> = {
    [PlatformTypes.ANDROID]?: T;
    [PlatformTypes.IOS]?: T;
    [PlatformTypes.WEB]?: T;
};

export type LionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: string;
    platform?: string;
    // @ts-ignore
    size?: SizeTypes.SM | SizeTypes.MD | SizeTypes.LG;
    shape?: BootstrapButtonShapeTypes | AndroidButtonShapeTypes | IOSButtonShapeTypes | string | PlatformMapping<BootstrapButtonShapeTypes | AndroidButtonShapeTypes | IOSButtonShapeTypes | string>;
    styleType?: BootstrapButtonStyleTypes | AndroidButtonStyleTypes | IOSButtonStyleTypes | string | PlatformMapping<BootstrapButtonStyleTypes | AndroidButtonStyleTypes | IOSButtonStyleTypes | string>;
};

export default function LionButton({
                                       children,
                                       shape,
                                       styleType,
                                       // @ts-ignore
                                       platform = null,
                                       ...props
                                   }: LionButtonProps) {
    const { state } = useLionUI();

    const activePlatform = platform ?? state.platform;

    const resolvePlatformProp = <T,>(propValue?: T | PlatformMapping<T>): T | undefined => {
        if (typeof propValue === 'object' && propValue !== null) {
            const map = propValue as PlatformMapping<T>;
            return map[activePlatform as keyof PlatformMapping<T>] ?? map[activePlatform.toLowerCase() as keyof PlatformMapping<T>];
        }
        return propValue as T;
    };

    const resolvedShape = resolvePlatformProp(shape);
    const resolvedStyleType = resolvePlatformProp(styleType);

    const buttonProps = {
        ...props,
        ...(resolvedShape !== undefined && { shape: resolvedShape }),
        ...(resolvedStyleType !== undefined && { styleType: resolvedStyleType }),
    };

    switch (activePlatform) {
        case PlatformTypes.ANDROID:
            return <AndroidButton {...(buttonProps as any)}>{children}</AndroidButton>;

        case PlatformTypes.IOS:
            return <IOSButton {...(buttonProps as any)}>{children}</IOSButton>;

        case PlatformTypes.WEB:
        case PlatformTypes.DESKTOP:
        default:
            return <BootstrapButton {...(buttonProps as any)}>{children}</BootstrapButton>;
    }
}