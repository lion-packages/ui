import { type ButtonHTMLAttributes, type ReactNode } from "react";
import type { VariantTypes } from "../../types/VariantTypes";
import type { SizeTypes } from "../../types/SizeTypes";
import type { ButtonTypes } from "../../types/ButtonTypes";

export interface BaseButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "size"> {
    children?: ReactNode;
    variant?: VariantTypes | string;
    size?: SizeTypes | "sm" | "md" | "lg";
    type?: ButtonTypes | "button" | "reset" | "submit";
    className?: string;
    disabled?: boolean;
}