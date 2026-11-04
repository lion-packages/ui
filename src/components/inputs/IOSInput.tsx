import React, { useId, useState } from "react";
import { InputTypes } from "../../types/InputTypes";
import { SizeTypes } from "../../types/SizeTypes.tsx";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { IOSInputStyleTypes } from "../../types/IOS/IOSInputStyleTypes.tsx";
import { IOSInputShapeTypes } from "../../types/IOS/IOSInputShapeTypes.tsx";
import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { useValidationError } from "../../hooks/useValidationError.tsx";
import type { BaseInputProps } from "./BaseInputProps.tsx";

export interface IOSInputProps extends BaseInputProps {
    styleType?: IOSInputStyleTypes;
    shape?: IOSInputShapeTypes;
    sizeType?: "sx" | "sm" | "md" | "lg" | SizeTypes;
}

export default function IOSInput({
                                     type = InputTypes.TEXT,
                                     styleType = IOSInputStyleTypes.ROUNDED_BORDER,
                                     shape = IOSInputShapeTypes.ROUNDED,
                                     variant = VariantTypes.PRIMARY,
                                     sizeType = SizeTypes.MD,
                                     label,
                                     required = false,
                                     helperText,
                                     error,
                                     formId,
                                     errorKey,
                                     startIcon,
                                     endIcon,
                                     prefixText,
                                     suffixText,
                                     clearable = false,
                                     disabled = false,
                                     readOnly = false,
                                     value,
                                     defaultValue,
                                     onChange,
                                     onFocus,
                                     onBlur,
                                     id,
                                     name,
                                     className = "",
                                     maxLength,
                                     placeholder,
                                     ...rest
                                 }: IOSInputProps) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const { clearFormErrors } = useLionUI();

    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");

    // Resolve target error key and fetch validation errors via shared hook
    const targetErrorKey = errorKey || name;
    const resolvedErrors = useValidationError(error, formId, targetErrorKey);
    const hasError = resolvedErrors.length > 0 || Boolean(error);

    const normalizedStyle = String(styleType).toLowerCase().replace(/_/g, "-");
    const normalizedShape = String(shape).toLowerCase();

    const containerClasses = [
        "ios-input-container",
        `ios-variant-${variant}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const wrapperClasses = [
        "ios-input-wrapper",
        `ios-style-${normalizedStyle}`,
        `ios-shape-${normalizedShape}`,
        `ios-size-${sizeType}`,
        isFocused ? "is-focused" : "",
        hasError ? "has-error" : "",
        disabled ? "is-disabled" : "",
        readOnly ? "is-readonly" : "",
    ]
        .filter(Boolean)
        .join(" ");

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);

        if (formId && targetErrorKey && hasError) {
            clearFormErrors(formId, targetErrorKey);
        }

        if (onChange) onChange(e);
    };

    const handleClear = () => {
        setInternalValue("");
        if (onChange) {
            const event = {
                target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(event);
        }
    };

    const currentValue = value !== undefined ? value : internalValue;

    return (
        <div className={containerClasses}>
            {label && (
                <label htmlFor={inputId} className="ios-input-label">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}

            <div className={wrapperClasses}>
                {startIcon && <div className="ios-input-icon-left">{startIcon}</div>}
                {prefixText && <span className="input-prefix">{prefixText}</span>}

                <input
                    id={inputId}
                    name={name}
                    type={type}
                    value={currentValue}
                    required={required}
                    disabled={disabled}
                    readOnly={readOnly}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="ios-input-element"
                    {...rest}
                />

                {clearable && Boolean(currentValue) && !disabled && !readOnly && (
                    <button
                        type="button"
                        className="ios-clear-button"
                        onClick={handleClear}
                        tabIndex={-1}
                    >
                        <i className="bi bi-x"></i>
                    </button>
                )}

                {suffixText && <span className="input-suffix">{suffixText}</span>}
                {endIcon && <div className="ios-input-icon-right">{endIcon}</div>}
            </div>

            {(helperText || hasError) && (
                <div>
                    {hasError && resolvedErrors.length > 0 ? (
                        <div className="ios-input-error-text">
                            {resolvedErrors.length === 1 ? (
                                resolvedErrors[0]
                            ) : (
                                <ul className="mb-0 ps-3">
                                    {resolvedErrors.map((err, idx) => (
                                        <li key={idx}>{err}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : typeof error === "string" ? (
                        <div className="ios-input-error-text">{error}</div>
                    ) : helperText ? (
                        <div className="ios-input-helper-text">{helperText}</div>
                    ) : null}
                </div>
            )}
        </div>
    );
}