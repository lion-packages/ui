import {AndroidInputStyleTypes} from "../../../types/Android/AndroidInputStyleTypes.tsx";
import {AndroidInputShapeTypes} from "../../../types/Android/AndroidInputShapeTypes.tsx";
import {InputTypes} from "../../../types/InputTypes.tsx";
import VariantList from "../../VariantList.tsx";

import {Fragment} from "react";
import AndroidInput from "../../../components/input/AndroidInput.tsx";

const StyleTypeList: Array<{ label: string; styleType: AndroidInputStyleTypes }> = [
    { label: "Outlined", styleType: AndroidInputStyleTypes.OUTLINED },
    { label: "Filled", styleType: AndroidInputStyleTypes.FILLED },
];

const ShapeList: Array<{ label: string; shape: AndroidInputShapeTypes }> = [
    { label: "Normal Shape", shape: AndroidInputShapeTypes.NORMAL },
    { label: "Small Shape", shape: AndroidInputShapeTypes.SMALL },
];

export default function InputsAndroidSection() {
    return (
        <Fragment>
            <h2>Inputs (Android MD3)</h2>

            {StyleTypeList.map(({ label: styleLabel, styleType }) => (
                <div key={styleType} className="my-4">
                    <h4 className="text-primary mb-3">{styleLabel} Inputs</h4>

                    {ShapeList.map(({ label: shapeLabel, shape }) => (
                        <div key={`${styleType}-${shape}`} className="ms-3 mb-5">
                            <h6 className="text-secondary mb-3">{shapeLabel}</h6>

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
                                                helperText="Texto de ayuda opcional"
                                                className={`input-${variant}`}
                                                required={true}
                                                placeholder={"Custom Placeholder..."}
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
                                                label="Usuario"
                                                value="Usuario"
                                                defaultValue="lion.developer"
                                                helperText="Campo completado"
                                                className={`input-${variant}`}
                                                placeholder={"Custom Placeholder..."}
                                                autoComplete={"off"}
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
                                                label="Correo electrónico"
                                                defaultValue="correo-invalido"
                                                error="El formato del correo no es válido"
                                                className={`input-${variant}`}
                                                placeholder={"Custom Placeholder..."}
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
                                                value={"value"}
                                                label="Deshabilitado"
                                                defaultValue="Valor bloqueado"
                                                disabled={true}
                                                helperText="No editable"
                                                className={`input-${variant}`}
                                                placeholder={"Custom Placeholder..."}
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
                                        <div key={`${styleType}-${shape}-${variant}-disabled`} className="col-12 col-md-6 col-lg-4">
                                            <AndroidInput
                                                type={InputTypes.TEXT}
                                                styleType={styleType}
                                                shape={shape}
                                                variant={variant}
                                                value={"value"}
                                                label="ReadOnly"
                                                defaultValue="Valor bloqueado"
                                                readOnly={true}
                                                helperText="No editable"
                                                className={`input-${variant}`}
                                                placeholder={"Custom Placeholder..."}
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