import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Button } from "react-bootstrap";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { ButtonTypes } from "../../types/ButtonTypes.tsx";

export interface LionModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: VariantTypes | string;
    type?: ButtonTypes | "button" | "submit" | "reset";
    className?: string;
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