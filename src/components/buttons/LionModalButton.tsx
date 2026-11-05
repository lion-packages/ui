import { type ReactNode } from "react";
import { Button } from "react-bootstrap";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { ButtonTypes } from "../../types/ButtonTypes.tsx";
import type { BaseButtonProps } from "./BaseButtonProps.tsx";

export interface LionModalButtonProps extends BaseButtonProps {
    children: ReactNode;
}

export default function LionModalButton({
                                            children,
                                            variant = VariantTypes.MODAL,
                                            type = ButtonTypes.BUTTON,
                                            className = "",
                                            onClick,
                                            disabled = false,
                                            ...rest
                                        }: LionModalButtonProps) {
    const combinedClasses = [
        "btn-modal",
        "flex-fill",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        // @ts-ignore
        <Button
            type={type}
            variant={variant}
            className={combinedClasses}
            onClick={onClick}
            disabled={disabled}
            {...rest}
        >
            {children}
        </Button>
    );
}