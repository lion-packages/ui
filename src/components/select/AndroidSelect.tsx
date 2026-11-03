import { type ChangeEvent, type FocusEvent, useId, useState } from "react";
import { AndroidInputStyleTypes } from "../../types/Android/AndroidInputStyleTypes.tsx";
import { AndroidInputShapeTypes } from "../../types/Android/AndroidInputShapeTypes.tsx";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { SizeTypes } from "../../types/SizeTypes.tsx";
import type { BaseSelectProps } from "./SelectProps.tsx";

export interface AndroidSelectProps extends BaseSelectProps {
    styleType?: AndroidInputStyleTypes;
    shape?: AndroidInputShapeTypes;
}

export default function AndroidSelect({
                                          styleType = AndroidInputStyleTypes.OUTLINED,
                                          shape = AndroidInputShapeTypes.NORMAL,
                                          variant = VariantTypes.PRIMARY,
                                          sizeType = SizeTypes.MD,
                                          label,
                                          required = false,
                                          helperText,
                                          error,
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
                                          className = "",
                                          ...rest
                                      }: AndroidSelectProps) {
    const generatedId = useId();
    const selectId = id || generatedId;

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
    ].filter(Boolean).join(" ");

    const selectClasses = [
        "android-input-element",
        hasError ? "is-invalid" : "",
    ].filter(Boolean).join(" ");

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setInternalValue(e.target.value);
        if (onChange) onChange(e);
    };

    const handleFocus = (e: FocusEvent<HTMLSelectElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e: FocusEvent<HTMLSelectElement>) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    const currentValue = value !== undefined ? value : internalValue;
    const hasValueSelected = currentValue !== "" && currentValue !== undefined && currentValue !== null;

    const activeWrapperClasses = [
        wrapperClasses,
        hasValueSelected ? "has-value" : "",
    ].filter(Boolean).join(" ");

    return (
        <div className={containerClasses}>
            <div className={activeWrapperClasses}>
                <select
                    id={selectId}
                    value={currentValue}
                    required={required}
                    disabled={disabled}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={selectClasses}
                    {...rest}
                >
                    <option value="" disabled>
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
                </select>

                {label && (
                    <label htmlFor={selectId} className="android-input-label">
                        {label}
                        {required && <span className="text-danger ms-1">*</span>}
                    </label>
                )}
            </div>

            {(helperText || errorMessage) && (
                <div className="android-input-subtext-container">
                    {hasError ? (
                        <div className="android-input-error-text">{errorMessage}</div>
                    ) : helperText ? (
                        <div className="android-input-helper-text">{helperText}</div>
                    ) : <div />}
                </div>
            )}
        </div>
    );
}