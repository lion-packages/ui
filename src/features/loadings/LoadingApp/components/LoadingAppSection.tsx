import { useState, useEffect } from "react";
import { Button, Row, Col, Form, InputGroup, Card } from "react-bootstrap";
import { VariantTypes } from "../../../../types/VariantTypes.tsx";
import VariantList from "../../../VariantList.tsx";
import LoadingApp from "../../../../components/loadings/LoadingApp.tsx";

export default function LoadingAppSection() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedVariant, setSelectedVariant] = useState<string>(VariantTypes.PRIMARY);
    const [customAppName, setCustomAppName] = useState<string>("Lion-UI");
    const [customLoadingText, setCustomLoadingText] = useState<string>("Loader");

    // Automatically hide the loading screen after a maximum of 5 seconds
    useEffect(() => {
        if (!isLoading) {
            return;
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [isLoading]);

    const handleTriggerLoading = () => {
        setIsLoading(true);
    };

    return (
        <div className="p-4">
            <h2 className="mb-3">
                LoadingApp Component Test
            </h2>

            <p className="text-muted mb-4">
                Interactive section to validate full-screen loading overlays across different theme variants. The loader
                automatically terminates after a maximum execution of 5 seconds.
            </p>

            <Card className="p-4 shadow-sm bg-light mb-4">
                <Row className="g-3 align-items-center">
                    <Col md={4}>
                        <InputGroup>
                            <InputGroup.Text className="fw-bold">Variant</InputGroup.Text>
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

                    <Col md={4}>
                        <Form.Control
                            type="text"
                            placeholder="App Name"
                            value={customAppName}
                            onChange={(e) => setCustomAppName(e.target.value)}
                        />
                    </Col>

                    <Col md={4}>
                        <Form.Control
                            type="text"
                            placeholder="Loading Text"
                            value={customLoadingText}
                            onChange={(e) => setCustomLoadingText(e.target.value)}
                        />
                    </Col>

                    <Col xs={12} className="mt-3">
                        <Button
                            variant={selectedVariant}
                            onClick={handleTriggerLoading}
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading in progress..." : "Trigger Loading Overlay (5s max)"}
                        </Button>
                    </Col>
                </Row>
            </Card>

            {isLoading && (
                <LoadingApp
                    variant={selectedVariant}
                    appName={customAppName}
                    loadingText={customLoadingText}
                />
            )}
        </div>
    );
}