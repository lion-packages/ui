import { VariantTypes } from "../../types/VariantTypes.tsx";
import { SizeTypes } from "../../types/SizeTypes.tsx";
import { ButtonTypes } from "../../types/ButtonTypes.tsx";
import { BootstrapButtonStyleTypes } from "../../types/Web/BootstrapButtonStyleTypes.tsx";
import { BootstrapButtonShapeTypes } from "../../types/Web/BootstrapButtonShapeTypes.tsx";
import type { BaseButtonProps } from "./BaseButtonProps.tsx";

export interface BootstrapButtonProps extends BaseButtonProps {
    styleType?: BootstrapButtonStyleTypes;
    shape?: BootstrapButtonShapeTypes;
}

export default function BootstrapButton({
                                            children,
                                            variant = VariantTypes.PRIMARY,
                                            styleType = BootstrapButtonStyleTypes.FILLED,
                                            shape = BootstrapButtonShapeTypes.STANDARD,
                                            size = SizeTypes.MD,
                                            type = ButtonTypes.BUTTON,
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