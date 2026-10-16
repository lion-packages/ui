import { type InputHTMLAttributes, type ReactNode } from "react";
import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { PlatformTypes } from "../../types/PlatformTypes.tsx";
import type { AndroidButtonStyleTypes } from "../../types/Android/AndroidButtonStyleTypes.tsx";
import type { AndroidButtonShapeTypes } from "../../types/Android/AndroidButtonShapeTypes.tsx";
import type { BootstrapButtonShapeTypes } from "../../types/Web/BootstrapButtonShapeTypes.tsx";
import type { BootstrapButtonStyleTypes } from "../../types/Web/BootstrapButtonStyleTypes.tsx";
import type { IOSButtonShapeTypes } from "../../types/IOS/IOSButtonShapeTypes.tsx";
import type { IOSButtonStyleTypes } from "../../types/IOS/IOSButtonStyleTypes.tsx";
import AndroidInput from "./AndroidInput.tsx";
import IOSInput from "./IOSInput.tsx";
import BootstrapInput from "./BootstrapInput.tsx";

type PlatformMapping<T> = {
    [PlatformTypes.ANDROID]?: T;
    [PlatformTypes.IOS]?: T;
    [PlatformTypes.WEB]?: T;
};

export type LionInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "shape"> & {
    variant?: string;
    platform?: string;
    sizeType?: string;
    shape?: BootstrapButtonShapeTypes | AndroidButtonShapeTypes | IOSButtonShapeTypes | string | PlatformMapping<BootstrapButtonShapeTypes | AndroidButtonShapeTypes | IOSButtonShapeTypes | string>;
    styleType?: BootstrapButtonStyleTypes | AndroidButtonStyleTypes | IOSButtonStyleTypes | string | PlatformMapping<BootstrapButtonStyleTypes | AndroidButtonStyleTypes | IOSButtonStyleTypes | string>;
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: boolean | string;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    prefixText?: string;
    suffixText?: string;
    counter?: boolean | number;
    clearable?: boolean;
};

export default function LionInput({
                                      shape,
                                      styleType,
                                      // @ts-ignore
                                      platform = null,
                                      ...props
                                  }: LionInputProps) {
    const { state } = useLionUI();

    // Resolve active platform from props or global context
    const activePlatform = platform ?? state.platform;

    // Helper function to resolve platform-specific property mappings
    const resolvePlatformProp = <T,>(propValue?: T | PlatformMapping<T>): T | undefined => {
        if (typeof propValue === "object" && propValue !== null) {
            const map = propValue as PlatformMapping<T>;
            return map[activePlatform as keyof PlatformMapping<T>] ?? map[activePlatform.toLowerCase() as keyof PlatformMapping<T>];
        }
        return propValue as T;
    };

    const resolvedShape = resolvePlatformProp(shape);
    const resolvedStyleType = resolvePlatformProp(styleType);

    const inputProps = {
        ...props,
        ...(resolvedShape !== undefined && { shape: resolvedShape }),
        ...(resolvedStyleType !== undefined && { styleType: resolvedStyleType }),
    };

    // Render the appropriate input component based on the active platform
    switch (activePlatform) {
        case PlatformTypes.ANDROID:
            return <AndroidInput {...(inputProps as any)} />;

        case PlatformTypes.IOS:
            return <IOSInput {...(inputProps as any)} />;

        case PlatformTypes.WEB:
        case PlatformTypes.DESKTOP:
        default:
            return <BootstrapInput {...(inputProps as any)} />;
    }
}