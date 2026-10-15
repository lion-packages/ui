import { Fragment, useState } from "react";
import { ButtonTypes } from "../../../types/ButtonTypes.tsx";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { PlatformTypes } from "../../../types/PlatformTypes.tsx";
import { useLionUI } from "../../../context/LionUIComponentsContext.tsx";
import LionButton from "../../../components/buttons/LionButton.tsx";
import LoadingBar from "../../../components/loadings/LoadingBar.tsx";

const variantsList = [
    { type: VariantTypes.SUCCESS, name: "Success" },
    { type: VariantTypes.INFO, name: "Info" },
    { type: VariantTypes.PRIMARY, name: "Primary" },
    { type: VariantTypes.DANGER, name: "Danger" },
    { type: VariantTypes.WARNING, name: "Warning" },
    { type: VariantTypes.LIGHT, name: "Light" },
    { type: VariantTypes.LINK, name: "Link" },
    { type: VariantTypes.DARK, name: "Dark" },
    { type: VariantTypes.LION_PACKAGES, name: "Lion Packages" },
    { type: VariantTypes.LION_PARKING, name: "Lion Parking" },
    { type: VariantTypes.LION_TECH, name: "Lion Tech" },
    { type: VariantTypes.LION_GLAM, name: "Lion Glam" },
];

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
                {variantsList.map((variantObj) => (
                    <LionButton
                        key={variantObj.type}
                        platform={PlatformTypes.WEB}
                        variant={variantObj.type}
                        type={ButtonTypes.BUTTON}
                        disabled={isLoading}
                        onClick={() => handleTriggerLoading(variantObj.type)}
                    >
                        {isLoading && activeVariant === variantObj.type
                            ? "Loading..."
                            : `Test ${variantObj.name}`}
                    </LionButton>
                ))}
            </div>
        </Fragment>
    );
}