import { VariantTypes } from "../../types/VariantTypes";
import { SizeTypes } from "../../types/SizeTypes";
import { ButtonTypes } from "../../types/ButtonTypes";
import { IOSButtonStyleTypes } from "../../types/IOS/IOSButtonStyleTypes.tsx";
import { IOSButtonShapeTypes } from "../../types/IOS/IOSButtonShapeTypes.tsx";
import type { BaseButtonProps } from "./BaseButtonProps.tsx";

export interface IOSButtonProps extends BaseButtonProps {
    styleType?: IOSButtonStyleTypes;
    shape?: IOSButtonShapeTypes;
}

export default function IOSButton({
                                      children,
                                      variant = VariantTypes.PRIMARY,
                                      styleType = IOSButtonStyleTypes.FILLED,
                                      shape = IOSButtonShapeTypes.ROUNDED,
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