import { Fragment, useState } from "react";
import VariantList from "../../VariantList.tsx";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { SizeTypes } from "../../../types/SizeTypes.tsx";
import { BootstrapInputStyleTypes } from "../../../types/Web/BootstrapInputStyleTypes.tsx";
import { BootstrapInputShapeTypes } from "../../../types/Web/BootstrapInputShapeTypes.tsx";
import { PlatformTypes } from "../../../types/PlatformTypes.tsx";
import { useLionUI } from "../../../context/LionUIComponentsContext.tsx";
import LionTextarea from "../../../components/textarea/LionTextarea.tsx";

const stylesList = Object.values(BootstrapInputStyleTypes);
const shapesList = Object.values(BootstrapInputShapeTypes);

export default function TextareasBootstrapSection() {
    const { setFormErrors } = useLionUI();

    const [selectedVariant, setSelectedVariant] = useState<VariantTypes>(VariantTypes.PRIMARY);
    const [selectedStyle, setSelectedStyle] = useState<BootstrapInputStyleTypes>(BootstrapInputStyleTypes.FLOATING);
    const [selectedShape, setSelectedShape] = useState<BootstrapInputShapeTypes>(BootstrapInputShapeTypes.ROUNDED);
    const [rows, setRows] = useState<number>(4);
    const [playError, setPlayError] = useState<string>("");
    const [playValue, setPlayValue] = useState<string>("Lion framework Web Bootstrap textarea content assessment.");

    const handleSimulateServerErrors = () => {
        setFormErrors("web-textarea-form", {
            comments: [
                "The comments section contains restricted Bootstrap validation rules.",
                "Comments length must be greater than 10 characters.",
            ],
        });
    };

    const getVariantEnumKey = (val: string) => {
        const entry = Object.entries(VariantTypes).find(([_, v]) => v === val);
        return entry ? entry[0] : "PRIMARY";
    };

    const getStyleEnumKey = (val: string) => {
        const entry = Object.entries(BootstrapInputStyleTypes).find(([_, v]) => v === val);
        return entry ? entry[0] : "FLOATING";
    };

    const getShapeEnumKey = (val: string) => {
        const entry = Object.entries(BootstrapInputShapeTypes).find(([_, v]) => v === val);
        return entry ? entry[0] : "ROUNDED";
    };

    const variantKey = getVariantEnumKey(selectedVariant);
    const styleKey = getStyleEnumKey(selectedStyle);
    const shapeKey = getShapeEnumKey(selectedShape);

    const dynamicCodeExample = `import { useState } from "react";
import { 
    LionTextarea, 
    PlatformTypes, 
    VariantTypes, 
    SizeTypes, 
    BootstrapInputStyleTypes, 
    BootstrapInputShapeTypes, 
    useLionUI 
} from "@lion-npm/ui";

export default function WebTextareaForm() {
    const [comments, setComments] = useState("${playValue}");
    const { setFormErrors } = useLionUI();

    const handleSimulateServerErrors = () => {
        setFormErrors("web-textarea-form", {
            comments: [
                "The comments section contains restricted Bootstrap validation rules.",
                "Comments length must be greater than 10 characters.",
            ],
        });
    };

    return (
        <LionTextarea
            platform={PlatformTypes.WEB}
            formId="web-textarea-form"
            name="comments"
            variant={VariantTypes.${variantKey}}
            styleType={BootstrapInputStyleTypes.${styleKey}}
            shape={BootstrapInputShapeTypes.${shapeKey}}
            sizeType={SizeTypes.MD}
            label="Web Comments"
            placeholder="Write comments..."
            rows={${rows}}
            counter={true}
            maxCounter={200}${playError ? `\n            error="${playError}"` : ""}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
        />
    );
}`;

    return (
        <Fragment>
            <h2>Textareas (Web / Bootstrap)</h2>
            <p className="text-muted">Web environment textarea component playground powered by Bootstrap styles.</p>

            <div className="card mb-4 shadow-sm">
                <div className="card-header bg-light d-flex justify-content-between align-items-center py-3">
                    <h5 className="mb-0 text-secondary">Interactive Playground & Code Documentation</h5>
                    <button className="btn btn-outline-danger btn-sm" onClick={handleSimulateServerErrors}>
                        Simulate Server Response Errors
                    </button>
                </div>
                <div className="card-body">
                    <div className="row g-3 mb-4">
                        <div className="col-md-3">
                            <label className="form-label fw-bold small">Variant Style</label>
                            <select
                                className="form-select"
                                value={selectedVariant}
                                onChange={(e) => setSelectedVariant(e.target.value as VariantTypes)}
                            >
                                {VariantList.map((variant) => (
                                    <option key={variant} value={variant}>{variant}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label fw-bold small">Web Style Type</label>
                            <select
                                className="form-select"
                                value={selectedStyle}
                                onChange={(e) => setSelectedStyle(e.target.value as BootstrapInputStyleTypes)}
                            >
                                {stylesList.map((style) => (
                                    <option key={style} value={style}>{style}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label fw-bold small">Web Shape</label>
                            <select
                                className="form-select"
                                value={selectedShape}
                                onChange={(e) => setSelectedShape(e.target.value as BootstrapInputShapeTypes)}
                            >
                                {shapesList.map((shape) => (
                                    <option key={shape} value={shape}>{shape}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label fw-bold small">Rows</label>
                            <input
                                type="number"
                                className="form-control"
                                min={2}
                                max={8}
                                value={rows}
                                onChange={(e) => setRows(Number(e.target.value))}
                            />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label fw-bold small">Custom Error Prop</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter custom error message..."
                                value={playError}
                                onChange={(e) => setPlayError(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row g-4 align-items-start">
                        <div className="col-lg-5">
                            <div className="p-4 border rounded bg-white h-100">
                                <span className="d-block text-muted small mb-3 fw-bold">LIVE COMPONENT PREVIEW</span>
                                <LionTextarea
                                    platform={PlatformTypes.WEB}
                                    formId="web-textarea-form"
                                    name="comments"
                                    variant={selectedVariant}
                                    styleType={selectedStyle}
                                    shape={selectedShape}
                                    sizeType={SizeTypes.MD}
                                    label="Web Comments"
                                    placeholder="Write comments..."
                                    rows={rows}
                                    counter={true}
                                    maxCounter={200}
                                    error={playError}
                                    value={playValue}
                                    onChange={(e) => setPlayValue(e.target.value)}
                                    helperText="Bootstrap standard form helper text."
                                />
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="p-3 bg-dark text-light rounded position-relative">
                                <pre className="mb-0 text-light bg-transparent p-0" style={{ fontSize: "0.825rem", overflowX: "auto" }}>
                                    <code>{dynamicCodeExample}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}