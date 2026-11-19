import { type ChangeEvent, type SyntheticEvent, useId, useState } from "react";
import { Form } from "react-bootstrap";
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
                                           requiredMessage = "This field is required.",
                                           helperText,
                                           error,
                                           formId,
                                           errorKey,
                                           disabled = false,
                                           readOnly = false,
                                           value,
                                           defaultValue,
                                           onChange,
                                           onInput,
                                           onInvalid,
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

    // Keep layout spacing utilities like mb-3 on the outer field container rather than the input itself
    const containerClasses = [
        "bootstrap-input-container",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const inputClasses = [
        "form-control",
        shape,
        sizeClass,
        variantClass,
        hasError ? "is-invalid" : "",
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

    const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
        e.currentTarget.setCustomValidity("");
        if (onInput) { // @ts-ignore
            onInput(e);
        }
    };

    const handleInvalid = (e: SyntheticEvent<HTMLInputElement>) => {
        if (required) {
            e.currentTarget.setCustomValidity(requiredMessage);
        }
        if (onInvalid) onInvalid(e);
    };

    const currentValue = value !== undefined ? value : internalValue;
    const isFloating = styleType === BootstrapInputStyleTypes.FLOATING;

    return (
        <div className={containerClasses}>
            {!isFloating && label && (
                <Form.Label htmlFor={inputId}>
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </Form.Label>
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
                        onInput={handleInput}
                        onInvalid={handleInvalid}
                        {...rest}
                    />
                    {label && (
                        <Form.Label htmlFor={inputId}>
                            {label}
                            {required && <span className="text-danger ms-1">*</span>}
                        </Form.Label>
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
                    onInput={handleInput}
                    onInvalid={handleInvalid}
                    {...rest}
                />
            )}

            {/* Subtext container for helper text and validation errors */}
            {(helperText || hasError) && (
                <div className="bootstrap-input-subtext-container">
                    {hasError && resolvedErrors.length > 0 ? (
                        <Form.Control.Feedback type="invalid" className="d-block">
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
                        <Form.Control.Feedback type="invalid" className="d-block">
                            {error}
                        </Form.Control.Feedback>
                    ) : helperText ? (
                        <Form.Text className="bootstrap-input-helper-text">{helperText}</Form.Text>
                    ) : null}
                </div>
            )}
        </div>
    );
}