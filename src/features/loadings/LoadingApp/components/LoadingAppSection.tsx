import { useState, useEffect, Fragment } from "react";
import { Button, Row, Col, Form, InputGroup, Card } from "react-bootstrap";
import { VariantTypes } from "../../../../types/VariantTypes.tsx";
import { PlatformTypes } from "../../../../types/PlatformTypes.tsx";
import VariantList from "../../../VariantList.tsx";
import LoadingApp from "../../../../components/loadings/LoadingApp.tsx";
import { useLionUI } from "../../../../context/LionUIComponentsContext.tsx";

const platformOptions = [
    { type: PlatformTypes.WEB, label: "Web / Desktop" },
    { type: PlatformTypes.ANDROID, label: "Android (MD3)" },
    { type: PlatformTypes.IOS, label: "iOS (Cupertino)" },
];

export default function LoadingAppSection() {
    const { state, updateState } = useLionUI();
    const isLoading = state.loading;

    // Local configuration states for the interactive playground controls
    const [selectedVariant, setSelectedVariant] = useState<string>(VariantTypes.PRIMARY);
    const [selectedPlatform, setSelectedPlatform] = useState<string>(state.platform || PlatformTypes.WEB);
    const [customAppName, setCustomAppName] = useState<string>("Lion-UI");
    const [customLoadingText, setCustomLoadingText] = useState<string>("Loader");

    // Automatically hide the loading screen after a maximum of 5 seconds
    useEffect(() => {
        if (!isLoading) {
            return;
        }

        const timer = setTimeout(() => {
            updateState({ loading: false });
        }, 5000);

        return () => clearTimeout(timer);
    }, [isLoading, updateState]);

    const handleTriggerLoading = () => {
        updateState({ loading: true });
    };

    const getEnumKey = (enumObject: Record<string, any>, value: any): string => {
        return Object.keys(enumObject).find((key) => enumObject[key] === value) || value;
    };

    const variantEnumName = getEnumKey(VariantTypes, selectedVariant);
    const platformEnumName = getEnumKey(PlatformTypes, selectedPlatform);

    // Dynamic code snippet reflecting full customization options with @lion-npm/ui
    const generatedCodeSnippet = `import { 
    LoadingApp, 
    VariantTypes, 
    PlatformTypes, 
    useLionUI 
} from "@lion-npm/ui";

export default function MyLoadingScreen() {
    const { state, updateState } = useLionUI();

    return (
        <div>
            <button onClick={() => updateState({ loading: true })}>
                Show Global Loader
            </button>

            {state.loading && (
                <LoadingApp
                    platform={PlatformTypes.${platformEnumName}}
                    variant={VariantTypes.${variantEnumName}}
                    appName="${customAppName}"
                    loadingText="${customLoadingText}"
                />
            )}
        </div>
    );
}`;

    return (
        <Fragment>
            <h2>LoadingApp Component Test</h2>

            <p className="text-muted mb-4">
                Interactive playground and live documentation for multiplatform full-screen loading overlays integrated with the global `useLionUI` context (`state.loading`). Customize variants, platforms, app names, and messages in real time.
            </p>

            <Card className="mb-4 shadow-sm">
                <Card.Header className="bg-light py-3">
                    <h5 className="mb-0 text-secondary">Interactive Playground & Code Documentation</h5>
                </Card.Header>
                <Card.Body>
                    <Row className="g-3 mb-4">
                        <Col xs={12} md={3}>
                            <InputGroup>
                                <InputGroup.Text className="fw-bold small">Platform</InputGroup.Text>
                                <Form.Select
                                    value={selectedPlatform}
                                    onChange={(e) => {
                                        setSelectedPlatform(e.target.value);
                                        updateState({ platform: e.target.value as PlatformTypes });
                                    }}
                                >
                                    {platformOptions.map((p) => (
                                        <option key={p.type} value={p.type}>
                                            {p.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </InputGroup>
                        </Col>

                        <Col xs={12} md={3}>
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

                        <Col xs={12} md={3}>
                            <Form.Control
                                type="text"
                                placeholder="App Name"
                                value={customAppName}
                                onChange={(e) => setCustomAppName(e.target.value)}
                            />
                        </Col>

                        <Col xs={12} md={3}>
                            <Form.Control
                                type="text"
                                placeholder="Loading Text"
                                value={customLoadingText}
                                onChange={(e) => setCustomLoadingText(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Row className="g-4 align-items-start">
                        <Col xs={12} lg={5}>
                            <div className="p-4 border rounded bg-white h-100 d-flex flex-column justify-content-center align-items-center text-center">
                                <span className="d-block text-muted small mb-3 fw-bold">LIVE COMPONENT STATUS</span>
                                <p className="text-secondary small mb-0">
                                    {isLoading
                                        ? `Global loading overlay active on screen using [${selectedPlatform.toUpperCase()}] layout with [${selectedVariant}] variant...`
                                        : "Customize the variant, app name, or message above and click the trigger button to test."
                                    }
                                </p>

                                <Button
                                    variant={selectedVariant}
                                    onClick={handleTriggerLoading}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Global Loading in progress..." : "Trigger Global Loading Overlay (5s max)"}
                                </Button>
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

            {isLoading && (
                <LoadingApp
                    platform={selectedPlatform}
                    variant={selectedVariant}
                    appName={customAppName}
                    loadingText={customLoadingText}
                />
            )}
        </Fragment>
    );
}