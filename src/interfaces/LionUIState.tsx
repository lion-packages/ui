import type { PlatformTypes } from "../types/PlatformTypes.tsx";

export interface LionUIState {
    platform: PlatformTypes;
    loading: boolean;
    reload: boolean;
    modal?: string | null;
}