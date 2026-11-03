import { type ChangeEvent, type FocusEvent, Fragment, useId, useState } from "react";
import { BootstrapInputShapeTypes } from "../../types/Web/BootstrapInputShapeTypes.tsx";
import { BootstrapInputStyleTypes } from "../../types/Web/BootstrapInputStyleTypes.tsx";
import { SizeTypes } from "../../types/SizeTypes.tsx";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import type { BaseSelectProps } from "./BaseSelectProps.tsx";
import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { useValidationError } from "../../hooks/useValidationError.tsx";

export interface BootstrapSelectProps extends BaseSelectProps {
    styleType?: BootstrapInputStyleTypes;
    shape?: BootstrapInputShapeTypes;
}

export default function BootstrapSelect({
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
                                            options = [],
                                            optionValueKey = "value",
                                            optionLabelKey = "label",
                                            optionDisabledKey = "disabled",
                                            placeholderOption = "Select an option",
                                            disabled = false,
                                            value,
                                            defaultValue,
                                            onChange,
                                            onFocus,
                                            onBlur,
                                            id,
                                            name,
                                            className = "",
                                            ...rest
                                        }: BootstrapSelectProps) {
    const generatedId = useId();
    const selectId = id || generatedId;
    const { clearFormErrors } = useLionUI();

    const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");

    // Resolve target field key and fetch errors using the shared validation hook
    const targetErrorKey = errorKey || name;
    const resolvedErrors = useValidationError(error, formId, targetErrorKey);
    const hasError = resolvedErrors.length > 0 || Boolean(error);

    const sizeClass = sizeType === SizeTypes.SM || sizeType === "sm" ? "form-select-sm" : sizeType === SizeTypes.LG || sizeType === "lg" ? "form-select-lg" : "";
    const variantClass = `bootstrap-variant-${variant}`;

    const selectClasses = [
        "form-select",
        shape,
        sizeClass,
        variantClass,
        hasError ? "is-invalid" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setInternalValue(e.target.value);

        // Automatically clear global form error for this field upon user interaction
        if (formId && targetErrorKey && hasError) {
            clearFormErrors(formId, targetErrorKey);
        }

        if (onChange) onChange(e);
    };

    const handleFocus = (e: FocusEvent<HTMLSelectElement>) => {
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e: FocusEvent<HTMLSelectElement>) => {
        if (onBlur) onBlur(e);
    };

    const currentValue = value !== undefined ? value : internalValue;
    const isFloating = styleType === BootstrapInputStyleTypes.FLOATING;

    const renderOptions = () => (
        <Fragment>
            <option value={""} disabled>
                {placeholderOption}
            </option>
            {options.map((opt, index) => {
                const optionValue = typeof opt === "object" && opt !== null ? opt[optionValueKey] : opt;
                const optionLabel = typeof opt === "object" && opt !== null ? opt[optionLabelKey] : opt;
                const optionDisabled = typeof opt === "object" && opt !== null ? Boolean(opt[optionDisabledKey]) : false;

                return (
                    <option key={optionValue ?? index} value={optionValue} disabled={optionDisabled}>
                        {optionLabel}
                    </option>
                );
            })}
        </Fragment>
    );

    return (
        <div className="mb-3 w-100">
            {!isFloating && label && (
                <label htmlFor={selectId} className="form-label">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}

            {isFloating ? (
                <div className="form-floating">
                    <select
                        id={selectId}
                        name={name}
                        className={selectClasses}
                        disabled={disabled}
                        required={required}
                        value={currentValue}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...rest}
                    >
                        {renderOptions()}
                    </select>
                    {label && (
                        <label htmlFor={selectId}>
                            {label}
                            {required && <span className="text-danger ms-1">*</span>}
                        </label>
                    )}
                </div>
            ) : (
                <select
                    id={selectId}
                    name={name}
                    className={selectClasses}
                    disabled={disabled}
                    required={required}
                    value={currentValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...rest}
                >
                    {renderOptions()}
                </select>
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