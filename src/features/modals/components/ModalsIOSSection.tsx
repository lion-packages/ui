import { Fragment } from "react";
import { ButtonTypes } from "../../../types/ButtonTypes.tsx";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { PlatformTypes } from "../../../types/PlatformTypes.tsx";
import { SizeTypes } from "../../../types/SizeTypes.tsx";
import { useLionUI } from "../../../context/LionUIComponentsContext.tsx";
import LionModal from "../../../components/modals/LionModal.tsx";
import ModalsDefaultForm from "./ModalsDefaultForm.tsx";
import LionButton from "../../../components/buttons/LionButton.tsx";
import {IOSButtonStyleTypes} from "../../../types/IOS/IOSButtonStyleTypes.tsx";
import {IOSButtonShapeTypes} from "../../../types/IOS/IOSButtonShapeTypes.tsx";

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

const sizesList = [
    { size: SizeTypes.SM, label: "SM", titleSuffix: "Small Modal" },
    { size: SizeTypes.LG, label: "LG", titleSuffix: "Large Modal" },
    { size: SizeTypes.XL, label: "XL", titleSuffix: "Extra Large Modal" },
    { size: SizeTypes.LG, label: "Full", titleSuffix: "Fullscreen Modal", fullscreen: true as const },
];

const modalsConfig = variantsList.flatMap((variantObj) =>
    sizesList.map((sizeObj) => ({
        id: `ios-modal-${variantObj.type}-${sizeObj.label.toLowerCase()}`,
        label: sizeObj.label,
        size: sizeObj.size,
        fullscreen: sizeObj.fullscreen,
        variant: variantObj.type,
        title: `iOS ${variantObj.name} ${sizeObj.titleSuffix}`,
    }))
);

export default function ModalsIOSSection() {
    const { updateState } = useLionUI();

    return (
        <Fragment>
            <h2>Modals (iOS)</h2>

            {variantsList.map((variantObj) => {
                const variantModals = modalsConfig.filter(
                    (modal) => modal.variant === variantObj.type
                );

                return (
                    <div key={variantObj.type} className="mb-4">
                        <h5 className="text-muted mb-2">{variantObj.name}</h5>
                        <div className="d-flex gap-3 flex-wrap">
                            {variantModals.map((modal) => (
                                <LionButton
                                    key={modal.id}
                                    platform={PlatformTypes.IOS}
                                    variant={modal.variant}
                                    styleType={IOSButtonStyleTypes.TINTED}
                                    shape={IOSButtonShapeTypes.ROUNDED}
                                    // @ts-ignore
                                    type={ButtonTypes.BUTTON}
                                    onClick={() => updateState({ modal: modal.id })}
                                >
                                    {modal.label}
                                </LionButton>
                            ))}
                        </div>
                    </div>
                );
            })}

            {modalsConfig.map((modal) => (
                <LionModal
                    key={modal.id}
                    backdrop={"static"}
                    platform={PlatformTypes.IOS}
                    modalId={modal.id}
                    variant={modal.variant}
                    title={modal.title}
                    size={modal.size}
                    fullscreen={modal.fullscreen}
                    body={<ModalsDefaultForm platform={PlatformTypes.IOS} variant={modal.variant} />}
                    buttons={(
                        <LionButton
                            variant={VariantTypes.MODAL}
                            //@ts-ignore
                            type={ButtonTypes.BUTTON}
                            onClick={() => alert("Clicked")}
                        >
                            Click
                        </LionButton>
                    )}
                />
            ))}
        </Fragment>
    );
}