import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { PlatformTypes } from "../../types/PlatformTypes.tsx";

export interface LoadingAppProps {
    variant?: string;
    appName?: string;
    loadingText?: string;
    platform?: PlatformTypes | string;
    className?: string;
}

export default function LoadingApp({
                                       variant = "primary",
                                       appName = import.meta.env.VITE_APP_NAME ?? "Lion App",
                                       loadingText = "Preparing experience",
                                       platform = undefined,
                                       className = "",
                                   }: LoadingAppProps) {
    const { state } = useLionUI();

    // Explicit priority: prop first, fallback to context state, fallback to WEB
    const activePlatform = platform ?? state.platform ?? PlatformTypes.WEB;

    const [dots, setDots] = useState<string>("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((previousDots) => (previousDots.length >= 3 ? "" : previousDots + "."));
        }, 400);

        return () => clearInterval(interval);
    }, []);

    // Explicit and unambiguous platform evaluations
    const isAndroid = activePlatform === PlatformTypes.ANDROID;
    const isIOS = activePlatform === PlatformTypes.IOS;
    const isWeb = activePlatform === PlatformTypes.WEB;

    const variantClass = `loading-app-variant-${variant}`;
    const platformContainerClass = isAndroid
        ? "android-loading-container"
        : isIOS
            ? "ios-loading-container"
            : "web-loading-container";

    const combinedContainerClasses = [
        "d-flex",
        "justify-content-center",
        "align-items-center",
        "position-fixed",
        "top-0",
        "start-0",
        "w-100",
        "h-100",
        "loading-app-container",
        platformContainerClass,
        isWeb ? variantClass : "",
        className,
    ].filter(Boolean).join(" ");

    return (
        <div className={combinedContainerClasses}>
            {/* --- WEB LAYOUT (Immersive Radial Gradient) --- */}
            {isWeb && (
                <div className={"loading-glass-card d-flex flex-column align-items-center text-center gap-3"}>
                    <div className={"position-relative d-flex justify-content-center align-items-center"}>
                        <div className={"spinner-glow"} />
                        <Spinner
                            animation={"border"}
                            role={"status"}
                            style={{ width: "4.5rem", height: "4.5rem", borderWidth: "4px", color: "#ffffff" }}
                        >
                            <span className={"visually-hidden"}>Loading...</span>
                        </Spinner>
                    </div>

                    <div className={"mt-2"}>
                        <h2 className={"fw-bold mb-1 fs-4 text-white"}>
                            {appName}
                            <span style={{ display: "inline-block", width: "20px", textAlign: "left" }}>
                                {dots}
                            </span>
                        </h2>
                        <p className={"text-uppercase mb-0 small text-white-50"} style={{ letterSpacing: "2px" }}>
                            {loadingText}
                        </p>
                    </div>
                </div>
            )}

            {/* --- ANDROID LAYOUT (Material Design 3 Surface with Spinner Loader) --- */}
            {isAndroid && (
                <div className={"android-loading-card d-flex flex-column align-items-center text-center p-4 rounded-4 shadow-lg"}>
                    <div className="mb-3 position-relative">
                        <Spinner
                            animation="border"
                            role="status"
                            className={`text-${variant}`}
                            style={{ width: "3rem", height: "3rem", borderWidth: "3px" }}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                    <div>
                        <h4 className={"fw-medium mb-1 text-dark fs-5"}>
                            {appName}{dots}
                        </h4>
                        <p className={"text-muted small mb-0"}>
                            {loadingText}
                        </p>
                    </div>
                </div>
            )}

            {/* --- IOS LAYOUT (Cupertino Blur & Minimalist Indicator) --- */}
            {isIOS && (
                <div className={"ios-loading-card d-flex flex-column align-items-center text-center p-4 rounded-5 shadow"}>
                    <div className="mb-3">
                        <Spinner
                            animation="border"
                            role="status"
                            className="text-secondary"
                            style={{ width: "2.5rem", height: "2.5rem", borderWidth: "2.5px" }}
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                    <div>
                        <h5 className={"fw-semibold mb-1 text-dark fs-6"} style={{ letterSpacing: "-0.3px" }}>
                            {appName}{dots}
                        </h5>
                        <p className={"text-secondary small mb-0"} style={{ fontSize: "0.825rem" }}>
                            {loadingText}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}