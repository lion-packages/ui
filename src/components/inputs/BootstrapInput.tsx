import React, { useId } from "react";
import { InputTypes } from "../../types/InputTypes";
import {BootstrapInputShapeTypes} from "../../types/Web/BootstrapInputShapeTypes.tsx";
import {BootstrapInputStyleTypes} from "../../types/Web/BootstrapInputStyleTypes.tsx";

export interface BootstrapInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "shape"> {
    type?: InputTypes;
    styleType?: BootstrapInputStyleTypes;
    shape?: BootstrapInputShapeTypes;
    variant?: string;
    sizeType?: "sm" | "md" | "lg";
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: boolean | string;
}

export function BootstrapInput({
                                   type = InputTypes.TEXT,
                                   styleType = BootstrapInputStyleTypes.FLOATING,
                                   shape = BootstrapInputShapeTypes.ROUNDED,
                                   variant = "primary",
                                   sizeType = "md",
                                   label,
                                   required = false,
                                   helperText,
                                   error,
                                   disabled = false,
                                   readOnly = false,
                                   id,
                                   className = "",
                                   placeholder = " ",
                                   ...rest
                               }: BootstrapInputProps) {
    const generatedId = useId();
    const inputId = id || generatedId;

    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;

    const sizeClass = sizeType === "sm" ? "form-control-sm" : sizeType === "lg" ? "form-control-lg" : "";
    const variantClass = `bootstrap-variant-${variant}`;

    const inputClasses = [
        "form-control",
        shape,
        sizeClass,
        variantClass,
        hasError ? "is-invalid" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const isFloating = styleType === BootstrapInputStyleTypes.FLOATING;

    return (
        <div className="mb-3 w-100">
            {!isFloating && label && (
                <label htmlFor={inputId} className="form-label">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}

            {isFloating ? (
                <div className="form-floating">
                    <input
                        id={inputId}
                        type={type}
                        className={inputClasses}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        {...rest}
                    />
                    {label && (
                        <label htmlFor={inputId}>
                            {label}
                            {required && <span className="text-danger ms-1">*</span>}
                        </label>
                    )}
                </div>
            ) : (
                <input
                    id={inputId}
                    type={type}
                    className={inputClasses}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                    {...rest}
                />
            )}

            {hasError ? (
                <div className="invalid-feedback d-block">{errorMessage}</div>
            ) : helperText ? (
                <div className="form-text">{helperText}</div>
            ) : null}
        </div>
    );
}

export default BootstrapInput;