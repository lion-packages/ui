import React, { useId, useState } from "react";
import { SizeTypes } from "../../types/SizeTypes.tsx";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { IOSInputStyleTypes } from "../../types/IOS/IOSInputStyleTypes.tsx";
import { IOSInputShapeTypes } from "../../types/IOS/IOSInputShapeTypes.tsx";
import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { useValidationError } from "../../hooks/useValidationError.tsx";
import type { BaseTextareaProps } from "./BaseTextareaProps.tsx";

export interface IOSTextareaProps extends BaseTextareaProps {
    styleType?: IOSInputStyleTypes;
    shape?: IOSInputShapeTypes;
    sizeType?: "sx" | "sm" | "md" | "lg" | SizeTypes;
    counter?: boolean | number;
    maxCounter?: number;
}

export default function IOSTextarea({
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
                                        rows = 3,
                                        maxLength,
                                        counter,
                                        maxCounter,
                                        placeholder,
                                        ...rest
                                    }: IOSTextareaProps) {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const { clearFormErrors } = useLionUI();
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");
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

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInternalValue(e.target.value);

        if (formId && targetErrorKey && hasError) {
            clearFormErrors(formId, targetErrorKey);
        }

        if (onChange) onChange(e);
    };

    const currentValue = value !== undefined ? value : internalValue;
    const currentLength = String(currentValue || "").length;
    const maxLimit = maxCounter ?? (typeof counter === "number" ? counter : maxLength);
    const isExceeded = maxLimit ? currentLength > maxLimit : false;

    return (
        <div className={containerClasses}>
            {label && (
                <label htmlFor={textareaId} className="ios-input-label">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}

            <div className={wrapperClasses}>
                <textarea
                    id={textareaId}
                    name={name}
                    rows={rows}
                    value={currentValue}
                    required={required}
                    disabled={disabled}
                    readOnly={readOnly}
                    maxLength={maxLimit}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="ios-input-element"
                    style={{ height: rows ? `${rows * 1.5 + 1}rem` : undefined }}
                    {...rest}
                />
            </div>

            {(helperText || hasError || counter || maxCounter) && (
                <div className="d-flex justify-content-between align-items-center mt-1">
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

                    {(counter || maxCounter) && (
                        <span className={`ios-input-counter ms-auto ${isExceeded ? "text-danger fw-bold" : "text-muted"}`} style={{ fontSize: "0.8rem" }}>
                            {currentLength}{maxLimit ? `/${maxLimit}` : ""}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}