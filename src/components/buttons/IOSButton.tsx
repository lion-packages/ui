import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { VariantTypes } from "../../types/VariantTypes";
import { SizeTypes } from "../../types/SizeTypes";
import { ButtonTypes } from "../../types/ButtonTypes";
import { IOSStyleTypes } from "../../types/IOS/IOSStyleTypes";
import { IOSShapeTypes } from "../../types/IOS/IOSShapeTypes";

export interface IOSButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "size"> {
    children?: ReactNode;
    variant?: VariantTypes;
    styleType?: IOSStyleTypes;
    shape?: IOSShapeTypes;
    size?: SizeTypes;
    type?: ButtonTypes;
    className?: string;
}

export default function IOSButton({
                                      children,
                                      variant = VariantTypes.PRIMARY,
                                      styleType = IOSStyleTypes.FILLED,
                                      shape = IOSShapeTypes.ROUNDED,
                                      size = SizeTypes.MD,
                                      type = ButtonTypes.BUTTON,
                                      className = "",
                                      ...props
                                  }: IOSButtonProps) {
    // Construct dynamic iOS class names
    const styleClass = `ios-btn-${styleType}`;
    const shapeClass = `ios-btn-${shape}`;
    const variantClass = variant ? `btn-${variant}` : "";

    return (
        <button
            type={type}
            className={`ios-btn ios-btn-${size} ${styleClass} ${shapeClass} ${variantClass} ${className}`.trim()}
            {...props}
        >
            <span className="ios-btn-content">{children}</span>
        </button>
    );
}