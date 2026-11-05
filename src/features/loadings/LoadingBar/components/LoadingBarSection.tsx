import { Fragment, useState } from "react";
import { Row, Col, Form, InputGroup, Card } from "react-bootstrap";
import { ButtonTypes } from "../../../../types/ButtonTypes.tsx";
import { VariantTypes } from "../../../../types/VariantTypes.tsx";
import { PlatformTypes } from "../../../../types/PlatformTypes.tsx";
import { useLionUI } from "../../../../context/LionUIComponentsContext.tsx";
import LionButton from "../../../../components/buttons/LionButton.tsx";
import LoadingBar from "../../../../components/loadings/LoadingBar.tsx";
import VariantList from "../../../VariantList.tsx";

const platformOptions = [
    { type: PlatformTypes.WEB, label: "Web / Desktop" },
    { type: PlatformTypes.ANDROID, label: "Android (MD3)" },
    { type: PlatformTypes.IOS, label: "iOS (Cupertino)" },
];

export default function LoadingBarSection() {
    const { updateState } = useLionUI();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedVariant, setSelectedVariant] = useState<VariantTypes | string>(VariantTypes.PRIMARY);
    const [selectedPlatform, setSelectedPlatform] = useState<string>(PlatformTypes.WEB);

    const handleTriggerLoading = () => {
        setIsLoading(true);
        updateState({ loading: true });

        setTimeout(() => {
            setIsLoading(false);
            updateState({ loading: false });
        }, 5000);
    };

    const getEnumKey = (enumObject: Record<string, any>, value: any): string => {
        return Object.keys(enumObject).find((key) => enumObject[key] === value) || value;
    };

    const variantEnumName = getEnumKey(VariantTypes, selectedVariant);
    const platformEnumName = getEnumKey(PlatformTypes, selectedPlatform);

    const generatedCodeSnippet = `import { useState } from "react";
import { 
    LoadingBar, 
    LionButton, 
    VariantTypes, 
    PlatformTypes, 
    ButtonTypes 
} from "@lion-npm/ui";

export default function MyLoadingBarScreen() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleTrigger = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
    };

    return (
        <div>
            <div className="mb-4" style={{ minHeight: "10px" }}>
                {isLoading && (
                    <LoadingBar 
                        platform={PlatformTypes.${platformEnumName}}
                        variant={VariantTypes.${variantEnumName}} 
                    />
                )}
            </div>

            <LionButton
                platform={PlatformTypes.${platformEnumName}}
                variant={VariantTypes.${variantEnumName}}
                type={ButtonTypes.BUTTON}
                disabled={isLoading}
                onClick={handleTrigger}
            >
                {isLoading ? "Loading..." : "Test Loading Bar"}
            </LionButton>
        </div>
    );
}`;

    return (
        <Fragment>
            <h2>Loading Bar Demonstrations</h2>
            <p className="text-muted mb-4">
                Interactive playground and live documentation for multiplatform progress loading bars. Select a platform and variant, then trigger the test action to validate behavior for 5 seconds.
            </p>

            <Card className="mb-4 shadow-sm">
                <Card.Header className="bg-light py-3">
                    <h5 className="mb-0 text-secondary">Interactive Playground & Code Documentation</h5>
                </Card.Header>
                <Card.Body>
                    <Row className="g-3 mb-4">
                        <Col xs={12} md={6}>
                            <InputGroup>
                                <InputGroup.Text className="fw-bold small">Platform</InputGroup.Text>
                                <Form.Select
                                    value={selectedPlatform}
                                    onChange={(e) => setSelectedPlatform(e.target.value)}
                                >
                                    {platformOptions.map((p) => (
                                        <option key={p.type} value={p.type}>
                                            {p.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </InputGroup>
                        </Col>

                        <Col xs={12} md={6}>
                            <InputGroup>
                                <InputGroup.Text className="fw-bold small">Variant</InputGroup.Text>
                                <Form.Select
                                    value={selectedVariant}
                                    onChange={(e) => setSelectedVariant(e.target.value)}
                                >
                                    {VariantList.map((variantName) => (
                                        <option key={variantName} value={variantName}>
                                            {variantName}
                                        </option>
                                    ))}
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row>

                    {/* Live preview container */}
                    <div className="mb-4 p-3 border rounded bg-white" style={{ minHeight: "50px" }}>
                        <span className="d-block text-muted small mb-2 fw-bold">LIVE COMPONENT PREVIEW</span>
                        <div style={{ minHeight: "10px" }}>
                            {isLoading && (
                                <LoadingBar
                                    platform={selectedPlatform}
                                    variant={selectedVariant}
                                />
                            )}
                        </div>
                    </div>

                    <Row className="g-4 align-items-start">
                        <Col xs={12} lg={5}>
                            <div className="p-4 border rounded bg-light h-100 d-flex flex-column justify-content-center align-items-center text-center">
                                <span className="d-block text-muted small mb-2 fw-bold">TEST ACTION</span>
                                <p className="text-secondary small mb-3">
                                    Customize the variant or platform above and click the trigger button to test.
                                </p>
                                <LionButton
                                    platform={selectedPlatform}
                                    variant={selectedVariant}
                                    type={ButtonTypes.BUTTON}
                                    disabled={isLoading}
                                    onClick={handleTriggerLoading}
                                >
                                    {isLoading ? "Loading..." : "Test Loading Bar"}
                                </LionButton>
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