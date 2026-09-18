// components/buttons/AndroidButton.tsx
import {type ButtonHTMLAttributes, type ReactNode } from 'react';
import { VariantTypes } from '../../types/VariantTypes';
import { SizeTypes } from '../../types/SizeTypes';
import { ButtonTypes } from '../../types/ButtonTypes';
import { AndroidStyleTypes } from '../../types/Android/AndroidStyleTypes';
import { AndroidShapeTypes } from '../../types/Android/AndroidShapeTypes';

export interface AndroidButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'size'> {
    children?: ReactNode;
    variant?: VariantTypes;
    styleType?: AndroidStyleTypes;
    shape?: AndroidShapeTypes;
    size?: SizeTypes;
    type?: ButtonTypes;
    className?: string;
}

export default function AndroidButton({
                                          children,
                                          variant = VariantTypes.PRIMARY,
                                          styleType = AndroidStyleTypes.FILLED,
                                          shape = AndroidShapeTypes.PILL,
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