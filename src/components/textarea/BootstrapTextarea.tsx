import { type ChangeEvent, useId, useState } from "react";
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
    const targetErrorKey = errorKey || name;
    const resolvedErrors = useValidationError(error, formId, targetErrorKey);
    const hasError = resolvedErrors.length > 0 || Boolean(error);

    const sizeClass = sizeType === "sm" ? "form-control-sm" : sizeType === "lg" ? "form-control-lg" : "";
    const variantClass = `bootstrap-variant-${variant}`;

    const textareaClasses = [
        "form-control",
        shape,
        sizeClass,
        variantClass,
        hasError ? "is-invalid" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInternalValue(e.target.value);

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
        <div className="mb-3 w-100">
            {!isFloating && label && (
                <label htmlFor={textareaId} className="form-label">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
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
                        <label htmlFor={textareaId}>
                            {label}
                            {required && <span className="text-danger ms-1">*</span>}
                        </label>
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

            {(helperText || hasError || counter || maxCounter) && (
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        {hasError && resolvedErrors.length > 0 ? (
                            <div className="invalid-feedback d-block">
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
                            <div className="invalid-feedback d-block">{error}</div>
                        ) : helperText ? (
                            <div className="form-text">{helperText}</div>
                        ) : null}
                    </div>

                    {(counter || maxCounter) && (
                        <small className={`form-text ms-auto ${isExceeded ? "text-danger fw-bold" : "text-muted"}`}>
                            {currentLength}{maxLimit ? `/${maxLimit}` : ""}
                        </small>
                    )}
                </div>
            )}
        </div>
    );
}