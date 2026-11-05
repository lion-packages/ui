import { Fragment, useState } from "react";
import { ButtonTypes } from "../../../types/ButtonTypes.tsx";
import { AndroidButtonShapeTypes } from "../../../types/Android/AndroidButtonShapeTypes.tsx";
import { AndroidButtonStyleTypes } from "../../../types/Android/AndroidButtonStyleTypes.tsx";
import { IOSButtonStyleTypes } from "../../../types/IOS/IOSButtonStyleTypes.tsx";
import { IOSButtonShapeTypes } from "../../../types/IOS/IOSButtonShapeTypes.tsx";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { PlatformTypes } from "../../../types/PlatformTypes.tsx";
import { SizeTypes } from "../../../types/SizeTypes.tsx";
import { useLionUI } from "../../../context/LionUIComponentsContext.tsx";
import LionModal from "../../../components/modals/LionModal.tsx";
import ModalsDefaultForm from "./ModalsDefaultForm.tsx";
import LionButton from "../../../components/buttons/LionButton.tsx";
import LionModalButton from "../../../components/buttons/LionModalButton.tsx";

const platformsList = [
    { type: PlatformTypes.ANDROID, label: "Android" },
    { type: PlatformTypes.IOS, label: "iOS" },
    { type: PlatformTypes.WEB, label: "Web" },
];

const variantsList = [
    { type: VariantTypes.SUCCESS, label: "Success" },
    { type: VariantTypes.INFO, label: "Info" },
    { type: VariantTypes.PRIMARY, label: "Primary" },
    { type: VariantTypes.DANGER, label: "Danger" },
    { type: VariantTypes.WARNING, label: "Warning" },
    { type: VariantTypes.LIGHT, label: "Light" },
    { type: VariantTypes.LINK, label: "Link" },
    { type: VariantTypes.DARK, label: "Dark" },
    { type: VariantTypes.LION_PACKAGES, label: "Lion Packages" },
    { type: VariantTypes.LION_PARKING, label: "Lion Parking" },
    { type: VariantTypes.LION_TECH, label: "Lion Tech" },
    { type: VariantTypes.LION_GLAM, label: "Lion Glam" },
];

const sizesList = [
    { size: SizeTypes.SM, label: "Small (SM)", titleSuffix: "Small Modal", codeLabel: "SizeTypes.SM" },
    { size: SizeTypes.MD, label: "Medium (MD)", titleSuffix: "Medium Modal", codeLabel: "SizeTypes.MD" },
    { size: SizeTypes.LG, label: "Large (LG)", titleSuffix: "Large Modal", codeLabel: "SizeTypes.LG" },
    { size: SizeTypes.XL, label: "Extra Large (XL)", titleSuffix: "Extra Large Modal", codeLabel: "SizeTypes.XL" },
    { size: SizeTypes.LG, label: "Fullscreen", titleSuffix: "Fullscreen Modal", codeLabel: "SizeTypes.LG", fullscreen: true as const },
];

