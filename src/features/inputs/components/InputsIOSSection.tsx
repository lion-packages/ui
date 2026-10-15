import VariantList from "../../VariantList.tsx";
import { IOSInputStyleTypes } from "../../../types/IOS/IOSInputStyleTypes.tsx";
import { IOSInputShapeTypes } from "../../../types/IOS/IOSInputShapeTypes.tsx";
import { InputTypes } from "../../../types/InputTypes.tsx";

import { Fragment, useState } from "react";
import IOSInput from "../../../components/inputs/IOSInput.tsx";

const StyleTypeList: Array<{ label: string; styleType: IOSInputStyleTypes }> = [
    { label: "Form", styleType: IOSInputStyleTypes.FORM },
    { label: "Rounded Border", styleType: IOSInputStyleTypes.ROUNDED_BORDER },
];

const ShapeList: Array<{ label: string; shape: IOSInputShapeTypes }> = [
    { label: "Rounded Shape", shape: IOSInputShapeTypes.ROUNDED },
    { label: "Pill Shape", shape: IOSInputShapeTypes.PILL },
    { label: "Square Shape", shape: IOSInputShapeTypes.SQUARE },
];

export default function InputsIOSSection() {
    const [inputValue, setInputValue] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <Fragment>
            <h2>Inputs (iOS SwiftUI)</h2>

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
                                            <IOSInput
                                                type={InputTypes.TEXT}
                                                styleType={styleType}
                                                shape={shape}
                                                variant={variant}
                                                label={`Label (${variant})`}
                                                helperText="Texto de ayuda opcional"
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
                                            <IOSInput
                                                type={InputTypes.TEXT}
                                                styleType={styleType}
                                                shape={shape}
                                                variant={variant}
                                                label="Usuario"
                                                defaultValue="lion.developer"
                                                helperText="Campo completado"
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
                                            <IOSInput
                                                type={InputTypes.TEXT}
                                                styleType={styleType}
                                                shape={shape}
                                                variant={variant}
                                                label="Correo electrónico"
                                                defaultValue="correo-invalido"
                                                error="El formato del correo no es válido"
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
                                            <IOSInput
                                                type={InputTypes.TEXT}
                                                styleType={styleType}
                                                shape={shape}
                                                variant={variant}
                                                label="Deshabilitado"
                                                defaultValue="Valor bloqueado"
                                                disabled={true}
                                                helperText="No editable"
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
                                            <IOSInput
                                                type={InputTypes.TEXT}
                                                styleType={styleType}
                                                shape={shape}
                                                variant={variant}
                                                label="ReadOnly"
                                                defaultValue="Valor bloqueado"
                                                readOnly={true}
                                                helperText="No editable"
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