import { Fragment, useState } from "react";
import { Row, Col, Form, Card } from "react-bootstrap";
import VariantList from "../../VariantList.tsx";
import { IOSButtonStyleTypes } from "../../../types/IOS/IOSButtonStyleTypes.tsx";
import { IOSButtonShapeTypes } from "../../../types/IOS/IOSButtonShapeTypes.tsx";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { SizeTypes } from "../../../types/SizeTypes.tsx";
import { ButtonTypes } from "../../../types/ButtonTypes.tsx";
import { PlatformTypes } from "../../../types/PlatformTypes.tsx";
import LionButton from "../../../components/buttons/LionButton.tsx";

const StyleTypeList = [
    { label: "Filled", styleType: IOSButtonStyleTypes.FILLED },
    { label: "Tinted", styleType: IOSButtonStyleTypes.TINTED },
    { label: "Gray", styleType: IOSButtonStyleTypes.GRAY },
    { label: "Plain", styleType: IOSButtonStyleTypes.PLAIN },
];

const ShapeList = [
    { label: "Rounded Shape", shape: IOSButtonShapeTypes.ROUNDED },
    { label: "Capsule Shape", shape: IOSButtonShapeTypes.CAPSULE },
];

export default function ButtonsIOSSection() {
    const [playVariant, setPlayVariant] = useState<VariantTypes | string>(VariantTypes.PRIMARY);
    const [playStyle, setPlayStyle] = useState<IOSButtonStyleTypes>(IOSButtonStyleTypes.FILLED);
    const [playShape, setPlayShape] = useState<IOSButtonShapeTypes>(IOSButtonShapeTypes.ROUNDED);
    const [playSize, setPlaySize] = useState<SizeTypes | string>(SizeTypes.MD);
    const [playDisabled, setPlayDisabled] = useState<boolean>(false);
    const [playText, setPlayText] = useState<string>("iOS Action");

    const getEnumKey = (enumObject: Record<string, any>, value: any): string => {
        return Object.keys(enumObject).find((key) => enumObject[key] === value) || value;
    };

    const variantEnumName = getEnumKey(VariantTypes, playVariant);
    const styleEnumName = getEnumKey(IOSButtonStyleTypes, playStyle);
    const shapeEnumName = getEnumKey(IOSButtonShapeTypes, playShape);
    const sizeEnumName = getEnumKey(SizeTypes, playSize);

    const generatedCodeSnippet = `import { 
    LionButton,
    VariantTypes,
    SizeTypes,
    ButtonTypes,
    PlatformTypes,
    IOSButtonStyleTypes,
    IOSButtonShapeTypes 
} from "@lion-npm/ui";

export default function MyIOSScreen() {
    return (
        <LionButton
            platform={PlatformTypes.IOS}
            type={ButtonTypes.BUTTON}
            variant={VariantTypes.${variantEnumName}}
            styleType={IOSButtonStyleTypes.${styleEnumName}}
            shape={IOSButtonShapeTypes.${shapeEnumName}}
            size={SizeTypes.${sizeEnumName}}${playDisabled ? "\n            disabled={true}" : ""}
        >
            ${playText}
        </LionButton>
    );
}`;

    return (
        <Fragment>
            <h2>Buttons (iOS HIG)</h2>
            <p className="text-muted">
                Interactive playground and live documentation for iOS Human Interface Guidelines buttons.
            </p>

            <Card className="mb-4 shadow-sm">
                <Card.Header className="bg-light py-3">
                    <h5 className="mb-0 text-secondary">Interactive Playground & Code Documentation</h5>
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
                                <Form.Select value={playStyle} onChange={(e) => setPlayStyle(e.target.value as IOSButtonStyleTypes)}>
                                    {StyleTypeList.map((s) => (
                                        <option key={s.styleType} value={s.styleType}>{s.label}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Shape</Form.Label>
                                <Form.Select value={playShape} onChange={(e) => setPlayShape(e.target.value as IOSButtonShapeTypes)}>
                                    {ShapeList.map((sh) => (
                                        <option key={sh.shape} value={sh.shape}>{sh.label}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Size</Form.Label>
                                <Form.Select value={playSize} onChange={(e) => setPlaySize(e.target.value)}>
                                    {Object.values(SizeTypes).map((sz) => (
                                        <option key={sz} value={sz}>{sz.toUpperCase()}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group>
                                <Form.Label className="fw-bold small">Button Text</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={playText}
                                    onChange={(e) => setPlayText(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} className="d-flex align-items-center">
                            <Form.Check
                                type="checkbox"
                                id="play-ios-btn-disabled"
                                label="Disabled State"
                                checked={playDisabled}
                                onChange={(e) => setPlayDisabled(e.target.checked)}
                            />
                        </Col>
                    </Row>

                    <Row className="g-4 align-items-start">
                        <Col xs={12} lg={5}>
                            <div className="p-4 border rounded bg-white h-100 text-center">
                                <span className="d-block text-muted small mb-3 fw-bold">LIVE COMPONENT PREVIEW</span>
                                <LionButton
                                    platform={PlatformTypes.IOS}
                                    type={ButtonTypes.BUTTON}
                                    variant={playVariant}
                                    styleType={playStyle}
                                    shape={playShape}
                                    size={playSize as SizeTypes}
                                    disabled={playDisabled}
                                >
                                    {playText}
                                </LionButton>
                            </div>
                        </Col>

                        <Col xs={12} lg={7}>
                            <div className="p-3 bg-dark text-light rounded position-relative">
                                <pre
                                    className="mb-0 text-light bg-transparent p-0"
                                    style={{ fontSize: "0.825rem", overflowX: "auto" }}
                                >
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