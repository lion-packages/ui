import { type ChangeEvent, type SelectHTMLAttributes, useId, useState } from "react";
import { BootstrapInputShapeTypes } from "../../types/Web/BootstrapInputShapeTypes.tsx";
import { BootstrapInputStyleTypes } from "../../types/Web/BootstrapInputStyleTypes.tsx";
import { SizeTypes } from "../../types/SizeTypes.tsx";
import { VariantTypes } from "../../types/VariantTypes.tsx";

export interface BootstrapSelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}

export interface BootstrapSelectProps
    extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "shape"> {
        styleType?: BootstrapInputStyleTypes;
        shape?: BootstrapInputShapeTypes;
        variant?: string;
        sizeType?: "sm" | "lg" | SizeTypes;
        label?: string;
        required?: boolean;
        helperText?: string;
        error?: boolean | string;
        options: BootstrapSelectOption[];
        placeholderOption?: string;
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
                                            options = [],
                                            placeholderOption = "Select an option",
                                            disabled = false,
                                            value,
                                            defaultValue,
                                            onChange,
                                            id,
                                            className = "",
                                            ...rest
                                        }: BootstrapSelectProps) {
    const generatedId = useId();
    const selectId = id || generatedId;

    const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");

    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;

    const sizeClass = sizeType === "sm" ? "form-select-sm" : sizeType === "lg" ? "form-select-lg" : "";
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
        if (onChange) onChange(e);
    };

    const currentValue = value !== undefined ? value : internalValue;
    const isFloating = styleType === BootstrapInputStyleTypes.FLOATING;

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
                        className={selectClasses}
                        disabled={disabled}
                        required={required}
                        value={currentValue}
                        onChange={handleChange}
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
                    className={selectClasses}
                    disabled={disabled}
                    required={required}
                    value={currentValue}
                    onChange={handleChange}
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
            )}

            {hasError ? (
                <div className="invalid-feedback d-block">{errorMessage}</div>
            ) : helperText ? (
                <div className="form-text">{helperText}</div>
            ) : null}
        </div>
    );
}