import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";

export interface LoadingAppProps {
    variant?: string;
    appName?: string;
    loadingText?: string;
    className?: string;
}

export default function LoadingApp({
                                       variant = "primary",
                                       appName = import.meta.env.VITE_APP_NAME ?? "Lion App",
                                       loadingText = "Preparing experience",
                                       className = "",
                                   }: LoadingAppProps) {
    const [dots, setDots] = useState<string>("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((previousDots) => (previousDots.length >= 3 ? "" : previousDots + "."));
        }, 400);

        return () => clearInterval(interval);
    }, []);

    const variantClass = `loading-app-variant-${variant}`;
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
        variantClass,
        className,
    ].filter(Boolean).join(" ");

    return (
        <div
            className={combinedContainerClasses}
        >
            <div className={"loading-glass-card d-flex flex-column align-items-center text-center gap-3"}>
                <div className={"position-relative d-flex justify-content-center align-items-center"}>
                    <div className={"spinner-glow"} />

                    <Spinner
                        animation={"border"}
                        role={"status"}
                        style={{
                            width: "4.5rem",
                            height: "4.5rem",
                            borderWidth: "4px",
                            color: "#ffffff",
                        }}
                    >
                        <span className={"visually-hidden"}>Loading...</span>
                    </Spinner>
                </div>

                <div className={"mt-2"}>
                    <h2
                        className={"fw-bold mb-1 fs-4"}
                        style={{ color: "#ffffff" }}
                    >
                        {appName}
                        <span
                            style={{
                                display: "inline-block",
                                width: "20px",
                                textAlign: "left",
                                color: "#ffffff",
                            }}
                        >
                            {dots}
                        </span>
                    </h2>

                    <p
                        className={"text-uppercase mb-0 small"}
                        style={{
                            letterSpacing: "2px",
                            color: "rgba(255, 255, 255, 0.75)",
                        }}
                    >
                        {loadingText}
                    </p>
                </div>
            </div>
        </div>
    );
}