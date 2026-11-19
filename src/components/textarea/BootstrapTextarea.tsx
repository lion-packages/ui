import { type ChangeEvent, useId, useState } from "react";
import { Form } from "react-bootstrap";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { SizeTypes } from "../../types/SizeTypes.tsx";
import { BootstrapInputShapeTypes } from "../../types/Web/BootstrapInputShapeTypes.tsx";
import { BootstrapInputStyleTypes } from "../../types/Web/BootstrapInputStyleTypes.tsx";
import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { useValidationError } from "../../hooks/useValidationError.tsx";
import type { BaseTextareaProps } from "./BaseTextareaProps.tsx";

export interface BootstrapTextareaProps extends BaseTextareaProps {
    styleType?: BootstrapInputStyleTypes;
    shape?: BootstrapInputShapeTypes;
    sizeType?: "sm" | "md" | "lg" | SizeTypes;
    rows?: number;
    counter?: boolean | number;
    maxCounter?: number;
}

export default function BootstrapTextarea({
                                              styleType = BootstrapInputStyleTypes.FLOATING,
                                              shape = BootstrapInputShapeTypes.ROUNDED,
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
                                              id,
                                              name,
                                              className = "",
                                              rows = 3,
                                              maxLength,
                                              counter,
                                              maxCounter,
                                              placeholder = " ",
                                              ...rest
                                          }: BootstrapTextareaProps) {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const { clearFormErrors } = useLionUI();

    const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");

    // Resolve target error key and fetch validation errors via shared hook
    const targetErrorKey = errorKey || name;
    const resolvedErrors = useValidationError(error, formId, targetErrorKey);
    const hasError = resolvedErrors.length > 0 || Boolean(error);

    const sizeClass = sizeType === "sm" ? "form-control-sm" : sizeType === "lg" ? "form-control-lg" : "";
    const variantClass = `bootstrap-variant-${variant}`;

    // Keep outer spacing classes like mb-3 on the wrapper so helper text stays attached to the field
    const containerClasses = [
        "bootstrap-input-container",
        "w-100",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const textareaClasses = [
        "form-control",
        shape,
        sizeClass,
        variantClass,
        hasError ? "is-invalid" : "",
    ]
        .filter(Boolean)
        .join(" ");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInternalValue(e.target.value);

        // Clear form validation error when the user edits the field
        if (formId && targetErrorKey && hasError) {
            clearFormErrors(formId, targetErrorKey);
        }

        if (onChange) onChange(e);
    };

    const currentValue = value !== undefined ? value : internalValue;
    const isFloating = styleType === BootstrapInputStyleTypes.FLOATING;
    const currentLength = String(currentValue || "").length;
    const maxLimit = maxCounter ?? (typeof counter === "number" ? counter : maxLength);
    const isExceeded = maxLimit ? currentLength > maxLimit : false;
    const textareaStyle = { height: rows ? `${rows * 1.5 + 1}rem` : undefined };

    return (
        <div className={containerClasses}>
            {!isFloating && label && (
                <Form.Label htmlFor={textareaId}>
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </Form.Label>
            )}

            {isFloating ? (
                <div className="form-floating">
                    <textarea
                        id={textareaId}
                        name={name}
                        rows={rows}
                        className={textareaClasses}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        maxLength={maxLimit}
                        value={currentValue}
                        onChange={handleChange}
                        style={textareaStyle}
                        {...rest}
                    />
                    {label && (
                        <Form.Label htmlFor={textareaId}>
                            {label}
                            {required && <span className="text-danger ms-1">*</span>}
                        </Form.Label>
                    )}
                </div>
            ) : (
                <textarea
                    id={textareaId}
                    name={name}
                    rows={rows}
                    className={textareaClasses}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                    maxLength={maxLimit}
                    value={currentValue}
                    onChange={handleChange}
                    style={textareaStyle}
                    {...rest}
                />
            )}

            {/* Subtext row keeping helper/error on the left and counter pinned to the right */}
            {(helperText || hasError || counter || maxCounter) && (
                <div className="d-flex flex-row justify-content-between align-items-start gap-2 w-100 mt-1">
                    <div className="flex-grow-1 min-w-0">
                        {hasError && resolvedErrors.length > 0 ? (
                            <Form.Control.Feedback type="invalid" className="d-block mt-0">
                                {resolvedErrors.length === 1 ? (
                                    resolvedErrors[0]
                                ) : (
                                    <ul className="mb-0 ps-3">
                                        {resolvedErrors.map((err, idx) => (
                                            <li key={idx}>{err}</li>
                                        ))}
                                    </ul>
                                )}
                            </Form.Control.Feedback>
                        ) : hasError && typeof error === "string" ? (
                            <Form.Control.Feedback type="invalid" className="d-block mt-0">
                                {error}
                            </Form.Control.Feedback>
                        ) : helperText ? (
                            <Form.Text className="d-block mt-0">{helperText}</Form.Text>
                        ) : null}
                    </div>

                    {(counter || maxCounter) && (
                        <Form.Text
                            className={`flex-shrink-0 text-nowrap mt-0 ${isExceeded ? "text-danger fw-bold" : "text-muted"}`}
                        >
                            {currentLength}{maxLimit ? `/${maxLimit}` : ""}
                        </Form.Text>
                    )}
                </div>
            )}
        </div>
    );
}