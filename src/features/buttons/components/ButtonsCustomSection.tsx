import type { TargetPlatform } from "../../../types/Types.tsx";
import { PlatformTypes } from "../../../types/PlatformTypes.tsx";
import VariantList from "../../VariantList.tsx";
import { ButtonTypes } from "../../../types/ButtonTypes.tsx";
import { AndroidStyleTypes } from "../../../types/Android/AndroidStyleTypes.tsx";
import { IOSStyleTypes } from "../../../types/IOS/IOSStyleTypes.tsx";
import { BootstrapStyleTypes } from "../../../types/Web/BootstrapStyleTypes.tsx";
import { AndroidShapeTypes } from "../../../types/Android/AndroidShapeTypes.tsx";
import { IOSShapeTypes } from "../../../types/IOS/IOSShapeTypes.tsx";
import { BootstrapShapeTypes } from "../../../types/Web/BootstrapShapeTypes.tsx";

import { Fragment, useState } from "react";
import { LionButton } from "../../../components/buttons/LionButton.tsx";

const shapesByPlatform = {
    [PlatformTypes.ANDROID]: [
        { label: "Pill", value: AndroidShapeTypes.PILL },
        { label: "Rounded", value: AndroidShapeTypes.ROUNDED },
    ],
    [PlatformTypes.IOS]: [
        { label: "Capsule", value: IOSShapeTypes.CAPSULE },
        { label: "Rounded", value: IOSShapeTypes.ROUNDED },
    ],
    [PlatformTypes.WEB]: [
        { label: "Default", value: BootstrapShapeTypes.DEFAULT },
        { label: "Pill", value: BootstrapShapeTypes.PILL },
        { label: "Square", value: BootstrapShapeTypes.SQUARE },
    ],
};

const stylesByPlatform = {
    [PlatformTypes.ANDROID]: [
        { label: "Tonal", value: AndroidStyleTypes.TONAL },
        { label: "Filled", value: AndroidStyleTypes.FILLED },
        { label: "Elevated", value: AndroidStyleTypes.ELEVATED },
        { label: "Outlined", value: AndroidStyleTypes.OUTLINED },
        { label: "Text", value: AndroidStyleTypes.TEXT },
    ],
    [PlatformTypes.IOS]: [
        { label: "Tinted", value: IOSStyleTypes.TINTED },
        { label: "Filled", value: IOSStyleTypes.FILLED },
        { label: "Gray", value: IOSStyleTypes.GRAY },
        { label: "Plain", value: IOSStyleTypes.PLAIN },
    ],
    [PlatformTypes.WEB]: [
        { label: "Filled", value: BootstrapStyleTypes.FILLED },
        { label: "Outlined", value: BootstrapStyleTypes.OUTLINED },
    ],
};

