import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useLionUI } from '../../context/LionUIComponentsContext.tsx';
import { PlatformTypes } from "../../types/PlatformTypes.tsx";
// @ts-ignore
import { SizeTypes } from "../../types/SizeTypes.tsx";
import type { AndroidStyleTypes } from "../../types/Android/AndroidStyleTypes.tsx";
import type { AndroidShapeTypes } from "../../types/Android/AndroidShapeTypes.tsx";
import type { BootstrapShapeTypes } from "../../types/Web/BootstrapShapeTypes.tsx";
import type { BootstrapStyleTypes } from "../../types/Web/BootstrapStyleTypes.tsx";
import type { IOSShapeTypes } from "../../types/IOS/IOSShapeTypes.tsx";
import type { IOSStyleTypes } from "../../types/IOS/IOSStyleTypes.tsx";
import AndroidButton from "./AndroidButton.tsx";
import IOSButton from "./IOSButton.tsx";
import BootstrapButton from "./BootstrapButton.tsx";

type PlatformMapping<T> = {
    [PlatformTypes.ANDROID]?: T;
    [PlatformTypes.IOS]?: T;
    [PlatformTypes.WEB]?: T;
    android?: T;
    ios?: T;
    web?: T;
};

export type LionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    variant?: string;
    // @ts-ignore
    size?: SizeTypes.SM | SizeTypes.MD | SizeTypes.LG;
    shape?: BootstrapShapeTypes | AndroidShapeTypes | IOSShapeTypes | string | PlatformMapping<BootstrapShapeTypes | AndroidShapeTypes | IOSShapeTypes | string>;
    styleType?: BootstrapStyleTypes | AndroidStyleTypes | IOSStyleTypes | string | PlatformMapping<BootstrapStyleTypes | AndroidStyleTypes | IOSStyleTypes | string>;
};

export default function LionButton({
                                       children,
                                       shape,
                                       styleType,
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