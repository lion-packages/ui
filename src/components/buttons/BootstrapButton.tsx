import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { SizeTypes } from "../../types/SizeTypes.tsx";
import { ButtonTypes } from "../../types/ButtonTypes.tsx";
import { BootstrapButtonStyleTypes } from "../../types/Web/BootstrapButtonStyleTypes.tsx";
import { BootstrapButtonShapeTypes } from "../../types/Web/BootstrapButtonShapeTypes.tsx";

export interface BootstrapButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "size"> {
    children?: ReactNode;
    variant?: VariantTypes;
    styleType?: BootstrapButtonStyleTypes;
    shape?: BootstrapButtonShapeTypes;
    size?: SizeTypes;
    type?: ButtonTypes;
    className?: string;
}

export default function BootstrapButton({
                                            children,
                                            variant = "primary" as VariantTypes,
                                            styleType = BootstrapButtonStyleTypes.FILLED,
                                            shape = BootstrapButtonShapeTypes.STANDARD,
                                            size = "md" as SizeTypes,
                                            type = "button" as ButtonTypes,
                                            className = "",
                                            ...props
                                        }: BootstrapButtonProps) {
    // Construct standard Bootstrap button classes
    const stylePrefix = styleType === BootstrapButtonStyleTypes.OUTLINED ? "btn-outline-" : "btn-";
    const variantClass = variant ? `${stylePrefix}${variant}` : "";
    const sizeClass = size && size !== "md" ? `btn-${size}` : "";

    // Mapping custom shape types to Bootstrap utilities or extended CSS
    const shapeClass =
        shape === BootstrapButtonShapeTypes.PILL
            ? "rounded-pill"
            : shape === BootstrapButtonShapeTypes.SQUARE
                ? "rounded-0"
                : "";

    return (
        <button
            type={type}
            className={`btn ${variantClass} ${sizeClass} ${shapeClass} ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
}