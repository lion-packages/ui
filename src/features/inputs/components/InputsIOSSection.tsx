import { Fragment, useState } from "react";
import { Row, Col, Button, Form, Card } from "react-bootstrap";
import VariantList from "../../VariantList.tsx";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { IOSInputStyleTypes } from "../../../types/IOS/IOSInputStyleTypes.tsx";
import { IOSInputShapeTypes } from "../../../types/IOS/IOSInputShapeTypes.tsx";
import { InputTypes } from "../../../types/InputTypes.tsx";
import { PlatformTypes } from "../../../types/PlatformTypes.tsx";
import { useLionUI } from "../../../context/LionUIComponentsContext.tsx";
import LionInput from "../../../components/inputs/LionInput.tsx";

const stylesList = [
    { type: IOSInputStyleTypes.ROUNDED_BORDER, name: "Rounded Border" },
    { type: IOSInputStyleTypes.FILLED, name: "Filled" },
    { type: IOSInputStyleTypes.FORM, name: "Form" },
    { type: IOSInputStyleTypes.PLAIN, name: "Plain" },
];

const shapesList = [
    { type: IOSInputShapeTypes.ROUNDED, name: "Rounded" },
    { type: IOSInputShapeTypes.PILL, name: "Pill" },
    { type: IOSInputShapeTypes.SQUARE, name: "Square" },
];

export default function InputsIOSSection() {
    const { setFormErrors } = useLionUI();

    const [playVariant, setPlayVariant] = useState<VariantTypes | string>(VariantTypes.PRIMARY);
    const [playStyle, setPlayStyle] = useState<IOSInputStyleTypes>(IOSInputStyleTypes.ROUNDED_BORDER);
    const [playShape, setPlayShape] = useState<IOSInputShapeTypes>(IOSInputShapeTypes.ROUNDED);
    const [playDisabled, setPlayDisabled] = useState<boolean>(false);
    const [playReadOnly, setPlayReadOnly] = useState<boolean>(false);
    const [playError, setPlayError] = useState<string>("");
    const [playValue, setPlayValue] = useState<string>("lion.swiftui");

    const handleSimulateServerErrors = () => {
        setFormErrors("ios-input-form", {
            username: [
                "The username is already registered in iOS Cloud.",
                "Username requires a valid SwiftUI format.",
            ],
        });
    };

    const getEnumKey = (enumObject: Record<string, any>, value: any): string => {
        return Object.keys(enumObject).find((key) => enumObject[key] === value) || value;
    };

    const variantEnumName = getEnumKey(VariantTypes, playVariant);
    const styleEnumName = getEnumKey(IOSInputStyleTypes, playStyle);
    const shapeEnumName = getEnumKey(IOSInputShapeTypes, playShape);

    // Code snippet for documentation pointing to the external @lion-npm/ui package
    const generatedCodeSnippet = `import { useState } from "react";
import {
    LionInput,
    VariantTypes,
    IOSInputStyleTypes,
    IOSInputShapeTypes,
    InputTypes,
    useLionUI
} from "@lion-npm/ui";

export default function IOSUserInputForm() {
    const [username, setUsername] = useState("${playValue}");
    const { setFormErrors } = useLionUI();

    const handleSimulateServerErrors = () => {
        setFormErrors("ios-input-form", {
            username: [
                "The username is already registered in iOS Cloud.",
                "Username requires a valid SwiftUI format.",
            ],
        });
    };

    return (
        <LionInput
            formId="ios-input-form"
            name="username"
            type={InputTypes.TEXT}
            variant={VariantTypes.${variantEnumName}}
            styleType={IOSInputStyleTypes.${styleEnumName}}
            shape={IOSInputShapeTypes.${shapeEnumName}}
            sizeType="md"
            label="Username"
            placeholder="Enter username..."
            clearable={true}${playDisabled ? "\n            disabled={true}" : ""}${playReadOnly ? "\n            readOnly={true}" : ""}${playError ? `\n            error="${playError}"` : ""}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
    );
}`;

    return (
        <Fragment>
            <h2>Inputs (iOS SwiftUI)</h2>
            <p className="text-muted">
                Interactive playground and live documentation for iOS SwiftUI inputs. Test variants, styles, shapes, states, and global context validation handling.
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
                                <Form.Select value={playStyle} onChange={(e) => setPlayStyle(e.target.value as IOSInputStyleTypes)}>
                                    {stylesList.map((s) => (
                                        <option key={s.type} value={s.type}>{s.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Shape</Form.Label>
                                <Form.Select value={playShape} onChange={(e) => setPlayShape(e.target.value as IOSInputShapeTypes)}>
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
                                id="play-ios-disabled"
                                label="Disabled State"
                                checked={playDisabled}
                                onChange={(e) => setPlayDisabled(e.target.checked)}
                            />
                            <Form.Check
                                type="checkbox"
                                id="play-ios-readonly"
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
                                <LionInput
                                    platform={PlatformTypes.IOS}
                                    formId="ios-input-form"
                                    name="username"
                                    type={InputTypes.TEXT}
                                    variant={playVariant}
                                    styleType={playStyle}
                                    shape={playShape}
                                    sizeType={"md"}
                                    label="Username"
                                    placeholder="Enter username..."
                                    clearable={true}
                                    disabled={playDisabled}
                                    readOnly={playReadOnly}
                                    error={playError}
                                    value={playValue}
                                    onChange={(e) => setPlayValue(e.target.value)}
                                    helperText="Interactive iOS input field testing."
                                />
                            </div>
                        </Col>

                        <Col xs={12} lg={7}>
                            <div className="p-3 bg-dark text-light rounded position-relative">
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