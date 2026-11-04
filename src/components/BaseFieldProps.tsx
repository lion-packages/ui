import { type HTMLAttributes } from "react";
import type { VariantTypes } from "../types/VariantTypes.tsx";
import type { SizeTypes } from "../types/SizeTypes.tsx";

export type ValidationErrorStructure =
    | string
    | boolean
    | Array<Record<string, string[]>>
    | Record<string, string[]>;

export interface BaseFieldProps
    extends Omit<HTMLAttributes<HTMLElement>, "size"> {
    variant?: VariantTypes | string;
    sizeType?: SizeTypes | string;
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: ValidationErrorStructure;
    formId?: string;       // Global form ID for context error matching
    errorKey?: string;     // Specific error property fallback (defaults to 'name')
}