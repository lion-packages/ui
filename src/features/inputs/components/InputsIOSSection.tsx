import {Fragment, type SyntheticEvent, useState} from "react";
import { Row, Col, Button, Form, Card } from "react-bootstrap";
import VariantList from "../../VariantList.tsx";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { IOSInputStyleTypes } from "../../../types/IOS/IOSInputStyleTypes.tsx";
import { IOSInputShapeTypes } from "../../../types/IOS/IOSInputShapeTypes.tsx";
import { InputTypes } from "../../../types/InputTypes.tsx";
import { PlatformTypes } from "../../../types/PlatformTypes.tsx";
import { useLionUI } from "../../../context/LionUIComponentsContext.tsx";
import LionInput from "../../../components/inputs/LionInput.tsx";
import LionButton from "../../../components/buttons/LionButton.tsx";
import {ButtonTypes} from "../../../types/ButtonTypes.tsx";
import {IOSButtonShapeTypes} from "../../../types/IOS/IOSButtonShapeTypes.tsx";
import {IOSButtonStyleTypes} from "../../../types/IOS/IOSButtonStyleTypes.tsx";

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
    const [playType, setPlayType] = useState<InputTypes | string>(InputTypes.TEXT);
    const [playDisabled, setPlayDisabled] = useState<boolean>(false);
    const [playReadOnly, setPlayReadOnly] = useState<boolean>(false);
    const [playRequired, setPlayRequired] = useState<boolean>(false);
    const [playRequiredMessage, setPlayRequiredMessage] = useState<string>("This field is required.");
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
    const typeEnumName = getEnumKey(InputTypes, playType);

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
            type={InputTypes.${typeEnumName}}
            variant={VariantTypes.${variantEnumName}}
            styleType={IOSInputStyleTypes.${styleEnumName}}
            shape={IOSInputShapeTypes.${shapeEnumName}}
            sizeType="md"
            label="Username"
            placeholder="Enter username..."
            clearable={true}${playRequired ? "\n            required={true}" : ""}${playRequired && playRequiredMessage ? `\n            requiredMessage="${playRequiredMessage}"` : ""}${playDisabled ? "\n            disabled={true}" : ""}${playReadOnly ? "\n            readOnly={true}" : ""}${playError ? `\n            error="${playError}"` : ""}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
    );
}`;

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitted!!!");
    };

    return (
        <Fragment>
            <h2>Inputs (iOS SwiftUI)</h2>
            <p className="text-muted">
                Interactive playground and live documentation for iOS SwiftUI inputs. Test variants, styles, shapes, types, states, and global context validation handling.
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
                                <Form.Label className="fw-bold small">Input Type</Form.Label>
                                <Form.Select value={playType} onChange={(e) => setPlayType(e.target.value)}>
                                    {Object.values(InputTypes).map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
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

                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Required Message</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="This field is required."
                                    value={playRequiredMessage}
                                    onChange={(e) => setPlayRequiredMessage(e.target.value)}
                                    disabled={!playRequired}
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
                            <Form.Check
                                type="checkbox"
                                id="play-ios-required"
                                label="Required State"
                                checked={playRequired}
                                onChange={(e) => setPlayRequired(e.target.checked)}
                            />
                        </Col>
                    </Row>

                    <Row className="g-4 align-items-start">
                        <Col xs={12} lg={5}>
                            <div className="p-4 border rounded bg-white h-100">
                                <span className="d-block text-muted small mb-3 fw-bold">LIVE COMPONENT PREVIEW</span>

                                <Form id="ios-input-form" onSubmit={handleSubmit}>
                                    <LionInput
                                        platform={PlatformTypes.IOS}
                                        formId="ios-input-form"
                                        name="username"
                                        type={playType}
                                        variant={playVariant}
                                        styleType={playStyle}
                                        shape={playShape}
                                        sizeType="md"
                                        label="Username"
                                        placeholder="Enter username..."
                                        clearable={true}
                                        required={playRequired}
                                        requiredMessage={playRequiredMessage}
                                        disabled={playDisabled}
                                        readOnly={playReadOnly}
                                        error={playError}
                                        value={playValue}
                                        onChange={(e) => setPlayValue(e.target.value)}
                                        helperText="Interactive iOS input field testing."
                                        className="mb-3"
                                    />

                                    <LionInput
                                        platform={PlatformTypes.IOS}
                                        formId="ios-input-form"
                                        name="username_2"
                                        type={playType}
                                        variant={playVariant}
                                        styleType={playStyle}
                                        shape={playShape}
                                        sizeType="md"
                                        label="Username 2"
                                        placeholder="Enter username 2..."
                                        clearable={true}
                                        required={playRequired}
                                        requiredMessage={playRequiredMessage}
                                        disabled={playDisabled}
                                        readOnly={playReadOnly}
                                        error={playError}
                                        value={playValue}
                                        onChange={(e) => setPlayValue(e.target.value)}
                                        helperText="Interactive iOS input field testing."
                                    />

                                    {playRequired && (
                                        <LionButton
                                            platform={PlatformTypes.IOS}
                                            type={ButtonTypes.SUBMIT}
                                            variant={playVariant}
                                            className={"mt-3 w-100"}
                                            shape={IOSButtonShapeTypes.ROUNDED}
                                            styleType={IOSButtonStyleTypes.TINTED}
                                        >
                                            {"Submit"}
                                        </LionButton>
                                    )}
                                </Form>
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