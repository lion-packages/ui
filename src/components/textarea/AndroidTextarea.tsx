import { type ChangeEvent, useId, useState } from "react";
import { Form } from "react-bootstrap";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { AndroidInputStyleTypes } from "../../types/Android/AndroidInputStyleTypes.tsx";
import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { useValidationError } from "../../hooks/useValidationError.tsx";
import type { BaseTextareaProps } from "./BaseTextareaProps.tsx";
import { AndroidInputShapeTypes } from "../../types/Android/AndroidInputShapeTypes.tsx";

export interface AndroidTextareaProps extends BaseTextareaProps {
    styleType?: AndroidInputStyleTypes;
    shape?: AndroidInputShapeTypes;
    counter?: boolean | number;
    maxCounter?: number;
}

export default function AndroidTextarea({
                                            styleType = AndroidInputStyleTypes.OUTLINED,
                                            shape = AndroidInputShapeTypes.NORMAL,
                                            variant = VariantTypes.PRIMARY,
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
                                            placeholder = " ",
                                            ...rest
                                        }: AndroidTextareaProps) {
    const generatedId = useId();
    const textareaId = id || generatedId;
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

    const textareaClasses = [
        "android-input-element",
        hasError ? "is-invalid" : "",
    ].filter(Boolean).join(" ");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInternalValue(e.target.value);

        // Clear form validation error when the user edits the field
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
                    onFocus={(e) => { setIsFocused(true); if (onFocus) onFocus(e); }}
                    onBlur={(e) => { setIsFocused(false); if (onBlur) onBlur(e); }}
                    className={textareaClasses}
                    style={{ height: rows ? `${rows * 1.5 + 1}rem` : undefined }}
                    {...rest}
                />

                {label && (
                    <Form.Label htmlFor={textareaId} className="android-input-label">
                        {label}
                        {required && <span className="text-danger ms-1">*</span>}
                    </Form.Label>
                )}
            </div>

            {/* Subtext row keeping helper/error on the left and counter pinned to the right */}
            {(helperText || hasError || counter || maxCounter) && (
                <div className="android-input-subtext-container d-flex flex-row align-items-start justify-content-between gap-2 w-100">
                    <div className="flex-grow-1 min-w-0">
                        {hasError && resolvedErrors.length > 0 ? (
                            <div className="android-input-error-text">
                                {resolvedErrors.length === 1 ? resolvedErrors[0] : (
                                    <ul className="mb-0 ps-3">
                                        {resolvedErrors.map((err, idx) => (<li key={idx}>{err}</li>))}
                                    </ul>
                                )}
                            </div>
                        ) : hasError && typeof error === "string" ? (
                            <div className="android-input-error-text">{error}</div>
                        ) : helperText ? (
                            <div className="android-input-helper-text">{helperText}</div>
                        ) : null}
                    </div>

                    {(counter || maxCounter) && (
                        <span className={`android-input-counter flex-shrink-0 text-nowrap ${isExceeded ? "text-danger fw-bold" : ""}`}>
                            {currentLength}{maxLimit ? `/${maxLimit}` : ""}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}