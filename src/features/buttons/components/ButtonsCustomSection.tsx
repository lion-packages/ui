import VariantList from "../../VariantList.tsx";
import { PlatformTypes } from "../../../types/PlatformTypes.tsx";
import { ButtonTypes } from "../../../types/ButtonTypes.tsx";
import { AndroidButtonStyleTypes } from "../../../types/Android/AndroidButtonStyleTypes.tsx";
import { IOSButtonStyleTypes } from "../../../types/IOS/IOSButtonStyleTypes.tsx";
import { BootstrapButtonStyleTypes } from "../../../types/Web/BootstrapButtonStyleTypes.tsx";
import { AndroidButtonShapeTypes } from "../../../types/Android/AndroidButtonShapeTypes.tsx";
import { IOSButtonShapeTypes } from "../../../types/IOS/IOSButtonShapeTypes.tsx";
import { BootstrapButtonShapeTypes } from "../../../types/Web/BootstrapButtonShapeTypes.tsx";

import { Fragment, useState } from "react";
import LionButton from "../../../components/buttons/LionButton.tsx";

const shapesByPlatform = {
    [PlatformTypes.ANDROID]: [
        { label: "Pill", value: AndroidButtonShapeTypes.PILL },
        { label: "Rounded", value: AndroidButtonShapeTypes.ROUNDED },
    ],
    [PlatformTypes.IOS]: [
        { label: "Capsule", value: IOSButtonShapeTypes.CAPSULE },
        { label: "Rounded", value: IOSButtonShapeTypes.ROUNDED },
    ],
    [PlatformTypes.WEB]: [
        { label: "Standard", value: BootstrapButtonShapeTypes.STANDARD },
        { label: "Pill", value: BootstrapButtonShapeTypes.PILL },
        { label: "Square", value: BootstrapButtonShapeTypes.SQUARE },
    ],
};

const stylesByPlatform = {
    [PlatformTypes.ANDROID]: [
        { label: "Tonal", value: AndroidButtonStyleTypes.TONAL },
        { label: "Filled", value: AndroidButtonStyleTypes.FILLED },
        { label: "Elevated", value: AndroidButtonStyleTypes.ELEVATED },
        { label: "Outlined", value: AndroidButtonStyleTypes.OUTLINED },
        { label: "Text", value: AndroidButtonStyleTypes.TEXT },
    ],
    [PlatformTypes.IOS]: [
        { label: "Tinted", value: IOSButtonStyleTypes.TINTED },
        { label: "Filled", value: IOSButtonStyleTypes.FILLED },
        { label: "Gray", value: IOSButtonStyleTypes.GRAY },
        { label: "Plain", value: IOSButtonStyleTypes.PLAIN },
    ],
    [PlatformTypes.WEB]: [
        { label: "Filled", value: BootstrapButtonStyleTypes.FILLED },
        { label: "Outlined", value: BootstrapButtonStyleTypes.OUTLINED },
    ],
};

export default function ButtonsCustomSection() {
    const [selectedPlatform, setSelectedPlatform] = useState<PlatformTypes>(PlatformTypes.ANDROID);
    const [selectedAndroidShape, setSelectedAndroidShape] = useState<AndroidButtonShapeTypes>(AndroidButtonShapeTypes.PILL);
    const [selectedIOSShape, setSelectedIOSShape] = useState<IOSButtonShapeTypes>(IOSButtonShapeTypes.CAPSULE);
    const [selectedWebShape, setSelectedWebShape] = useState<BootstrapButtonShapeTypes>(BootstrapButtonShapeTypes.STANDARD);

    const [selectedAndroidStyle, setSelectedAndroidStyle] = useState<AndroidButtonStyleTypes>(AndroidButtonStyleTypes.TONAL);
    const [selectedIOSStyle, setSelectedIOSStyle] = useState<IOSButtonStyleTypes>(IOSButtonStyleTypes.TINTED);
    const [selectedWebStyle, setSelectedWebStyle] = useState<BootstrapButtonStyleTypes>(BootstrapButtonStyleTypes.FILLED);

    return (
        <Fragment>
            <h2>Buttons (Custom Cross-Platform Test)</h2>

            <div className="card p-3 mb-4 bg-light">
                <div className="row g-3">
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Platform:</label>
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

                    <div className="col-md-4">
                        <label className="form-label fw-bold">Shape:</label>

                        {selectedPlatform === PlatformTypes.ANDROID && (
                            <select
                                className="form-select"
                                value={selectedAndroidShape}
                                onChange={(e) => setSelectedAndroidShape(e.target.value as AndroidButtonShapeTypes)}
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
                                onChange={(e) => setSelectedIOSShape(e.target.value as IOSButtonShapeTypes)}
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
                                onChange={(e) => setSelectedWebShape(e.target.value as BootstrapButtonShapeTypes)}
                            >
                                {shapesByPlatform[PlatformTypes.WEB].map((s) => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="col-md-4">
                        <label className="form-label fw-bold">StyleType:</label>
                        {selectedPlatform === PlatformTypes.ANDROID && (
                            <select
                                className="form-select"
                                value={selectedAndroidStyle}
                                onChange={(e) => setSelectedAndroidStyle(e.target.value as AndroidButtonStyleTypes)}
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
                                onChange={(e) => setSelectedIOSStyle(e.target.value as IOSButtonStyleTypes)}
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
                                onChange={(e) => setSelectedWebStyle(e.target.value as BootstrapButtonStyleTypes)}
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