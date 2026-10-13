import React, { useId, useState } from "react";
import { InputTypes } from "../../types/InputTypes";
import { AndroidInputStyleTypes } from "../../types/Android/AndroidInputStyleTypes.tsx";
import { AndroidInputShapeTypes } from "../../types/Android/AndroidInputShapeTypes.tsx";

export interface AndroidInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "shape"> {
    type?: InputTypes;
    styleType?: AndroidInputStyleTypes;
    shape?: AndroidInputShapeTypes;
    variant?: string;
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: boolean | string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    prefixText?: string;
    suffixText?: string;
    counter?: boolean | number;
}

export const AndroidInput: React.FC<AndroidInputProps> = ({
                                                              type = InputTypes.TEXT,
                                                              styleType = AndroidInputStyleTypes.OUTLINED,
                                                              shape = AndroidInputShapeTypes.NORMAL,
                                                              variant = "primary",
                                                              label,
                                                              required = false,
                                                              helperText,
                                                              error,
                                                              startIcon,
                                                              endIcon,
                                                              prefixText,
                                                              suffixText,
                                                              counter,
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
                                                              placeholder = " ",
                                                              ...rest
                                                          }) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");

    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;

    const normalizedStyle = String(styleType).toLowerCase().replace(/_/g, "-");
    const normalizedShape = String(shape).toLowerCase();

    const containerClasses = [
        "android-input-container",
        `android-variant-${variant}`,
        className,
    ].filter(Boolean).join(" ");

    const wrapperClasses = [
        "android-input-field-wrapper",
        `android-style-${normalizedStyle}`,
        `android-size-${normalizedShape}`,
        isFocused ? "is-focused" : "",
        hasError ? "has-error" : "",
        disabled ? "is-disabled" : "",
        readOnly ? "is-readonly" : "",
    ].filter(Boolean).join(" ");

    const inputClasses = [
        "android-input-element",
        hasError ? "is-invalid" : "",
    ].filter(Boolean).join(" ");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        if (onChange) onChange(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    const currentValue = value !== undefined ? value : internalValue;
    const currentLength = String(currentValue || "").length;
    const maxLen = typeof counter === "number" ? counter : maxLength;

    return (
        <div className={containerClasses}>
            <div className={wrapperClasses}>
                {startIcon && <div className="android-input-start-icon">{startIcon}</div>}
                {prefixText && <span className="android-input-prefix">{prefixText}</span>}

                <input
                    id={inputId}
                    type={type}
                    value={currentValue}
                    required={required}
                    disabled={disabled}
                    readOnly={readOnly}
                    maxLength={maxLen}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={inputClasses}
                    {...rest}
                />

                {label && (
                    <label htmlFor={inputId} className="android-input-label">
                        {label}
                        {required && <span className="text-danger ms-1">*</span>}
                    </label>
                )}

                {suffixText && <span className="android-input-suffix">{suffixText}</span>}
                {endIcon && <div className="android-input-end-icon">{endIcon}</div>}
            </div>

            {(helperText || errorMessage || counter) && (
                <div className="android-input-subtext-container">
                    {hasError ? (
                        <div className="android-input-error-text">{errorMessage}</div>
                    ) : helperText ? (
                        <div className="android-input-helper-text">{helperText}</div>
                    ) : <div />}

                    {counter && (
                        <span className="android-input-counter">
                            {currentLength}{maxLen ? `/${maxLen}` : ""}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default AndroidInput;