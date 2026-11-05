import { Fragment, useState } from "react";
import { Form, InputGroup, Card, Row, Col } from "react-bootstrap";
import { VariantTypes } from "../../../../types/VariantTypes.tsx";
import { BootstrapButtonStyleTypes } from "../../../../types/Web/BootstrapButtonStyleTypes.tsx";
import { BootstrapButtonShapeTypes } from "../../../../types/Web/BootstrapButtonShapeTypes.tsx";
import { PlatformTypes } from "../../../../types/PlatformTypes.tsx";
import { AndroidButtonStyleTypes } from "../../../../types/Android/AndroidButtonStyleTypes.tsx";
import { AndroidButtonShapeTypes } from "../../../../types/Android/AndroidButtonShapeTypes.tsx";
import { IOSButtonStyleTypes } from "../../../../types/IOS/IOSButtonStyleTypes.tsx";
import { IOSButtonShapeTypes } from "../../../../types/IOS/IOSButtonShapeTypes.tsx";
import { ButtonTypes } from "../../../../types/ButtonTypes.tsx";
import { SizeTypes } from "../../../../types/SizeTypes.tsx";
import LionTitle from "../../../../components/titles/LionTitle.tsx";
import LionButton from "../../../../components/buttons/LionButton.tsx";

const platformOptions = [
    { type: PlatformTypes.WEB, label: "Web Browser" },
    { type: PlatformTypes.IOS, label: "iOS Environment" },
    { type: PlatformTypes.ANDROID, label: "Android Environment" },
];

export default function LionTitleSection() {
    const [titleText, setTitleText] = useState<string>("Orders & Logistics");
    const [forcedPlatform, setForcedPlatform] = useState<string>(PlatformTypes.WEB);

    const getEnumKey = (enumObject: Record<string, any>, value: any): string => {
        return Object.keys(enumObject).find((key) => enumObject[key] === value) || value;
    };

    const platformEnumName = getEnumKey(PlatformTypes, forcedPlatform);

    const generatedCodeSnippet = `import { Fragment } from "react";
import { 
    LionTitle, 
    LionButton, 
    VariantTypes, 
    PlatformTypes, 
    ButtonTypes,
    BootstrapButtonStyleTypes,
    BootstrapButtonShapeTypes 
} from "@lion-npm/ui";

export default function MyTitleScreen() {
    return (
        <LionTitle
            title="${titleText}"
            platform={PlatformTypes.${platformEnumName}}
            rightActions={
                <Fragment>
                    <LionButton
                        variant={VariantTypes.PRIMARY}
                        type={ButtonTypes.BUTTON}
                        platform={PlatformTypes.${platformEnumName}}
                        styleType={{
                            web: BootstrapButtonStyleTypes.FILLED,
                            android: AndroidButtonStyleTypes.TONAL,
                            ios: IOSButtonStyleTypes.TINTED,
                        }}
                        shape={{
                            web: BootstrapButtonShapeTypes.STANDARD,
                            android: AndroidButtonShapeTypes.ROUNDED,
                            ios: IOSButtonShapeTypes.ROUNDED,
                        }}
                    >
                        + Create
                    </LionButton>
                </Fragment>
            }
        />
    );
}`;

    return (
        <Fragment>
            <h2 className="mb-3">LionTitle Component Test</h2>
            <p className="text-muted mb-4">
                Interactive section and live documentation to test multiplatform title headers along with action buttons, custom texts, and platform environments.
            </p>

            <Card className="mb-4 shadow-sm">
                <Card.Header className="bg-light py-3">
                    <h5 className="mb-0 text-secondary">Interactive Playground & Code Documentation</h5>
                </Card.Header>
                <Card.Body>
                    <Row className="g-3 mb-4">
                        <Col xs={12} md={6}>
                            <InputGroup>
                                <InputGroup.Text className="fw-bold">Title Label</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    value={titleText}
                                    onChange={(e) => setTitleText(e.target.value)}
                                />
                            </InputGroup>
                        </Col>

                        <Col xs={12} md={6}>
                            <InputGroup>
                                <InputGroup.Text className="fw-bold">Platform</InputGroup.Text>
                                <Form.Select
                                    value={forcedPlatform}
                                    onChange={(e) => setForcedPlatform(e.target.value)}
                                >
                                    {platformOptions.map((p) => (
                                        <option key={p.type} value={p.type}>
                                            {p.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row>

                    <div className="p-3 border rounded bg-white">
                        <span className="d-block text-muted small mb-2 fw-bold">LIVE COMPONENT PREVIEW</span>
                        <div className="border p-2 rounded bg-light">
                            <LionTitle
                                title={titleText}
                                platform={forcedPlatform}
                                rightActions={
                                    <Fragment>
                                        <LionButton
                                            variant={VariantTypes.PRIMARY}
                                            type={ButtonTypes.BUTTON}
                                            platform={forcedPlatform}
                                            size={SizeTypes.SM}
                                            styleType={{
                                                web: BootstrapButtonStyleTypes.FILLED,
                                                android: AndroidButtonStyleTypes.TONAL,
                                                ios: IOSButtonStyleTypes.TINTED,
                                            }}
                                            shape={{
                                                web: BootstrapButtonShapeTypes.STANDARD,
                                                android: AndroidButtonShapeTypes.ROUNDED,
                                                ios: IOSButtonShapeTypes.ROUNDED,
                                            }}
                                        >
                                            + Create
                                        </LionButton>

                                        <LionButton
                                            variant={VariantTypes.LIGHT}
                                            type={ButtonTypes.BUTTON}
                                            platform={forcedPlatform}
                                            size={SizeTypes.SM}
                                            styleType={{
                                                web: BootstrapButtonStyleTypes.FILLED,
                                                android: AndroidButtonStyleTypes.TONAL,
                                                ios: IOSButtonStyleTypes.TINTED,
                                            }}
                                            shape={{
                                                web: BootstrapButtonShapeTypes.STANDARD,
                                                android: AndroidButtonShapeTypes.ROUNDED,
                                                ios: IOSButtonShapeTypes.ROUNDED,
                                            }}
                                        >
                                            <i className="bi bi-arrow-clockwise" />
                                        </LionButton>
                                    </Fragment>
                                }
                            />
                        </div>
                    </div>

                    <div className="p-3 bg-dark text-light rounded position-relative h-100">
                        <span className="d-block text-muted small mb-2 fw-bold">GENERATED CODE SNIPPET (COPY & PASTE READY)</span>
                        <pre className="mb-0 text-light bg-transparent p-0" style={{ fontSize: "0.78rem", overflowX: "auto", maxHeight: "600px" }}>
                                    <code>{generatedCodeSnippet}</code>
                                </pre>
                    </div>
                </Card.Body>
            </Card>
        </Fragment>
    );
}