import { VariantTypes } from '../../types/VariantTypes';
import { SizeTypes } from '../../types/SizeTypes';
import { ButtonTypes } from '../../types/ButtonTypes';
import { AndroidButtonStyleTypes } from '../../types/Android/AndroidButtonStyleTypes.tsx';
import { AndroidButtonShapeTypes } from '../../types/Android/AndroidButtonShapeTypes.tsx';
import type { BaseButtonProps } from "./BaseButtonProps.tsx";

export interface AndroidButtonProps extends BaseButtonProps {
    styleType?: AndroidButtonStyleTypes;
    shape?: AndroidButtonShapeTypes;
}

export default function AndroidButton({
                                          children,
                                          variant = VariantTypes.PRIMARY,
                                          styleType = AndroidButtonStyleTypes.FILLED,
                                          shape = AndroidButtonShapeTypes.PILL,
                                          size = SizeTypes.MD,
                                          type = ButtonTypes.BUTTON,
                                          className = "",
                                          ...props
                                      }: AndroidButtonProps) {
    const styleClass = `android-btn-${styleType}`;
    const shapeClass = `android-btn-${shape}`;
    const variantClass = variant ? `btn-${variant}` : "";

    return (
        <button
            type={type}
            className={`android-btn android-btn-${size} ${styleClass} ${shapeClass} ${variantClass} ${className}`.trim()}
            {...props}
        >
            {children}
            <span className="ripple" />
        </button>
    );
}