import { VariantTypes } from "./VariantTypes.tsx";
import { PlatformTypes } from "./PlatformTypes.tsx";

/**
 * Defines default Bootstrap icon class names mapped by variant and platform.
 */
export const AlertDefaultIcons = {
    [PlatformTypes.WEB]: {
        [VariantTypes.PRIMARY]: "bi-info-circle-fill",
        [VariantTypes.SECONDARY]: "bi-info-circle-fill",
        [VariantTypes.SUCCESS]: "bi-check-circle-fill",
        [VariantTypes.DANGER]: "bi-exclamation-octagon-fill",
        [VariantTypes.WARNING]: "bi-exclamation-triangle-fill",
        [VariantTypes.INFO]: "bi-info-circle-fill",
        [VariantTypes.DARK]: "bi-bell-fill",
        [VariantTypes.LIGHT]: "bi-bell",
        [VariantTypes.LION_GLAM]: "bi-info-circle-fill",
        [VariantTypes.LION_PACKAGES]: "bi-box-seam-fill",
        [VariantTypes.LION_PARKING]: "bi-p-circle-fill",
        [VariantTypes.LION_TECH]: "bi-cpu-fill",
    },
    [PlatformTypes.ANDROID]: {
        [VariantTypes.PRIMARY]: "bi-info-circle",
        [VariantTypes.SECONDARY]: "bi-info-circle",
        [VariantTypes.SUCCESS]: "bi-check-circle",
        [VariantTypes.DANGER]: "bi-exclamation-circle",
        [VariantTypes.WARNING]: "bi-exclamation-triangle",
        [VariantTypes.INFO]: "bi-info-circle",
        [VariantTypes.DARK]: "bi-bell",
        [VariantTypes.LIGHT]: "bi-bell",
        [VariantTypes.LION_GLAM]: "bi-info-circle",
        [VariantTypes.LION_PACKAGES]: "bi-box-seam",
        [VariantTypes.LION_PARKING]: "bi-p-circle",
        [VariantTypes.LION_TECH]: "bi-cpu",
    },
    [PlatformTypes.IOS]: {
        [VariantTypes.PRIMARY]: "bi-info-circle-fill",
        [VariantTypes.SECONDARY]: "bi-info-circle-fill",
        [VariantTypes.SUCCESS]: "bi-check-circle-fill",
        [VariantTypes.DANGER]: "bi-exclamation-circle-fill",
        [VariantTypes.WARNING]: "bi-exclamation-triangle-fill",
        [VariantTypes.INFO]: "bi-info-circle-fill",
        [VariantTypes.DARK]: "bi-bell-fill",
        [VariantTypes.LIGHT]: "bi-bell",
        [VariantTypes.LION_GLAM]: "bi-info-circle-fill",
        [VariantTypes.LION_PACKAGES]: "bi-box-seam-fill",
        [VariantTypes.LION_PARKING]: "bi-p-circle-fill",
        [VariantTypes.LION_TECH]: "bi-cpu-fill",
    },
} as const;

export type AlertDefaultIcons = typeof AlertDefaultIcons;
export type AlertIconMap = Partial<Record<VariantTypes | string, string>>;

/**
 * Resolves the default Bootstrap icon class for a given alert variant and platform.
 */
export function resolveAlertDefaultIcon(
    variant: VariantTypes | string,
    platform: PlatformTypes | string,
    customIcons?: AlertIconMap
): string {
    if (customIcons?.[variant]) {
        return customIcons[variant]!;
    }

    const normalizedPlatform = String(platform).toLowerCase();
    const platformMap =
        AlertDefaultIcons[normalizedPlatform as keyof AlertDefaultIcons] ?? AlertDefaultIcons.web;

    return (
        platformMap[variant as keyof typeof platformMap] ??
        platformMap.primary ??
        "bi-info-circle-fill"
    );
}