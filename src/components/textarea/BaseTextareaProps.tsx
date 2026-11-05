import { type TextareaHTMLAttributes } from "react";
import type { BaseFieldProps } from "../BaseFieldProps.tsx";

export interface BaseTextareaProps
    extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "shape" | "error">,
        BaseFieldProps {
    rows?: number;
    cols?: number;
    resize?: "none" | "both" | "horizontal" | "vertical";
}