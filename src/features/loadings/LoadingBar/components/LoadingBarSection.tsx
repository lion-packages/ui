import { Fragment, useState } from "react";
import { ButtonTypes } from "../../../../types/ButtonTypes.tsx";
import { VariantTypes } from "../../../../types/VariantTypes.tsx";
import { PlatformTypes } from "../../../../types/PlatformTypes.tsx";
import { useLionUI } from "../../../../context/LionUIComponentsContext.tsx";
import LionButton from "../../../../components/buttons/LionButton.tsx";
import LoadingBar from "../../../../components/loadings/LoadingBar.tsx";
import VariantList from "../../../VariantList.tsx";

export default function LoadingBarSection() {
    const { updateState } = useLionUI();

    // Local state exclusively for this section's testing demo
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [activeVariant, setActiveVariant] = useState<VariantTypes | string>(VariantTypes.PRIMARY);

    // Trigger local loading state for 5 seconds simulation
    const handleTriggerLoading = (variant: VariantTypes | string) => {
        setActiveVariant(variant);
        setIsLoading(true);

        // Also update global loading if needed by the LoadingBar component, or handle it locally
        updateState({ loading: true });

        // Automatically disable loading after 5 seconds
        setTimeout(() => {
            setIsLoading(false);
            updateState({ loading: false });
        }, 5000);
    };

    return (
        <Fragment>
            <h2>Loading Bar Demonstrations</h2>
            <p className="text-muted">Click any button below to trigger the loading bar for 5 seconds using its respective variant.</p>

            {/* Top demonstration loading bar container using local state variant */}
            <div className="mb-4" style={{ minHeight: "10px" }}>
                <LoadingBar variant={activeVariant} />
            </div>

            <div className="d-flex gap-3 flex-wrap">
                {VariantList.map((variant) => (
                    <LionButton
                        key={variant}
                        platform={PlatformTypes.WEB}
                        variant={variant}
                        type={ButtonTypes.BUTTON}
                        disabled={isLoading}
                        onClick={() => handleTriggerLoading(variant)}
                    >
                        {isLoading && activeVariant === variant
                            ? "Loading..."
                            : `Test ${variant}`}
                    </LionButton>
                ))}
            </div>
        </Fragment>
    );
}