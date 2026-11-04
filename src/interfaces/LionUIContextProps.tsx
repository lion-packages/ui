import type { LionUIState } from "./LionUIState.tsx";

export interface LionUIContextProps {
    state: LionUIState;
    updateState: (partial: Partial<LionUIState>) => void;
    setFormErrors: (formId: string, errors: Record<string, string[]>) => void;
    clearFormErrors: (formId: string, fieldName?: string) => void;
}