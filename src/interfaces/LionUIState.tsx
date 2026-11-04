import { PlatformTypes } from "../types/PlatformTypes.tsx";

export interface LionUIState {
    platform: PlatformTypes;
    loading: boolean;
    reload: boolean;
    booting: boolean;
    sidebar: boolean;
    version: string | null;
    modal: any;
    logo: string | null;
    background: string | null;
    session: boolean;
    // Map of form validation errors indexed by formId and field name
    formErrors: Record<string, Record<string, string[]>>;
}