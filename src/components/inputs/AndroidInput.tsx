import { type ChangeEvent, type FocusEvent, useId, useState } from "react";
import { InputTypes } from "../../types/InputTypes";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { AndroidInputStyleTypes } from "../../types/Android/AndroidInputStyleTypes.tsx";
import { AndroidInputShapeTypes } from "../../types/Android/AndroidInputShapeTypes.tsx";
import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { useValidationError } from "../../hooks/useValidationError.tsx";
import type { BaseInputProps } from "./BaseInputProps.tsx";

export interface AndroidInputProps extends BaseInputProps {
    styleType?: AndroidInputStyleTypes;
    shape?: AndroidInputShapeTypes;
}

export default function AndroidInput({
                                         type = InputTypes.TEXT,
                                         styleType = AndroidInputStyleTypes.OUTLINED,
                                         shape = AndroidInputShapeTypes.NORMAL,
                                         variant = VariantTypes.PRIMARY,
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
                                         counter,
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
                                         placeholder = " ",
                                         ...rest
                                     }: AndroidInputProps) {
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);

        // Automatically clear global form error for this field upon user interaction
        if (formId && targetErrorKey && hasError) {
            clearFormErrors(formId, targetErrorKey);
        }

        if (onChange) onChange(e);
    };

    const handleFocus = (e: FocusEvent) => {
        setIsFocused(true);
        if (onFocus) { // @ts-ignore
            onFocus(e);
        }
    };

    const handleBlur = (e: FocusEvent) => {
        setIsFocused(false);
        if (onBlur) { // @ts-ignore
            onBlur(e);
        }
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
                    name={name}
                    type={type}
                    value={currentValue}
                    required={required}
                    disabled={disabled}
                    readOnly={readOnly}
                    maxLength={maxLen}
                    placeholder={placeholder}
                    onChange={handleChange}
                    // @ts-ignore
                    onFocus={handleFocus}
                    // @ts-ignore
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

            {(helperText || hasError || counter) && (
                <div className="android-input-subtext-container">
                    {hasError && resolvedErrors.length > 0 ? (
                        <div className="android-input-error-text">
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
                        <div className="android-input-error-text">{error}</div>
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
}