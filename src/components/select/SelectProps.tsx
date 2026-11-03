import { type SelectHTMLAttributes } from "react";
import type { VariantTypes } from "../../types/VariantTypes.tsx";
import type { SizeTypes } from "../../types/SizeTypes.tsx";

export interface BaseSelectProps
    extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "shape"> {
    variant?: VariantTypes | string;
    sizeType?: SizeTypes | string;
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: boolean | string;
    options: any[];
    optionValueKey?: string;
    optionLabelKey?: string;
    optionDisabledKey?: string;
    placeholderOption?: string;
}