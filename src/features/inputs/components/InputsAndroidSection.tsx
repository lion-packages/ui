import { type ChangeEvent, Fragment, useState } from "react";
import VariantList from "../../VariantList.tsx";
import { AndroidInputStyleTypes } from "../../../types/Android/AndroidInputStyleTypes.tsx";
import { AndroidInputShapeTypes } from "../../../types/Android/AndroidInputShapeTypes.tsx";
import { InputTypes } from "../../../types/InputTypes.tsx";
import AndroidInput from "../../../components/inputs/AndroidInput.tsx";

const StyleTypeList: Array<{ label: string; styleType: AndroidInputStyleTypes }> = [
    { label: "Outlined", styleType: AndroidInputStyleTypes.OUTLINED },
    { label: "Filled", styleType: AndroidInputStyleTypes.FILLED },
];

const ShapeList: Array<{ label: string; shape: AndroidInputShapeTypes }> = [
    { label: "Normal Shape", shape: AndroidInputShapeTypes.NORMAL },
    { label: "Small Shape", shape: AndroidInputShapeTypes.SMALL },
];

export default function InputsAndroidSection() {
    const [inputValue, setInputValue] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <Fragment>
            <h2>Inputs (Android MD3)</h2>

            {StyleTypeList.map(({ label: styleLabel, styleType }) => (
                <div key={styleType} className="my-4">
                    <h4 className="text-primary mb-3">{styleLabel} Inputs</h4>

                    {ShapeList.map(({ label: shapeLabel, shape }) => (
                        <div key={`${styleType}-${shape}`} className="mb-5">
                            <div className={"ms-3"}>
                                <h6 className="text-secondary mb-3">{shapeLabel}</h6>
                            </div>

                            {/* Enabled State */}
                            <div className="mb-4">
                                <span className="text-muted d-block mb-2 small font-monospace">Enabled</span>
                                <div className="row g-3">
                                    {VariantList.map((variant) => (
                                        <div key={`${styleType}-${shape}-${variant}-enabled`} className="col-12 col-md-6 col-lg-4">
                                            <AndroidInput
                                                type={InputTypes.TEXT}
                                                styleType={styleType}
                                                shape={shape}
                                                variant={variant}
                                                label={`Label (${variant})`}
                                                helperText="Optional helper text"
                                                required={true}
                                                placeholder="Custom Placeholder..."
                                                value={inputValue}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* With Value / Floating State */}
                            <div className="mb-4">
                                <span className="text-muted d-block mb-2 small font-monospace">With Value / Floating</span>
                                <div className="row g-3">
                                    {VariantList.map((variant) => (
                                        <div key={`${styleType}-${shape}-${variant}-value`} className="col-12 col-md-6 col-lg-4">
                                            <AndroidInput
                                                type={InputTypes.TEXT}
                                                styleType={styleType}
                                                shape={shape}
                                                variant={variant}
                                                label="Username"
                                                defaultValue="lion.developer"
                                                helperText="Completed field"
                                                placeholder="Custom Placeholder..."
                                                autoComplete="off"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Error State */}
                            <div className="mb-4">
                                <span className="text-muted d-block mb-2 small font-monospace">Error State</span>
                                <div className="row g-3">
                                    {VariantList.map((variant) => (
                                        <div key={`${styleType}-${shape}-${variant}-error`} className="col-12 col-md-6 col-lg-4">
                                            <AndroidInput
                                                type={InputTypes.TEXT}
                                                styleType={styleType}
                                                shape={shape}
                                                variant={variant}
                                                label="Email Address"
                                                defaultValue="invalid-email"
                                                error="The email format is invalid"
                                                placeholder="Custom Placeholder..."
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Disabled State */}
                            <div className="mb-4">
                                <span className="text-muted d-block mb-2 small font-monospace">Disabled</span>
                                <div className="row g-3">
                                    {VariantList.map((variant) => (
                                        <div key={`${styleType}-${shape}-${variant}-disabled`} className="col-12 col-md-6 col-lg-4">
                                            <AndroidInput
                                                type={InputTypes.TEXT}
                                                styleType={styleType}
                                                shape={shape}
                                                variant={variant}
                                                label="Disabled"
                                                defaultValue="Locked value"
                                                disabled={true}
                                                helperText="Non-editable"
                                                placeholder="Custom Placeholder..."
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Readonly State */}
                            <div>
                                <span className="text-muted d-block mb-2 small font-monospace">ReadOnly</span>
                                <div className="row g-3">
                                    {VariantList.map((variant) => (
                                        <div key={`${styleType}-${shape}-${variant}-readonly`} className="col-12 col-md-6 col-lg-4">
                                            <AndroidInput
                                                type={InputTypes.TEXT}
                                                styleType={styleType}
                                                shape={shape}
                                                variant={variant}
                                                label="ReadOnly"
                                                defaultValue="Locked value"
                                                readOnly={true}
                                                helperText="Non-editable"
                                                placeholder="Custom Placeholder..."
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </Fragment>
    );
}