import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { VariantTypes } from "../../types/VariantTypes.tsx";

export interface LoadingBarProps {
    variant?: VariantTypes | string;
}

export default function LoadingBar({ variant = VariantTypes.PRIMARY }: LoadingBarProps) {
    const { state } = useLionUI();
    const normalizedVariant = String(variant).toLowerCase().replace(/_/g, "-");
    const variantClass = variant ? `loading-variant-${normalizedVariant}` : "";

    return state.loading ? (
        <div className="sticky-top">
            <div className={`lion-bar ${variantClass}`}>
                <div className="indeterminate"></div>
            </div>
        </div>
    ) : null;
}