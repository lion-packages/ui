import { Fragment, useState } from "react";
import { Row, Col, Button, Form, Card } from "react-bootstrap";
import VariantList from "../../VariantList.tsx";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { AndroidInputStyleTypes } from "../../../types/Android/AndroidInputStyleTypes.tsx";
import { AndroidInputShapeTypes } from "../../../types/Android/AndroidInputShapeTypes.tsx";
import { InputTypes } from "../../../types/InputTypes.tsx";
import AndroidInput from "../../../components/inputs/AndroidInput.tsx";
import { useLionUI } from "../../../context/LionUIComponentsContext.tsx";

const stylesList = [
    { type: AndroidInputStyleTypes.OUTLINED, name: "Outlined" },
    { type: AndroidInputStyleTypes.FILLED, name: "Filled" },
];

const shapesList = [
    { type: AndroidInputShapeTypes.NORMAL, name: "Normal" },
    { type: AndroidInputShapeTypes.SMALL, name: "Small" },
];

export default function InputsAndroidSection() {
    const { setFormErrors } = useLionUI();

    const [playVariant, setPlayVariant] = useState<VariantTypes | string>(VariantTypes.PRIMARY);
    const [playStyle, setPlayStyle] = useState<AndroidInputStyleTypes>(AndroidInputStyleTypes.OUTLINED);
    const [playShape, setPlayShape] = useState<AndroidInputShapeTypes>(AndroidInputShapeTypes.NORMAL);
    const [playDisabled, setPlayDisabled] = useState<boolean>(false);
    const [playReadOnly, setPlayReadOnly] = useState<boolean>(false);
    const [playError, setPlayError] = useState<string>("");
    const [playValue, setPlayValue] = useState<string>("lion.android");

    const handleSimulateServerErrors = () => {
        setFormErrors("android-input-form", {
            username: [
                "The username is restricted on Android Material Design 3.",
                "Username length must be greater than 6 characters.",
            ],
        });
    };

    const getEnumKey = (enumObject: Record<string, any>, value: any): string => {
        return Object.keys(enumObject).find((key) => enumObject[key] === value) || value;
    };

    const variantEnumName = getEnumKey(VariantTypes, playVariant);
    const styleEnumName = getEnumKey(AndroidInputStyleTypes, playStyle);
    const shapeEnumName = getEnumKey(AndroidInputShapeTypes, playShape);

    // Code snippet for documentation pointing to the external @lion-npm/ui package
    const generatedCodeSnippet = `import { useState } from "react";
import { 
    AndroidInput, 
    VariantTypes, 
    AndroidInputStyleTypes, 
    AndroidInputShapeTypes, 
    InputTypes, 
    useLionUI 
} from "@lion-npm/ui";

export default function AndroidUserInputForm() {
    const [username, setUsername] = useState("${playValue}");
    const { setFormErrors } = useLionUI();

    const handleSimulateServerErrors = () => {
        setFormErrors("android-input-form", {
            username: [
                "The username is restricted on Android Material Design 3.",
                "Username length must be greater than 6 characters.",
            ],
        });
    };

    return (
        <AndroidInput
            formId="android-input-form"
            name="username"
            type={InputTypes.TEXT}
            variant={VariantTypes.${variantEnumName}}
            styleType={AndroidInputStyleTypes.${styleEnumName}}
            shape={AndroidInputShapeTypes.${shapeEnumName}}
            label="Username"
            placeholder="Enter username..."
            counter={true}${playDisabled ? "\n            disabled={true}" : ""}${playReadOnly ? "\n            readOnly={true}" : ""}${playError ? `\n            error="${playError}"` : ""}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
    );
}`;

    return (
        <Fragment>
            <h2>Inputs (Android MD3)</h2>
            <p className="text-muted">
                Interactive playground and live documentation for Android Material Design 3 inputs. Test variants, styles, shapes, states, and global context validation handling.
            </p>

            <Card className="mb-4 shadow-sm">
                <Card.Header className="bg-light d-flex justify-content-between align-items-center py-3">
                    <h5 className="mb-0 text-secondary">Interactive Playground & Code Documentation</h5>
                    <Button variant="outline-danger" size="sm" onClick={handleSimulateServerErrors}>
                        Simulate Server Response Errors
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Row className="g-3 mb-4">
                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Variant</Form.Label>
                                <Form.Select value={playVariant} onChange={(e) => setPlayVariant(e.target.value)}>
                                    {VariantList.map((v) => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Style</Form.Label>
                                <Form.Select value={playStyle} onChange={(e) => setPlayStyle(e.target.value as AndroidInputStyleTypes)}>
                                    {stylesList.map((s) => (
                                        <option key={s.type} value={s.type}>{s.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Shape</Form.Label>
                                <Form.Select value={playShape} onChange={(e) => setPlayShape(e.target.value as AndroidInputShapeTypes)}>
                                    {shapesList.map((sh) => (
                                        <option key={sh.type} value={sh.type}>{sh.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Custom Error Prop</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter error message..."
                                    value={playError}
                                    onChange={(e) => setPlayError(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} className="d-flex align-items-center gap-4">
                            <Form.Check
                                type="checkbox"
                                id="play-android-disabled"
                                label="Disabled State"
                                checked={playDisabled}
                                onChange={(e) => setPlayDisabled(e.target.checked)}
                            />
                            <Form.Check
                                type="checkbox"
                                id="play-android-readonly"
                                label="Readonly State"
                                checked={playReadOnly}
                                onChange={(e) => setPlayReadOnly(e.target.checked)}
                            />
                        </Col>
                    </Row>

                    <Row className="g-4 align-items-start">
                        <Col xs={12} lg={5}>
                            <div className="p-4 border rounded bg-white h-100">
                                <span className="d-block text-muted small mb-3 fw-bold">LIVE COMPONENT PREVIEW</span>
                                <AndroidInput
                                    formId="android-input-form"
                                    name="username"
                                    type={InputTypes.TEXT}
                                    variant={playVariant}
                                    styleType={playStyle}
                                    shape={playShape}
                                    label="Username"
                                    placeholder="Enter username..."
                                    counter={true}
                                    disabled={playDisabled}
                                    readOnly={playReadOnly}
                                    error={playError}
                                    value={playValue}
                                    onChange={(e) => setPlayValue(e.target.value)}
                                    helperText="Interactive Android input field testing."
                                />
                            </div>
                        </Col>

                        <Col xs={12} lg={7}>
                            <div className="p-3 bg-dark text-light rounded position-relative">
                                <span className="d-block text-muted small mb-2 fw-bold">GENERATED CODE SNIPPET (COPY & PASTE READY)</span>
                                <pre className="mb-0 text-light bg-transparent p-0" style={{ fontSize: "0.825rem", overflowX: "auto" }}>
                                    <code>{generatedCodeSnippet}</code>
                                </pre>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Fragment>
    );
}