export default function ButtonsCustomSection() {
    const [selectedPlatform, setSelectedPlatform] = useState<TargetPlatform>(PlatformTypes.ANDROID);
    const [selectedAndroidShape, setSelectedAndroidShape] = useState<AndroidShapeTypes>(AndroidShapeTypes.PILL);
    const [selectedIOSShape, setSelectedIOSShape] = useState<IOSShapeTypes>(IOSShapeTypes.CAPSULE);
    const [selectedWebShape, setSelectedWebShape] = useState<BootstrapShapeTypes>(BootstrapShapeTypes.DEFAULT);

    const [selectedAndroidStyle, setSelectedAndroidStyle] = useState<AndroidStyleTypes>(AndroidStyleTypes.TONAL);
    const [selectedIOSStyle, setSelectedIOSStyle] = useState<IOSStyleTypes>(IOSStyleTypes.TINTED);
    const [selectedWebStyle, setSelectedWebStyle] = useState<BootstrapStyleTypes>(BootstrapStyleTypes.FILLED);

    return (
        <Fragment>
            <h2>Buttons (Custom Cross-Platform Test)</h2>

            {/* Panel de Controles de Simulación */}
            <div className="card p-3 mb-4 bg-light">
                <div className="row g-3">
                    {/* Selector de Plataforma */}
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Plataforma:</label>
                        <div className="btn-group w-100" role="group">
                            <button
                                type="button"
                                className={`btn ${selectedPlatform === PlatformTypes.ANDROID ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => setSelectedPlatform(PlatformTypes.ANDROID)}
                            >
                                Android
                            </button>
                            <button
                                type="button"
                                className={`btn ${selectedPlatform === PlatformTypes.IOS ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => setSelectedPlatform(PlatformTypes.IOS)}
                            >
                                iOS
                            </button>
                            <button
                                type="button"
                                className={`btn ${selectedPlatform === PlatformTypes.WEB ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => setSelectedPlatform(PlatformTypes.WEB)}
                            >
                                Web
                            </button>
                        </div>
                    </div>

                    {/* Selector de Forma (Shape) según Plataforma Activa */}
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Forma (Shape):</label>
                        {selectedPlatform === PlatformTypes.ANDROID && (
                            <select
                                className="form-select"
                                value={selectedAndroidShape}
                                onChange={(e) => setSelectedAndroidShape(e.target.value as AndroidShapeTypes)}
                            >
                                {shapesByPlatform[PlatformTypes.ANDROID].map((s) => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        )}
                        {selectedPlatform === PlatformTypes.IOS && (
                            <select
                                className="form-select"
                                value={selectedIOSShape}
                                onChange={(e) => setSelectedIOSShape(e.target.value as IOSShapeTypes)}
                            >
                                {shapesByPlatform[PlatformTypes.IOS].map((s) => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        )}
                        {selectedPlatform === PlatformTypes.WEB && (
                            <select
                                className="form-select"
                                value={selectedWebShape}
                                onChange={(e) => setSelectedWebShape(e.target.value as BootstrapShapeTypes)}
                            >
                                {shapesByPlatform[PlatformTypes.WEB].map((s) => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Selector de Estilo (StyleType) según Plataforma Activa */}
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Estilo (StyleType):</label>
                        {selectedPlatform === PlatformTypes.ANDROID && (
                            <select
                                className="form-select"
                                value={selectedAndroidStyle}
                                onChange={(e) => setSelectedAndroidStyle(e.target.value as AndroidStyleTypes)}
                            >
                                {stylesByPlatform[PlatformTypes.ANDROID].map((s) => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        )}
                        {selectedPlatform === PlatformTypes.IOS && (
                            <select
                                className="form-select"
                                value={selectedIOSStyle}
                                onChange={(e) => setSelectedIOSStyle(e.target.value as IOSStyleTypes)}
                            >
                                {stylesByPlatform[PlatformTypes.IOS].map((s) => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        )}
                        {selectedPlatform === PlatformTypes.WEB && (
                            <select
                                className="form-select"
                                value={selectedWebStyle}
                                onChange={(e) => setSelectedWebStyle(e.target.value as BootstrapStyleTypes)}
                            >
                                {stylesByPlatform[PlatformTypes.WEB].map((s) => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
            </div>

            <div className="my-4">
                <h4 className="text-primary mb-3">
                    Multiplatform Mapping (Plataforma activa: <span className="text-uppercase">{selectedPlatform}</span>)
                </h4>

                <div className="ms-3 mb-4">
                    {/* Enabled State */}
                    <div className="mb-3">
                        <span className="text-muted d-block mb-1 small">Enabled</span>
                        <div className="d-flex flex-wrap gap-2 py-1">
                            {VariantList.map((variant) => (
                                <LionButton
                                    key={`custom-${variant}-enabled`}
                                    type={ButtonTypes.BUTTON}
                                    platform={selectedPlatform}
                                    variant={variant}
                                    styleType={{
                                        android: selectedAndroidStyle,
                                        ios: selectedIOSStyle,
                                        web: selectedWebStyle,
                                    }}
                                    shape={{
                                        android: selectedAndroidShape,
                                        ios: selectedIOSShape,
                                        web: selectedWebShape,
                                    }}
                                >
                                    {variant}
                                </LionButton>
                            ))}
                        </div>
                    </div>

                    {/* Disabled State */}
                    <div>
                        <span className="text-muted d-block mb-1 small">Disabled</span>
                        <div className="d-flex flex-wrap gap-2 py-1">
                            {VariantList.map((variant) => (
                                <LionButton
                                    key={`custom-${variant}-disabled`}
                                    type={ButtonTypes.BUTTON}
                                    platform={selectedPlatform}
                                    variant={variant}
                                    disabled={true}
                                    styleType={{
                                        android: selectedAndroidStyle,
                                        ios: selectedIOSStyle,
                                        web: selectedWebStyle,
                                    }}
                                    shape={{
                                        android: selectedAndroidShape,
                                        ios: selectedIOSShape,
                                        web: selectedWebShape,
                                    }}
                                >
                                    {variant}
                                </LionButton>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}