export default function LionModalSection() {
    const { updateState } = useLionUI();

    // Estados para parametrización mediante selects
    const [selectedPlatform, setSelectedPlatform] = useState<PlatformTypes>(PlatformTypes.ANDROID);
    const [selectedVariant, setSelectedVariant] = useState<VariantTypes>(VariantTypes.PRIMARY);
    const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);

    // Obtener configuración del tamaño seleccionado
    const currentSizeObj = sizesList[selectedSizeIndex];
    const platformPrefix = selectedPlatform.toLowerCase();

    // Identificador único y propiedades del modal parametrizado
    const modalId = `custom-modal-${platformPrefix}-${selectedVariant}-${currentSizeObj.label.toLowerCase().replace(/[^a-z]/g, '')}`;
    const modalTitle = `${selectedPlatform} ${selectedVariant.toUpperCase()} ${currentSizeObj.titleSuffix}`;

    // Renderizado del botón disparador según la plataforma activa
    const renderTriggerButton = () => {
        if (selectedPlatform === PlatformTypes.ANDROID) {
            return (
                <LionButton
                    platform={PlatformTypes.ANDROID}
                    shape={AndroidButtonShapeTypes.ROUNDED}
                    styleType={AndroidButtonStyleTypes.TONAL}
                    variant={selectedVariant}
                    type={ButtonTypes.BUTTON}
                    onClick={() => updateState({ modal: modalId })}
                >
                    Open Parametrized Modal
                </LionButton>
            );
        }

        if (selectedPlatform === PlatformTypes.IOS) {
            return (
                <LionButton
                    platform={PlatformTypes.IOS}
                    variant={selectedVariant}
                    styleType={IOSButtonStyleTypes.TINTED}
                    shape={IOSButtonShapeTypes.ROUNDED}
                    type={ButtonTypes.BUTTON}
                    onClick={() => updateState({ modal: modalId })}
                >
                    Open Parametrized Modal
                </LionButton>
            );
        }

        return (
            <LionButton
                platform={PlatformTypes.WEB}
                variant={selectedVariant}
                type={ButtonTypes.BUTTON}
                onClick={() => updateState({ modal: modalId })}
            >
                Open Parametrized Modal
            </LionButton>
        );
    };

    // Generar el código de ejemplo sincronizado con el estado actual
    const dynamicCodeExample = `import { LionModal, LionButton, PlatformTypes, VariantTypes, SizeTypes } from "@lion-npm/ui";
import { useLionUI } from "@lion-npm/ui";

export default function MyComponent() {
    const { updateState } = useLionUI();
    const modalId = "${modalId}";

    return (
        <>
            <LionButton 
                platform={PlatformTypes.${selectedPlatform.toUpperCase()}} 
                variant={VariantTypes.${selectedVariant.toUpperCase()}}
                onClick={() => updateState({ modal: modalId })}
            >
                Launch Modal
            </LionButton>

            <LionModal
                platform={PlatformTypes.${selectedPlatform.toUpperCase()}}
                modalId={modalId}
                variant={VariantTypes.${selectedVariant.toUpperCase()}}
                title="${modalTitle}"
                size={${currentSizeObj.codeLabel}}
                ${currentSizeObj.fullscreen ? 'fullscreen={true}' : ''}
                body={<p>Modal content goes here...</p>}
            />
        </>
    );
}`;

    return (
        <Fragment>
            <h2>LionModal Playground</h2>
            <p className="text-muted">Configure platform, variant, and size to test the modal component dynamically.</p>

            {/* Panel de Parametrización (Selects) */}
            <div className="card p-4 mb-4 bg-light border">
                <div className="row g-3">
                    {/* Platform Select */}
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Platform Environment</label>
                        <select
                            className="form-select"
                            value={selectedPlatform}
                            onChange={(e) => setSelectedPlatform(e.target.value as PlatformTypes)}
                        >
                            {platformsList.map((p) => (
                                <option key={p.type} value={p.type}>
                                    {p.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Variant Select */}
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Variant Style</label>
                        <select
                            className="form-select"
                            value={selectedVariant}
                            onChange={(e) => setSelectedVariant(e.target.value as VariantTypes)}
                        >
                            {variantsList.map((v) => (
                                <option key={v.type} value={v.type}>
                                    {v.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Size Select */}
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Modal Size</label>
                        <select
                            className="form-select"
                            value={selectedSizeIndex}
                            onChange={(e) => setSelectedSizeIndex(Number(e.target.value))}
                        >
                            {sizesList.map((s, idx) => (
                                <option key={idx} value={idx}>
                                    {s.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    {renderTriggerButton()}
                </div>
            </div>

            {/* Documentación con Código de Ejemplo Sincronizado */}
            <div className="card p-4 mb-4 border bg-white shadow-sm">
                <h4 className="card-title h5 mb-3 text-primary">Usage Documentation & Synchronized Code Example</h4>
                <p className="card-text text-secondary mb-3">
                    The code snippet below updates automatically based on your current platform, variant, and size selections:
                </p>
                <pre className="bg-dark text-light p-3 rounded mb-0" style={{ fontSize: "0.85rem" }}>
                    <code>{dynamicCodeExample}</code>
                </pre>
            </div>

            {/* Renderizado único del LionModal parametrizado */}
            <LionModal
                key={modalId}
                backdrop={selectedPlatform === PlatformTypes.IOS ? "static" : undefined}
                platform={selectedPlatform}
                modalId={modalId}
                variant={selectedVariant}
                title={modalTitle}
                size={currentSizeObj.size}
                fullscreen={currentSizeObj.fullscreen}
                body={<ModalsDefaultForm platform={selectedPlatform} variant={selectedVariant} />}
                buttons={
                    <LionModalButton
                        variant={VariantTypes.MODAL}
                        type={ButtonTypes.BUTTON}
                        onClick={() => alert("Action Executed")}
                    >
                        Confirm
                    </LionModalButton>
                }
            />
        </Fragment>
    );
}