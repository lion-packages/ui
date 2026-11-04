import { Fragment, useState } from "react";
import { Row, Col, Button, Form, Card } from "react-bootstrap";
import VariantList from "../../VariantList.tsx";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { IOSInputStyleTypes } from "../../../types/IOS/IOSInputStyleTypes.tsx";
import { IOSInputShapeTypes } from "../../../types/IOS/IOSInputShapeTypes.tsx";
import IOSSelect from "../../../components/select/IOSSelect.tsx";
import { useLionUI } from "../../../context/LionUIComponentsContext.tsx";

// Mock raw API data with custom property keys
const mockRoleOptions = [
    { idroles: 1, roles_name: "Administrator", is_disabled: false },
    { idroles: 2, roles_name: "Stylist", is_disabled: false },
    { idroles: 3, roles_name: "Client (Inactive)", is_disabled: true },
];

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

export default function SelectsIOSSection() {
    const { setFormErrors } = useLionUI();

    // Interactive playground state for documentation and dynamic live preview
    const [playVariant, setPlayVariant] = useState<VariantTypes | string>(VariantTypes.PRIMARY);
    const [playStyle, setPlayStyle] = useState<IOSInputStyleTypes>(IOSInputStyleTypes.ROUNDED_BORDER);
    const [playShape, setPlayShape] = useState<IOSInputShapeTypes>(IOSInputShapeTypes.ROUNDED);
    const [playDisabled, setPlayDisabled] = useState<boolean>(false);
    const [playError, setPlayError] = useState<string>("");
    const [playValue, setPlayValue] = useState<string>("");

    // Handler to simulate backend multiple validation errors via global context directly inside the playground
    const handleSimulateServerErrors = () => {
        setFormErrors("ios-demo-form", {
            roles_name: [
                "The selected role is restricted for external iOS users.",
                "You must choose an active platform profile.",
            ],
        });
    };

    // Helper to find key enum name for display in code generation
    const getEnumKey = (enumObject: Record<string, any>, value: any): string => {
        return Object.keys(enumObject).find((key) => enumObject[key] === value) || value;
    };

    const variantEnumName = getEnumKey(VariantTypes, playVariant);
    const styleEnumName = getEnumKey(IOSInputStyleTypes, playStyle);
    const shapeEnumName = getEnumKey(IOSInputShapeTypes, playShape);

    // Dynamic code snippet generator reflecting external package imports
    const generatedCodeSnippet = `import { useState } from "react";
import { 
    IOSSelect, 
    VariantTypes, 
    IOSInputStyleTypes, 
    IOSInputShapeTypes, 
    useLionUI 
} from "@lion-npm/ui";

export default function UserRoleForm() {
    const [selectedRole, setSelectedRole] = useState("${playValue}");
    const { setFormErrors } = useLionUI();

    // Example: Triggering multiple backend validation errors dynamically by formId
    const handleSimulateServerErrors = () => {
        setFormErrors("ios-demo-form", {
            roles_name: [
                "The selected role is restricted for external iOS users.",
                "You must choose an active platform profile.",
            ],
        });
    };

    return (
        <IOSSelect
            formId="ios-demo-form"
            name="roles_name"
            variant={VariantTypes.${variantEnumName}}
            styleType={IOSInputStyleTypes.${styleEnumName}}
            shape={IOSInputShapeTypes.${shapeEnumName}}
            sizeType="md"
            label="User Role Select"
            placeholderOption="Choose a role..."
            options={mockRoleOptions}
            optionValueKey="idroles"
            optionLabelKey="roles_name"
            optionDisabledKey="is_disabled"${playDisabled ? "\n            disabled={true}" : ""}${playError ? `\n            error="${playError}"` : ""}
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
        />
    );
}`;

    return (
        <Fragment>
            <h2>Selects (iOS)</h2>

            <p className="text-muted">
                Interactive playground and live documentation of iOS SwiftUI Design selects. Test variants, styles, shapes, states, and global context multi-error handling from a single consolidated interface.
            </p>

            {/* Interactive Documentation & Testing Playground */}
            <Card className="mb-4 shadow-sm">
                <Card.Header className="bg-light d-flex justify-content-between align-items-center py-3">
                    <h5 className="mb-0 text-secondary">Interactive Playground & Live Code Documentation</h5>
                    <Button variant="outline-danger" size="sm" onClick={handleSimulateServerErrors}>
                        Simulate Server Response Errors
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Row className="g-3 mb-4">
                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Variant</Form.Label>
                                <Form.Select
                                    value={playVariant}
                                    onChange={(e) => setPlayVariant(e.target.value)}
                                >
                                    {VariantList.map((v) => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Style</Form.Label>
                                <Form.Select
                                    value={playStyle}
                                    onChange={(e) => setPlayStyle(e.target.value as IOSInputStyleTypes)}
                                >
                                    {stylesList.map((s) => (
                                        <option key={s.type} value={s.type}>{s.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Shape</Form.Label>
                                <Form.Select
                                    value={playShape}
                                    onChange={(e) => setPlayShape(e.target.value as IOSInputShapeTypes)}
                                >
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

                        <Col xs={12} className="d-flex align-items-center gap-3">
                            <Form.Check
                                type="checkbox"
                                id="play-ios-disabled-check"
                                label="Disabled State"
                                checked={playDisabled}
                                onChange={(e) => setPlayDisabled(e.target.checked)}
                            />
                        </Col>
                    </Row>

                    <Row className="g-4 align-items-start">
                        <Col xs={12} lg={5}>
                            <div className="p-4 border rounded bg-white h-100">
                                <span className="d-block text-muted small mb-3 fw-bold">LIVE COMPONENT PREVIEW</span>
                                <IOSSelect
                                    formId="ios-demo-form"
                                    name="roles_name"
                                    variant={playVariant}
                                    styleType={playStyle}
                                    shape={playShape}
                                    sizeType={"md"}
                                    label={"Playground Select Control"}
                                    placeholderOption={"Choose a role..."}
                                    options={mockRoleOptions}
                                    optionValueKey="idroles"
                                    optionLabelKey="roles_name"
                                    optionDisabledKey="is_disabled"
                                    disabled={playDisabled}
                                    error={playError}
                                    value={playValue}
                                    onChange={(e) => setPlayValue(e.target.value)}
                                    helperText="Interacting with this control clears global context errors."
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