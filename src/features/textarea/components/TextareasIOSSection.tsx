import { Fragment, type SyntheticEvent, useState } from "react";
import { Form } from "react-bootstrap";
import VariantList from "../../VariantList.tsx";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { SizeTypes } from "../../../types/SizeTypes.tsx";
import { IOSInputStyleTypes } from "../../../types/IOS/IOSInputStyleTypes.tsx";
import { IOSInputShapeTypes } from "../../../types/IOS/IOSInputShapeTypes.tsx";
import { PlatformTypes } from "../../../types/PlatformTypes.tsx";
import { ButtonTypes } from "../../../types/ButtonTypes.tsx";
import { IOSButtonShapeTypes } from "../../../types/IOS/IOSButtonShapeTypes.tsx";
import { IOSButtonStyleTypes } from "../../../types/IOS/IOSButtonStyleTypes.tsx";
import { useLionUI } from "../../../context/LionUIComponentsContext.tsx";
import LionTextarea from "../../../components/textarea/LionTextarea.tsx";
import LionButton from "../../../components/buttons/LionButton.tsx";

const stylesList = Object.values(IOSInputStyleTypes);
const shapesList = Object.values(IOSInputShapeTypes);

export default function TextareasIOSSection() {
    const { setFormErrors } = useLionUI();

    const [selectedVariant, setSelectedVariant] = useState<VariantTypes>(VariantTypes.PRIMARY);
    const [selectedStyle, setSelectedStyle] = useState<IOSInputStyleTypes>(IOSInputStyleTypes.ROUNDED_BORDER);
    const [selectedShape, setSelectedShape] = useState<IOSInputShapeTypes>(IOSInputShapeTypes.ROUNDED);
    const [rows, setRows] = useState<number>(4);
    const [playDisabled, setPlayDisabled] = useState<boolean>(false);
    const [playReadOnly, setPlayReadOnly] = useState<boolean>(false);
    const [playRequired, setPlayRequired] = useState<boolean>(false);
    const [playRequiredMessage, setPlayRequiredMessage] = useState<string>("This field is required.");
    const [playError, setPlayError] = useState<string>("");
    const [playValue, setPlayValue] = useState<string>("Lion framework iOS Cupertino textarea content assessment.");

    const handleSimulateServerErrors = () => {
        setFormErrors("ios-textarea-form", {
            comments: [
                "The comments section contains restricted Cupertino guideline terms.",
                "Comments length must be greater than 10 characters.",
            ],
        });
    };

    const getVariantEnumKey = (val: string) => {
        const entry = Object.entries(VariantTypes).find(([_, v]) => v === val);
        return entry ? entry[0] : "PRIMARY";
    };

    const getStyleEnumKey = (val: string) => {
        const entry = Object.entries(IOSInputStyleTypes).find(([_, v]) => v === val);
        return entry ? entry[0] : "ROUNDED_BORDER";
    };

    const getShapeEnumKey = (val: string) => {
        const entry = Object.entries(IOSInputShapeTypes).find(([_, v]) => v === val);
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
    IOSInputStyleTypes, 
    IOSInputShapeTypes, 
    useLionUI 
} from "@lion-npm/ui";

export default function IOSTextareaForm() {
    const [comments, setComments] = useState("${playValue}");
    const { setFormErrors } = useLionUI();

    const handleSimulateServerErrors = () => {
        setFormErrors("ios-textarea-form", {
            comments: [
                "The comments section contains restricted Cupertino guideline terms.",
                "Comments length must be greater than 10 characters.",
            ],
        });
    };

    return (
        <LionTextarea
            platform={PlatformTypes.IOS}
            formId="ios-textarea-form"
            name="comments"
            variant={VariantTypes.${variantKey}}
            styleType={IOSInputStyleTypes.${styleKey}}
            shape={IOSInputShapeTypes.${shapeKey}}
            sizeType={SizeTypes.MD}
            label="iOS Comments"
            placeholder="Write comments..."
            rows={${rows}}
            counter={true}
            maxCounter={200}${playRequired ? "\n            required={true}" : ""}${playRequired && playRequiredMessage ? `\n            requiredMessage="${playRequiredMessage}"` : ""}${playDisabled ? "\n            disabled={true}" : ""}${playReadOnly ? "\n            readOnly={true}" : ""}${playError ? `\n            error="${playError}"` : ""}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
        />
    );
}`;

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitted!!!");
    };

    return (
        <Fragment>
            <h2>Textareas (iOS Cupertino)</h2>
            <p className="text-muted">iOS specific Cupertino style textarea component playground.</p>

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
                            <label className="form-label fw-bold small">iOS Style Type</label>
                            <select
                                className="form-select"
                                value={selectedStyle}
                                onChange={(e) => setSelectedStyle(e.target.value as IOSInputStyleTypes)}
                            >
                                {stylesList.map((style) => (
                                    <option key={style} value={style}>{style}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label fw-bold small">iOS Shape</label>
                            <select
                                className="form-select"
                                value={selectedShape}
                                onChange={(e) => setSelectedShape(e.target.value as IOSInputShapeTypes)}
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

                        <div className="col-md-6">
                            <label className="form-label fw-bold small">Custom Error Prop</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter custom error message..."
                                value={playError}
                                onChange={(e) => setPlayError(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold small">Required Message</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="This field is required."
                                value={playRequiredMessage}
                                onChange={(e) => setPlayRequiredMessage(e.target.value)}
                                disabled={!playRequired}
                            />
                        </div>

                        <div className="col-12 d-flex align-items-center gap-4">
                            <Form.Check
                                type="checkbox"
                                id="play-ios-textarea-disabled-check"
                                label="Disabled State"
                                checked={playDisabled}
                                onChange={(e) => setPlayDisabled(e.target.checked)}
                            />
                            <Form.Check
                                type="checkbox"
                                id="play-ios-textarea-readonly-check"
                                label="Readonly State"
                                checked={playReadOnly}
                                onChange={(e) => setPlayReadOnly(e.target.checked)}
                            />
                            <Form.Check
                                type="checkbox"
                                id="play-ios-textarea-required-check"
                                label="Required State"
                                checked={playRequired}
                                onChange={(e) => setPlayRequired(e.target.checked)}
                            />
                        </div>
                    </div>

                    <div className="row g-4 align-items-start">
                        <div className="col-lg-5">
                            <div className="p-4 border rounded bg-white h-100">
                                <span className="d-block text-muted small mb-3 fw-bold">LIVE COMPONENT PREVIEW</span>

                                <Form id="ios-textarea-form" onSubmit={handleSubmit}>
                                    <LionTextarea
                                        platform={PlatformTypes.IOS}
                                        formId="ios-textarea-form"
                                        name="comments"
                                        variant={selectedVariant}
                                        styleType={selectedStyle}
                                        shape={selectedShape}
                                        sizeType={SizeTypes.MD}
                                        label="iOS Comments"
                                        placeholder="Write comments..."
                                        rows={rows}
                                        counter={true}
                                        maxCounter={200}
                                        required={playRequired}
                                        requiredMessage={playRequiredMessage}
                                        disabled={playDisabled}
                                        readOnly={playReadOnly}
                                        error={playError}
                                        value={playValue}
                                        onChange={(e) => setPlayValue(e.target.value)}
                                        helperText="Cupertino native style helper text."
                                        className="mb-3"
                                    />

                                    <LionTextarea
                                        platform={PlatformTypes.IOS}
                                        formId="ios-textarea-form"
                                        name="comments_2"
                                        variant={selectedVariant}
                                        styleType={selectedStyle}
                                        shape={selectedShape}
                                        sizeType={SizeTypes.MD}
                                        label="iOS Comments 2"
                                        placeholder="Write comments 2..."
                                        rows={rows}
                                        counter={true}
                                        maxCounter={200}
                                        required={playRequired}
                                        requiredMessage={playRequiredMessage}
                                        disabled={playDisabled}
                                        readOnly={playReadOnly}
                                        error={playError}
                                        value={playValue}
                                        onChange={(e) => setPlayValue(e.target.value)}
                                        helperText="Cupertino native style helper text."
                                    />

                                    {playRequired && (
                                        <LionButton
                                            platform={PlatformTypes.IOS}
                                            type={ButtonTypes.SUBMIT}
                                            variant={selectedVariant}
                                            className="mt-3 w-100"
                                            shape={IOSButtonShapeTypes.ROUNDED}
                                            styleType={IOSButtonStyleTypes.TINTED}
                                        >
                                            Submit
                                        </LionButton>
                                    )}
                                </Form>
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