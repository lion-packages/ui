import { type SelectHTMLAttributes } from "react";
import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { PlatformTypes } from "../../types/PlatformTypes.tsx";
import type { AndroidInputShapeTypes } from "../../types/Android/AndroidInputShapeTypes.tsx";
import type { AndroidInputStyleTypes } from "../../types/Android/AndroidInputStyleTypes.tsx";
import type { BootstrapInputShapeTypes } from "../../types/Web/BootstrapInputShapeTypes.tsx";
import type { BootstrapInputStyleTypes } from "../../types/Web/BootstrapInputStyleTypes.tsx";
import type { IOSInputShapeTypes } from "../../types/IOS/IOSInputShapeTypes.tsx";
import type { IOSInputStyleTypes } from "../../types/IOS/IOSInputStyleTypes.tsx";
import AndroidSelect, { type AndroidSelectOption } from "./AndroidSelect.tsx";
import IOSSelect, { type IOSSelectOption } from "./IOSSelect.tsx";
import BootstrapSelect, { type BootstrapSelectOption } from "./BootstrapSelect.tsx";

type PlatformMapping<T> = {
    [PlatformTypes.ANDROID]?: T;
    [PlatformTypes.IOS]?: T;
    [PlatformTypes.WEB]?: T;
};

export type LionSelectOption = AndroidSelectOption | IOSSelectOption | BootstrapSelectOption;

export type LionSelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "shape" | "size"> & {
    variant?: string;
    platform?: string;
    sizeType?: string;
    shape?: BootstrapInputShapeTypes | AndroidInputShapeTypes | IOSInputShapeTypes | string | PlatformMapping<BootstrapInputShapeTypes | AndroidInputShapeTypes | IOSInputShapeTypes | string>;
    styleType?: BootstrapInputStyleTypes | AndroidInputStyleTypes | IOSInputStyleTypes | string | PlatformMapping<BootstrapInputStyleTypes | AndroidInputStyleTypes | IOSInputStyleTypes | string>;
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: boolean | string;
    options: LionSelectOption[];
    placeholderOption?: string;
};

export default function LionSelect({
                                       shape,
                                       styleType,
                                       // @ts-ignore
                                       platform = null,
                                       ...props
                                   }: LionSelectProps) {
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

    const selectProps = {
        ...props,
        ...(resolvedShape !== undefined && { shape: resolvedShape }),
        ...(resolvedStyleType !== undefined && { styleType: resolvedStyleType }),
    };

    // Render the appropriate select component based on the active platform
    switch (activePlatform) {
        case PlatformTypes.ANDROID:
            return <AndroidSelect {...(selectProps as any)} />;

        case PlatformTypes.IOS:
            return <IOSSelect {...(selectProps as any)} />;

        case PlatformTypes.WEB:
        case PlatformTypes.DESKTOP:
        default:
            return <BootstrapSelect {...(selectProps as any)} />;
    }
}