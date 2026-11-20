import { type FC, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { AndroidAlertStyleTypes } from "../../../types/Android/AndroidAlertStyleTypes.tsx";
import { AndroidAlertShapeTypes } from "../../../types/Android/AndroidAlertShapeTypes.tsx";
import { PlatformTypes } from "../../../types/PlatformTypes.tsx";
import { ButtonTypes } from "../../../types/ButtonTypes.tsx";
import { AndroidButtonShapeTypes } from "../../../types/Android/AndroidButtonShapeTypes.tsx";
import { AndroidButtonStyleTypes } from "../../../types/Android/AndroidButtonStyleTypes.tsx";
import LionAlert from "../../../components/alerts/LionAlert.tsx";
import LionButton from "../../../components/buttons/LionButton.tsx";

const getEnumKey = (enumObject: Record<string, any>, value: any): string => {
    return Object.keys(enumObject).find((key) => enumObject[key] === value) || value;
};

export const AlertsAndroidSection: FC = () => {
    const [variant, setVariant] = useState<string>(VariantTypes.SUCCESS);
    const [styleType, setStyleType] = useState<string>(AndroidAlertStyleTypes.TONAL);
    const [shape, setShape] = useState<string>(AndroidAlertShapeTypes.ROUNDED);
    const [showIcon, setShowIcon] = useState<boolean>(true);
    const [dismissible, setDismissible] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("Material Design 3 Alert");
    const [message, setMessage] = useState<string>(
        "Designed from scratch for Android with tonal, filled, and outlined surfaces."
    );
    const [copied, setCopied] = useState<boolean>(false);

    const handleReset = () => {
        setVisible(true);
    };

    const variantEnumName = getEnumKey(VariantTypes, variant);
    const styleEnumName = getEnumKey(AndroidAlertStyleTypes, styleType);
    const shapeEnumName = getEnumKey(AndroidAlertShapeTypes, shape);

    const previewCode = `import {
    LionAlert,
    PlatformTypes,
    VariantTypes,
    AndroidAlertStyleTypes,
    AndroidAlertShapeTypes
} from "@lion-npm/ui";

<LionAlert
    platform={PlatformTypes.ANDROID}
    variant={VariantTypes.${variantEnumName}}
    styleType={AndroidAlertStyleTypes.${styleEnumName}}
    shape={AndroidAlertShapeTypes.${shapeEnumName}}${title ? `\n    title="${title.replace(/"/g, '\\"')}"` : ""}${message ? `\n    message="${message.replace(/"/g, '\\"')}"` : ""}
    showIcon={${showIcon}}
    dismissible={${dismissible}}
    show={${visible}}
    onClose={() => console.log("Alert closed")}
/>`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(previewCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            setCopied(false);
        }
    };

    return (
        <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h2>Alerts (Android MD3)</h2>

                    <p className="text-muted">
                        Custom Android implementation using <code>AndroidAlertStyleTypes</code> and{" "}
                        <code>AndroidAlertShapeTypes</code>.
                    </p>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label small fw-semibold">Variant</label>
                            <select
                                className="form-select form-select-sm"
                                value={variant}
                                onChange={(e) => setVariant(e.target.value)}
                            >
                                {Object.entries(VariantTypes).map(([key, val]) => (
                                    <option key={key} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label small fw-semibold">Style</label>
                            <select
                                className="form-select form-select-sm"
                                value={styleType}
                                onChange={(e) => setStyleType(e.target.value)}
                            >
                                {Object.entries(AndroidAlertStyleTypes).map(([key, val]) => (
                                    <option key={key} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4">
                            <label className="form-label small fw-semibold">Shape</label>
                            <select
                                className="form-select form-select-sm"
                                value={shape}
                                onChange={(e) => setShape(e.target.value)}
                            >
                                {Object.entries(AndroidAlertShapeTypes).map(([key, val]) => (
                                    <option key={key} value={val}>
                                        {val}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label small fw-semibold">Title</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label small fw-semibold">Message</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <div className="col-12 d-flex gap-4 pt-1">
                            <div className="form-check">
                                <input
                                    id="android-alert-show-icon"
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={showIcon}
                                    onChange={(e) => setShowIcon(e.target.checked)}
                                />
                                <label htmlFor="android-alert-show-icon" className="form-check-label small">
                                    Show Icon
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    id="android-alert-dismissible"
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={dismissible}
                                    onChange={(e) => setDismissible(e.target.checked)}
                                />
                                <label htmlFor="android-alert-dismissible" className="form-check-label small">
                                    Dismissible
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Row>
                <Col xs={12} lg={5}>
                    <div className="p-4 border rounded mb-3">
                        {visible ? (
                            <LionAlert
                                platform={PlatformTypes.ANDROID}
                                variant={variant}
                                styleType={styleType}
                                shape={shape}
                                title={title || undefined}
                                message={message || undefined}
                                showIcon={showIcon}
                                dismissible={dismissible}
                                show={visible}
                                onClose={() => setVisible(false)}
                            />
                        ) : (
                            <div className={"text-center"}>
                                <p className="text-muted small">
                                    Alert dismissed. Click <strong>Restore Alert</strong> to show it again.
                                </p>

                                {!visible && (
                                    <LionButton
                                        platform={PlatformTypes.ANDROID}
                                        variant={variant}
                                        type={ButtonTypes.BUTTON}
                                        onClick={handleReset}
                                        shape={AndroidButtonShapeTypes.ROUNDED}
                                        styleType={AndroidButtonStyleTypes.TONAL}
                                    >
                                        {"Restore Alert"}
                                    </LionButton>
                                )}
                            </div>
                        )}
                    </div>
                </Col>

                <Col xs={12} lg={7}>
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center py-2">
                            <span className="small fw-semibold text-muted">Code Preview</span>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={handleCopy}
                            >
                                {copied ? "Copied!" : "Copy Code"}
                            </button>
                        </div>
                        <pre className="m-0 p-3 bg-dark text-light rounded-bottom small overflow-auto">
                    <code>{previewCode}</code>
                </pre>
                    </div>
                </Col>
            </Row>
        </section>
    );
};

export default AlertsAndroidSection;