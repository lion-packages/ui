import React from "react";
import {Platform} from "../../types/Platform.tsx";
import {Variant} from "../../types/Variant.tsx";
import {Size} from "../../types/Size.tsx";
import "../../assets/button-android.css";

const colors = {
    secondary: "--bs-white",
    primary: "--bs-white",
    success: "--bs-white",
    danger: "--bs-white",
    warning: "--bs-white",
    info: "--bs-white",
    light: "--bs-dark",
    dark: "--bs-white",
    "lion-red": "--bs-white",
    "lion-orange": "--bs-white",
} as const;

interface AndroidButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant: Variant;
    size?: Size;
    platform?: Platform;
}

export default function AndroidButton({
                                          children,
                                          variant,
                                          size = "md",
                                          className = "",
                                          platform = "web",
                                          style,
                                          ...props
                                      }: AndroidButtonProps) {
    const background =
        platform === "web"
            ? `var(--bs-${variant})`
            : `var(--bg-${variant})`;

    const color = `var(${colors[variant] ?? "--bs-black"})`;

    return (
        <button
            className={`android-btn-filled android-btn-${size} ${className}`}
            style={{
                backgroundColor: background,
                color,
                ...style,
            }}
            {...props}
        >
            {children}
            <span className="ripple" />
        </button>
    );
}