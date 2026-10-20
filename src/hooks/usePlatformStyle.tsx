import { useLionUI } from "../context/LionUIComponentsContext.tsx";
import { PlatformTypes } from "../types/PlatformTypes.tsx";

/**
 * Interface representing platform-specific configuration options.
 *
 * @template T - The type of value being configured.
 */
export interface PlatformConfig<T> {
    web: T;
    ios: T;
    android: T;
}

/**
 * Custom hook to resolve platform-specific styles or values using a single configuration object.
 *
 * @template T - The type of value being returned.
 * @param config - An object containing properties for web, ios, and android.
 * @returns The value matching the currently active platform in LionUI state.
 */
export default function usePlatformStyle<T>(config: PlatformConfig<T>): T {
    const { state } = useLionUI();

    if (state.platform === PlatformTypes.WEB || state.platform === PlatformTypes.DESKTOP) {
        return config.web;
    }

    if (state.platform === PlatformTypes.IOS) {
        return config.ios;
    }

    return config.android;
}