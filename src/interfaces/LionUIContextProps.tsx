import type { LionUIState } from "./LionUIState.tsx";

export interface LionUIContextProps {
    state: LionUIState;
    updateState: (partial: Partial<LionUIState>) => void;
}