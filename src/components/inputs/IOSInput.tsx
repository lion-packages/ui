import React, { useId, useState } from "react";
import { InputTypes } from "../../types/InputTypes";
import { iOSInputStyleTypes } from "../../types/IOS/iOSInputStyleTypes.tsx";
import { iOSInputShapeTypes } from "../../types/IOS/iOSInputShapeTypes.tsx";

export interface IOSInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "shape"> {
    type?: InputTypes;
    styleType?: iOSInputStyleTypes;
    shape?: iOSInputShapeTypes;
    variant?: string;
    sizeType?: "sx" | "sm" | "md" | "lg";
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: boolean | string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    prefixText?: string;
    suffixText?: string;
    clearable?: boolean;
}

export function IOSInput({
                             type = InputTypes.TEXT,
                             styleType = iOSInputStyleTypes.ROUNDED_BORDER,
                             shape = iOSInputShapeTypes.ROUNDED,
                             variant = "primary",
                             sizeType = "md",
                             label,
                             required = false,
                             helperText,
                             error,
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
                             className = "",
                             maxLength,
                             placeholder,
                             ...rest
                         }: IOSInputProps) {
    const generatedId = useId();
    const inputId = id || generatedId;

    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");

    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;

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
                        ✕
                    </button>
                )}

                {suffixText && <span className="input-suffix">{suffixText}</span>}
                {endIcon && <div className="ios-input-icon-right">{endIcon}</div>}
            </div>

            {hasError ? (
                <div className="ios-input-error-text">{errorMessage}</div>
            ) : helperText ? (
                <div className="ios-input-helper-text">{helperText}</div>
            ) : null}
        </div>
    );
}

export default IOSInput;