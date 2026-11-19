import { type InputHTMLAttributes, type ReactNode } from "react";
import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { PlatformTypes } from "../../types/PlatformTypes.tsx";
import type { AndroidInputShapeTypes } from "../../types/Android/AndroidInputShapeTypes.tsx";
import type { AndroidInputStyleTypes } from "../../types/Android/AndroidInputStyleTypes.tsx";
import type { BootstrapInputShapeTypes } from "../../types/Web/BootstrapInputShapeTypes.tsx";
import type { BootstrapInputStyleTypes } from "../../types/Web/BootstrapInputStyleTypes.tsx";
import type { IOSInputShapeTypes } from "../../types/IOS/IOSInputShapeTypes.tsx";
import type { IOSInputStyleTypes } from "../../types/IOS/IOSInputStyleTypes.tsx";
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
    shape?: BootstrapInputShapeTypes | AndroidInputShapeTypes | IOSInputShapeTypes | string | PlatformMapping<BootstrapInputShapeTypes | AndroidInputShapeTypes | IOSInputShapeTypes | string>;
    styleType?: BootstrapInputStyleTypes | AndroidInputStyleTypes | IOSInputStyleTypes | string | PlatformMapping<BootstrapInputStyleTypes | AndroidInputStyleTypes | IOSInputStyleTypes | string>;
    label?: string;
    required?: boolean;
    requiredMessage?: string;
    helperText?: string;
    error?: boolean | string;
    formId?: string;
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