import React, {useId} from "react";
import {InputTypes} from "../../types/InputTypes";
import type {AndroidInputStyleTypes} from "../../types/Android/AndroidInputStyleTypes.tsx";
import type {AndroidInputShapeTypes} from "../../types/Android/AndroidInputShapeTypes.tsx";

export interface AndroidInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "shape"> {
    type?: InputTypes;
    styleType?: AndroidInputStyleTypes;
    shape?: AndroidInputShapeTypes;
    variant?: string;
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: boolean | string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    prefixText?: string;
    suffixText?: string;
    counter?: boolean | number;
}

export const AndroidInput: React.FC<AndroidInputProps> = ({
                                                              type = InputTypes.TEXT,
                                                              styleType = AndroidInputStyleTypes.OUTLINED,
                                                              shape = AndroidInputShapeTypes.NORMAL,
                                                              variant = "primary",
                                                              label,
                                                              required = true,
                                                              helperText,
                                                              error,
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
                                                              id,
                                                              className = "",
                                                              maxLength,
                                                              placeholder = " ",
                                                              ...rest
                                                          }) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;

    const containerClasses = [
        "android-input",
        `android-input-${styleType}`,
        `android-input-shape-${shape}`,
        `input-${variant}`,
        startIcon ? "has-start-icon" : "",
        endIcon ? "has-end-icon" : "",
        className,
    ].filter(Boolean).join(" ");

    const inputClasses = [
        "form-control",
        hasError ? "is-invalid" : "",
    ].filter(Boolean).join(" ");

    const currentLength = String(value || defaultValue || "").length;
    const maxLen = typeof counter === "number" ? counter : maxLength;

    return (
        <div className={containerClasses}>
            <div className="input-field-wrapper">
                {startIcon && <div className="input-start-icon">{startIcon}</div>}

                {prefixText && <span className="input-prefix">{prefixText}</span>}

                <input
                    id={inputId}
                    type={type}
                    value={value}
                    required={required}
                    disabled={disabled}
                    readOnly={readOnly}
                    maxLength={maxLen}
                    placeholder={placeholder && placeholder.trim() !== "" ? placeholder : " "}
                    onChange={onChange}
                    className={inputClasses}
                    {...rest}
                />

                {label && <label htmlFor={inputId}>{required ? `${label}*` : label}</label>}

                {suffixText && <span className="input-suffix">{suffixText}</span>}

                {endIcon && <div className="input-end-icon">{endIcon}</div>}
            </div>

            {(helperText || errorMessage || counter) && (
                <div className="subtext-container">
                    {hasError ? (
                        <div className="invalid-feedback d-block">{errorMessage}</div>
                    ) : helperText ? (
                        <div className="form-text text-muted">{helperText}</div>
                    ) : <div />}

                    {counter && (
                        <span className="input-counter">
                            {currentLength}{maxLen ? `/${maxLen}` : ""}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default AndroidInput;