import { Fragment } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";

export default function GetStarted() {
    const providerSnippet = `import React from "react";
import ReactDOM from "react-dom/client";
import { LionUIComponentsProvider, PlatformTypes } from "@lion-npm/ui";
import App from "./App.tsx";

// Include library styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '@lion-npm/ui/style.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <LionUIComponentsProvider
            defaultPlatform={import.meta.env.VITE_APP_ENVIRONMENT ?? PlatformTypes.WEB} // optional, default web
        >
            <App />
        </LionUIComponentsProvider>
    </React.StrictMode>
);`;

    const usageSnippet = `import { useLionUI, LoadingApp, VariantTypes, PlatformTypes } from "@lion-npm/ui";

export default function DashboardView() {
    const { state, updateState } = useLionUI();

    return (
        <div className="p-4">
            <h1>Current Platform: {state.platform}</h1>
            
            <button onClick={() => updateState({ loading: true })}>
                Trigger Global Loader
            </button>

            {state.loading && (
                <LoadingApp 
                    platform={PlatformTypes.WEB} 
                    variant={VariantTypes.PRIMARY} 
                    appName="Lion Workspace"
                    loadingText="Synchronizing..."
                />
            )}
        </div>
    );
}`;

    return (
        <Fragment>
            {/* Header Section */}
            <div className="mb-4">
                <div className="d-flex align-items-center gap-3 mb-2">
                    <h2 className="mb-0 fw-bold">Lion UI Library</h2>

                    <Badge bg="primary" className="fs-6">v1.x</Badge>
                </div>

                <p className="text-muted lead fs-6">
                    A robust, multiplatform component library engineered for React and Capacitor. Build once and deliver
                    native-feeling experiences across Web, Android (Material Design 3), and iOS (Cupertino).
                </p>
            </div>

            {/* Core Features Grid */}
            <Row className="g-4 mb-5">
                <Col md={4}>
                    <Card className="h-100 shadow-sm border-0 bg-light">
                        <Card.Body className="p-4">
                            <div className="text-primary fs-3 mb-2">
                                <i className="bi bi-display" />
                            </div>

                            <h5 className="fw-bold mb-2">Multiplatform Architecture</h5>

                            <p className="text-muted small mb-0">
                                Native adaptability across Web, Android (MD3), and iOS (Cupertino) through explicit
                                platform property binding or automatic runtime detection.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 shadow-sm border-0 bg-light">
                        <Card.Body className="p-4">
                            <div className="text-success fs-3 mb-2">
                                <i className="bi bi-sliders" />
                            </div>

                            <h5 className="fw-bold mb-2">Variant Harmonization</h5>

                            <p className="text-muted small mb-0">
                                Fully synchronized styling system supporting standard Bootstrap variants and custom Lion
                                enterprise themes without style clashes.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 shadow-sm border-0 bg-light">
                        <Card.Body className="p-4">
                            <div className="text-warning fs-3 mb-2">
                                <i className="bi bi-code-square" />
                            </div>

                            <h5 className="fw-bold mb-2">Strict Type Safety</h5>

                            <p className="text-muted small mb-0">
                                Written entirely in TypeScript with strict interface definitions and comprehensive prop
                                validation out of the box.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <div className="d-flex flex-column gap-4 mb-4">
                {/* Step 1 */}
                <Card className="shadow-sm border-0">
                    <Card.Body className="p-4">
                        <h4 className="text-secondary fw-bold mb-3">1. Package Installation</h4>

                        <p className="text-muted small mb-3">
                            Install the library in your project using your preferred Node package manager. Ensure your
                            project has React 18+ and Bootstrap 5 configured.
                        </p>

                        <div className="p-3 bg-dark text-light rounded mb-3">
                            <pre
                                className="mb-0 text-light bg-transparent p-0"
                                style={{ fontSize: "0.85rem", overflowX: "auto" }}
                            >
                                <code>{`npm install @lion-npm/ui`}</code>
                            </pre>
                        </div>

                        <div className="p-3 bg-dark text-light rounded mb-3">
                            <pre
                                className="mb-0 text-light bg-transparent p-0"
                                style={{ fontSize: "0.85rem", overflowX: "auto" }}
                            >
                                <code>{`yarn add @lion-npm/ui`}</code>
                            </pre>
                        </div>

                        <div className="p-3 bg-dark text-light rounded">
                            <pre
                                className="mb-0 text-light bg-transparent p-0"
                                style={{ fontSize: "0.85rem", overflowX: "auto" }}
                            >
                                <code>{`pnpm add @lion-npm/ui`}</code>
                            </pre>
                        </div>

                        <hr />

                        <Fragment>
                            <h5 className="text-secondary fw-bold mb-3">1.1 Required dependencies.</h5>

                            <div className="p-3 bg-dark text-light rounded">
                            <pre
                                className="mb-0 text-light bg-transparent p-0"
                                style={{ fontSize: "0.85rem", overflowX: "auto" }}
                            >
                                <code>
                                    {`npm install @capacitor/core bootstrap bootstrap-icons react-bootstrap @tanstack/react-table`}
                                </code>
                            </pre>
                            </div>
                        </Fragment>
                    </Card.Body>
                </Card>

                {/* Step 2 */}
                <Card className="shadow-sm border-0">
                    <Card.Body className="p-4">
                        <h4 className="text-secondary fw-bold mb-3">2. Context Setup (LionUIComponentsProvider)</h4>

                        <p className="text-muted small mb-3">
                            Wrap your root application component with <code>LionUIComponentsProvider</code>. It
                            automatically detects the host platform via Capacitor or lets you override it explicitly via
                            <code>defaultPlatform</code>. It manages global states like loading screens, modals,
                            sidebars, and form validation errors.
                        </p>

                        <div className="p-3 bg-dark text-light rounded">
                            <pre
                                className="mb-0 text-light bg-transparent p-0"
                                style={{ fontSize: "0.80rem", overflowX: "auto" }}
                            >
                                <code>{providerSnippet}</code>
                            </pre>
                        </div>
                    </Card.Body>
                </Card>

                {/* Step 3 */}
                <Card className="shadow-sm border-0">
                    <Card.Body className="p-4">
                        <h4 className="text-secondary fw-bold mb-3">3. Consuming State and Components</h4>

                        <p className="text-muted small mb-3">
                            Use the <code>useLionUI</code> hook anywhere within the provider tree to access and modify
                            global UI states, or pass platform props explicitly to tailor components to target devices.
                        </p>

                        <div className="p-3 bg-dark text-light rounded">
                            <pre
                                className="mb-0 text-light bg-transparent p-0"
                                style={{ fontSize: "0.80rem", overflowX: "auto" }}
                            >
                                <code>{usageSnippet}</code>
                            </pre>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Fragment>
    );
}