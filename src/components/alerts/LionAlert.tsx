import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { PlatformTypes } from "../../types/PlatformTypes.tsx";
import type { LionAlertProps, PlatformMapping } from "./LionAlertProps.tsx";
import BootstrapAlert from "./BootstrapAlert.tsx";
import AndroidAlert from "./AndroidAlert.tsx";
import IOSAlert from "./IOSAlert.tsx";

export default function LionAlert({
                                      shape,
                                      styleType,
                                      // @ts-ignore
                                      platform = null,
                                      ...props
                                  }: LionAlertProps) {
    const { state } = useLionUI();

    // Resolve active platform from props or global context
    const activePlatform = platform ?? state.platform;

    // Helper function to resolve platform-specific property mappings
    const resolvePlatformProp = <T,>(propValue?: T | PlatformMapping<T>): T | undefined => {
        if (typeof propValue === "object" && propValue !== null) {
            const map = propValue as PlatformMapping<T>;
            return (
                map[activePlatform as keyof PlatformMapping<T>] ??
                map[String(activePlatform).toLowerCase() as keyof PlatformMapping<T>]
            );
        }
        return propValue as T;
    };

    const resolvedShape = resolvePlatformProp(shape);
    const resolvedStyleType = resolvePlatformProp(styleType);

    const alertProps = {
        ...props,
        ...(resolvedShape !== undefined && { shape: resolvedShape }),
        ...(resolvedStyleType !== undefined && { styleType: resolvedStyleType }),
    };

    // Render the appropriate alert component based on the active platform
    switch (activePlatform) {
        case PlatformTypes.ANDROID:
            return <AndroidAlert {...(alertProps as any)} />;

        case PlatformTypes.IOS:
            return <IOSAlert {...(alertProps as any)} />;

        case PlatformTypes.WEB:
        case PlatformTypes.DESKTOP:
        default:
            return <BootstrapAlert {...(alertProps as any)} />;
    }
}