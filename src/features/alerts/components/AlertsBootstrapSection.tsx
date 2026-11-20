import { type FC, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { BootstrapAlertStyleTypes } from "../../../types/Web/BootstrapAlertStyleTypes.tsx";
import { BootstrapAlertShapeTypes } from "../../../types/Web/BootstrapAlertShapeTypes.tsx";
import { PlatformTypes } from "../../../types/PlatformTypes.tsx";
import { ButtonTypes } from "../../../types/ButtonTypes.tsx";
import { BootstrapButtonShapeTypes } from "../../../types/Web/BootstrapButtonShapeTypes.tsx";
import { BootstrapButtonStyleTypes } from "../../../types/Web/BootstrapButtonStyleTypes.tsx";
import LionAlert from "../../../components/alerts/LionAlert.tsx";
import LionButton from "../../../components/buttons/LionButton.tsx";

const getEnumKey = (enumObject: Record<string, any>, value: any): string => {
    return Object.keys(enumObject).find((key) => enumObject[key] === value) || value;
};

export const AlertsBootstrapSection: FC = () => {
    const [variant, setVariant] = useState<string>(VariantTypes.PRIMARY);
    const [styleType, setStyleType] = useState<string>(BootstrapAlertStyleTypes.SOFT);
    const [shape, setShape] = useState<string>(BootstrapAlertShapeTypes.ROUNDED);
    const [showIcon, setShowIcon] = useState<boolean>(true);
    const [dismissible, setDismissible] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("Bootstrap Alert Notice");
    const [message, setMessage] = useState<string>(
        "This alert reuses react-bootstrap and supports Lion styles, shapes, and custom variants."
    );
    const [copied, setCopied] = useState<boolean>(false);

    const handleReset = () => {
        setVisible(true);
    };

    const variantEnumName = getEnumKey(VariantTypes, variant);
    const styleEnumName = getEnumKey(BootstrapAlertStyleTypes, styleType);
    const shapeEnumName = getEnumKey(BootstrapAlertShapeTypes, shape);

    const previewCode = `import {
    LionAlert,
    PlatformTypes,
    VariantTypes,
    BootstrapAlertStyleTypes,
    BootstrapAlertShapeTypes
} from "@lion-npm/ui";

<LionAlert
    platform={PlatformTypes.WEB}
    variant={VariantTypes.${variantEnumName}}
    styleType={BootstrapAlertStyleTypes.${styleEnumName}}
    shape={BootstrapAlertShapeTypes.${shapeEnumName}}${title ? `\n    title="${title.replace(/"/g, '\\"')}"` : ""}${message ? `\n    message="${message.replace(/"/g, '\\"')}"` : ""}
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
                    <h2>Alerts (Bootstrap)</h2>

                    <p className="text-muted">
                        Built with <code>react-bootstrap</code> using <code>BootstrapAlertStyleTypes</code> and{" "}
                        <code>BootstrapAlertShapeTypes</code>.
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
                                {Object.entries(BootstrapAlertStyleTypes).map(([key, val]) => (
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
                                {Object.entries(BootstrapAlertShapeTypes).map(([key, val]) => (
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
                                    id="bs-alert-show-icon"
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={showIcon}
                                    onChange={(e) => setShowIcon(e.target.checked)}
                                />
                                <label htmlFor="bs-alert-show-icon" className="form-check-label small">
                                    Show Icon
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    id="bs-alert-dismissible"
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={dismissible}
                                    onChange={(e) => setDismissible(e.target.checked)}
                                />
                                <label htmlFor="bs-alert-dismissible" className="form-check-label small">
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
                                platform={PlatformTypes.WEB}
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
                            <div className="text-center">
                                <p className={"text-muted small"}>
                                    Alert dismissed. Click <strong>Restore Alert</strong> to show it again.
                                </p>

                                {!visible && (
                                    <LionButton
                                        platform={PlatformTypes.WEB}
                                        variant={variant}
                                        type={ButtonTypes.BUTTON}
                                        onClick={handleReset}
                                        shape={BootstrapButtonShapeTypes.STANDARD}
                                        styleType={BootstrapButtonStyleTypes.FILLED}
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

export default AlertsBootstrapSection;