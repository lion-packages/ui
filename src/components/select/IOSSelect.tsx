import React, { useId, useState, type ChangeEvent, type SelectHTMLAttributes } from "react";
import { IOSInputStyleTypes } from "../../types/IOS/IOSInputStyleTypes.tsx";
import { IOSInputShapeTypes } from "../../types/IOS/IOSInputShapeTypes.tsx";

export interface IOSSelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}

export interface IOSSelectProps
    extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "shape"> {
    styleType?: IOSInputStyleTypes;
    shape?: IOSInputShapeTypes;
    variant?: string;
    sizeType?: "sx" | "sm" | "md" | "lg";
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: boolean | string;
    options: IOSSelectOption[];
    placeholderOption?: string;
}

export default function IOSSelect({
                                      styleType = IOSInputStyleTypes.ROUNDED_BORDER,
                                      shape = IOSInputShapeTypes.ROUNDED,
                                      variant = "primary",
                                      sizeType = "md",
                                      label,
                                      required = false,
                                      helperText,
                                      error,
                                      options = [],
                                      placeholderOption = "Select an option",
                                      disabled = false,
                                      value,
                                      defaultValue,
                                      onChange,
                                      onFocus,
                                      onBlur,
                                      id,
                                      className = "",
                                      ...rest
                                  }: IOSSelectProps) {
    const generatedId = useId();
    const selectId = id || generatedId;

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
    ].filter(Boolean).join(" ");

    const wrapperClasses = [
        "ios-input-wrapper",
        `ios-style-${normalizedStyle}`,
        `ios-shape-${normalizedShape}`,
        `ios-size-${sizeType}`,
        isFocused ? "is-focused" : "",
        hasError ? "has-error" : "",
        disabled ? "is-disabled" : "",
    ].filter(Boolean).join(" ");

    const selectClasses = [
        "ios-input-element",
        hasError ? "is-invalid" : "",
    ].filter(Boolean).join(" ");

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setInternalValue(e.target.value);
        if (onChange) onChange(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    const currentValue = value !== undefined ? value : internalValue;

    return (
        <div className={containerClasses}>
            {label && (
                <label htmlFor={selectId} className="ios-input-label">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}

            <div className={wrapperClasses}>
                <select
                    id={selectId}
                    value={currentValue}
                    required={required}
                    disabled={disabled}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={selectClasses}
                    {...rest}
                >
                    <option value="" disabled>
                        {placeholderOption}
                    </option>

                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {hasError ? (
                <div className="ios-input-error-text">{errorMessage}</div>
            ) : helperText ? (
                <div className="ios-input-helper-text">{helperText}</div>
            ) : null}
        </div>
    );
}