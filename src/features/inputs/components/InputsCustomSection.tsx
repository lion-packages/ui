import { Fragment, useState } from "react";
import VariantList from "../../VariantList.tsx";
import { PlatformTypes } from "../../../types/PlatformTypes.tsx";
import { InputTypes } from "../../../types/InputTypes.tsx";
import { AndroidInputStyleTypes } from "../../../types/Android/AndroidInputStyleTypes.tsx";
import { IOSInputStyleTypes } from "../../../types/IOS/IOSInputStyleTypes.tsx";
import { BootstrapInputStyleTypes } from "../../../types/Web/BootstrapInputStyleTypes.tsx";
import { AndroidInputShapeTypes } from "../../../types/Android/AndroidInputShapeTypes.tsx";
import { BootstrapInputShapeTypes } from "../../../types/Web/BootstrapInputShapeTypes.tsx";
import { IOSInputShapeTypes } from "../../../types/IOS/IOSInputShapeTypes.tsx";
import LionInput from "../../../components/inputs/LionInput.tsx";

const shapesByPlatform = {
    [PlatformTypes.ANDROID]: [
        { label: "Small", value: AndroidInputShapeTypes.SMALL },
        { label: "Normal", value: AndroidInputShapeTypes.NORMAL },
    ],
    [PlatformTypes.IOS]: [
        { label: "Rounded", value: IOSInputShapeTypes.ROUNDED },
        { label: "Pill", value: IOSInputShapeTypes.PILL },
        { label: "Square", value: IOSInputShapeTypes.SQUARE },
    ],
    [PlatformTypes.WEB]: [
        { label: "Rounded", value: BootstrapInputShapeTypes.ROUNDED },
        { label: "Pill", value: BootstrapInputShapeTypes.PILL },
        { label: "Square", value: BootstrapInputShapeTypes.SQUARE },
    ],
};

const stylesByPlatform = {
    [PlatformTypes.ANDROID]: [
        { label: "Outlined", value: AndroidInputStyleTypes.OUTLINED },
        { label: "Filled", value: AndroidInputStyleTypes.FILLED },
    ],
    [PlatformTypes.IOS]: [
        { label: "Form", value: IOSInputStyleTypes.FORM },
        { label: "Rounded Border", value: IOSInputStyleTypes.ROUNDED_BORDER },
        { label: "Filled", value: IOSInputStyleTypes.FILLED },
        { label: "Outlined", value: IOSInputStyleTypes.OUTLINED },
        { label: "Plain", value: IOSInputStyleTypes.PLAIN },
    ],
    [PlatformTypes.WEB]: [
        { label: "Floating", value: BootstrapInputStyleTypes.FLOATING },
        { label: "Standard", value: BootstrapInputStyleTypes.STANDARD },
    ],
};

export default function InputsCustomSection() {
    const [selectedPlatform, setSelectedPlatform] = useState<PlatformTypes>(PlatformTypes.ANDROID);
    const [selectedAndroidShape, setSelectedAndroidShape] = useState<AndroidInputShapeTypes>(AndroidInputShapeTypes.NORMAL);
    const [selectedIOSShape, setSelectedIOSShape] = useState<IOSInputShapeTypes>(IOSInputShapeTypes.ROUNDED);
    const [selectedWebShape, setSelectedWebShape] = useState<BootstrapInputShapeTypes>(BootstrapInputShapeTypes.ROUNDED);

    const [selectedAndroidStyle, setSelectedAndroidStyle] = useState<AndroidInputStyleTypes>(AndroidInputStyleTypes.OUTLINED);
    const [selectedIOSStyle, setSelectedIOSStyle] = useState<IOSInputStyleTypes>(IOSInputStyleTypes.ROUNDED_BORDER);
    const [selectedWebStyle, setSelectedWebStyle] = useState<BootstrapInputStyleTypes>(BootstrapInputStyleTypes.FLOATING);

    return (
        <Fragment>
            <h2>Inputs (Custom Cross-Platform Test)</h2>

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
                                onChange={(e) => setSelectedAndroidShape(e.target.value as AndroidInputShapeTypes)}
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
                                onChange={(e) => setSelectedIOSShape(e.target.value as IOSInputShapeTypes)}
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
                                onChange={(e) => setSelectedWebShape(e.target.value as BootstrapInputShapeTypes)}
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
                                onChange={(e) => setSelectedAndroidStyle(e.target.value as AndroidInputStyleTypes)}
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
                                onChange={(e) => setSelectedIOSStyle(e.target.value as IOSInputStyleTypes)}
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
                                onChange={(e) => setSelectedWebStyle(e.target.value as BootstrapInputStyleTypes)}
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
                    <div className="mb-4">
                        <span className="text-muted d-block mb-2 small fw-bold">Enabled</span>
                        <div className="row g-3">
                            {VariantList.map((variant) => (
                                <div key={`custom-input-${variant}-enabled`} className="col-md-4">
                                    <LionInput
                                        type={InputTypes.TEXT}
                                        platform={selectedPlatform}
                                        variant={variant}
                                        label={`${variant} input`}
                                        placeholder="Enter text..."
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
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Disabled State */}
                    <div>
                        <span className="text-muted d-block mb-2 small fw-bold">Disabled</span>
                        <div className="row g-3">
                            {VariantList.map((variant) => (
                                <div key={`custom-input-${variant}-disabled`} className="col-md-4">
                                    <LionInput
                                        type={InputTypes.TEXT}
                                        platform={selectedPlatform}
                                        variant={variant}
                                        label={`${variant} input`}
                                        placeholder="Disabled..."
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
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}