import type { BaseFieldProps } from "../BaseFieldProps.tsx";

export interface BaseSelectProps extends BaseFieldProps {
    options: any[];
    optionValueKey?: string;
    optionLabelKey?: string;
    optionDisabledKey?: string;
    placeholderOption?: string;
}