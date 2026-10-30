import type { PlatformTypes } from "../types/PlatformTypes.tsx";

export interface LionUIState {
    platform: PlatformTypes;
    loading: boolean;
    reload: boolean;
    booting: boolean;
    sidebar: boolean;
    version: string | null,
    modal?: string | null;
    logo: File | string | null;
    background: File | string | null;
    session: boolean;
}