import { ButtonTypes } from "../../../types/ButtonTypes.tsx";
import VariantList from "../../VariantList.tsx";
import { BootstrapButtonStyleTypes } from "../../../types/Web/BootstrapButtonStyleTypes.tsx";
import { BootstrapButtonShapeTypes } from "../../../types/Web/BootstrapButtonShapeTypes.tsx";

import { Fragment } from "react";
import BootstrapButton from "../../../components/buttons/BootstrapButton.tsx";

// List of Bootstrap styles
const StyleTypeList: Array<{ label: string; styleType: BootstrapButtonStyleTypes }> = [
    { label: "Filled", styleType: BootstrapButtonStyleTypes.FILLED },
    { label: "Outlined", styleType: BootstrapButtonStyleTypes.OUTLINED },
];

// List of supported Bootstrap shapes
const ShapeList: Array<{ label: string; shape: BootstrapButtonShapeTypes }> = [
    { label: "Default Shape", shape: BootstrapButtonShapeTypes.STANDARD },
    { label: "Pill Shape", shape: BootstrapButtonShapeTypes.PILL },
    { label: "Square Shape", shape: BootstrapButtonShapeTypes.SQUARE },
];

export default function ButtonsBootstrapSection() {
    return (
        <Fragment>
            <h2>Buttons (Bootstrap Web / Desktop)</h2>

            {StyleTypeList.map(({ label: styleLabel, styleType }) => (
                <div key={styleType} className="my-4">
                    <h4 className="text-primary mb-3">{styleLabel} Buttons</h4>

                    {ShapeList.map(({ label: shapeLabel, shape }) => (
                        <div key={`${styleType}-${shape}`} className="ms-3 mb-4">
                            <h6 className="text-secondary mb-2">{shapeLabel}</h6>

                            {/* Enabled State */}
                            <div className="mb-3">
                                <span className="text-muted d-block mb-1 small">Enabled</span>
                                <div className="d-flex flex-wrap gap-2 py-1">
                                    {VariantList.map((variant) => (
                                        <BootstrapButton
                                            key={`${styleType}-${shape}-${variant}-enabled`}
                                            type={ButtonTypes.BUTTON}
                                            styleType={styleType}
                                            shape={shape}
                                            variant={variant}
                                        >
                                            {variant}
                                        </BootstrapButton>
                                    ))}
                                </div>
                            </div>

                            {/* Disabled State */}
                            <div>
                                <span className="text-muted d-block mb-1 small">Disabled</span>
                                <div className="d-flex flex-wrap gap-2 py-1">
                                    {VariantList.map((variant) => (
                                        <BootstrapButton
                                            key={`${styleType}-${shape}-${variant}-disabled`}
                                            type={ButtonTypes.BUTTON}
                                            styleType={styleType}
                                            shape={shape}
                                            variant={variant}
                                            disabled={true}
                                        >
                                            {variant}
                                        </BootstrapButton>
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