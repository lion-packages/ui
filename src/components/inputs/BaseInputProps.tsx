import { type InputHTMLAttributes, type ReactNode } from "react";
import type { InputTypes } from "../../types/InputTypes";
import type { ValidationErrorStructure } from "../BaseFieldProps.tsx";
import type { VariantTypes } from "../../types/VariantTypes.tsx";
import type { SizeTypes } from "../../types/SizeTypes.tsx";

export interface BaseInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "shape" | "error"> {
    type?: string | InputTypes;
    variant?: string | VariantTypes;
    sizeType?: string | SizeTypes;
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: ValidationErrorStructure;
    formId?: string;       // Form identifier for global context validation matching
    errorKey?: string;     // Fallback key when field name differs from context payload
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    prefixText?: string;
    suffixText?: string;
    counter?: boolean | number;
    clearable?: boolean;
}