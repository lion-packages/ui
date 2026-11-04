import { type ChangeEvent, useId, useState } from "react";
import { InputTypes } from "../../types/InputTypes";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { SizeTypes } from "../../types/SizeTypes.tsx";
import { BootstrapInputShapeTypes } from "../../types/Web/BootstrapInputShapeTypes.tsx";
import { BootstrapInputStyleTypes } from "../../types/Web/BootstrapInputStyleTypes.tsx";
import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { useValidationError } from "../../hooks/useValidationError.tsx";
import type { BaseInputProps } from "./BaseInputProps.tsx";

export interface BootstrapInputProps extends BaseInputProps {
    styleType?: BootstrapInputStyleTypes;
    shape?: BootstrapInputShapeTypes;
    sizeType?: "sm" | "md" | "lg" | SizeTypes;
}

export default function BootstrapInput({
                                           type = InputTypes.TEXT,
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
                                           placeholder = " ",
                                           ...rest
                                       }: BootstrapInputProps) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const { clearFormErrors } = useLionUI();

    const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");

    // Resolve target error key and fetch validation errors via shared hook
    const targetErrorKey = errorKey || name;
    const resolvedErrors = useValidationError(error, formId, targetErrorKey);
    const hasError = resolvedErrors.length > 0 || Boolean(error);

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);

        if (formId && targetErrorKey && hasError) {
            clearFormErrors(formId, targetErrorKey);
        }

        if (onChange) onChange(e);
    };

    const currentValue = value !== undefined ? value : internalValue;
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
                        name={name}
                        type={type}
                        className={inputClasses}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        value={currentValue}
                        onChange={handleChange}
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
                    name={name}
                    type={type}
                    className={inputClasses}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                    value={currentValue}
                    onChange={handleChange}
                    {...rest}
                />
            )}

            {(helperText || hasError) && (
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
            )}
        </div>
    );
}