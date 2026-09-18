import { ButtonTypes } from "../../../types/ButtonTypes.tsx";
import VariantList from "../../VariantList.tsx";
import {BootstrapStyleTypes} from "../../../types/Web/BootstrapStyleTypes.tsx";
import {BootstrapShapeTypes} from "../../../types/Web/BootstrapShapeTypes.tsx";

import { Fragment } from "react";
import BootstrapButton from "../../../components/buttons/BootstrapButton.tsx";

// List of Bootstrap styles
const StyleTypeList: Array<{ label: string; styleType: BootstrapStyleTypes }> = [
    { label: "Filled", styleType: BootstrapStyleTypes.FILLED },
    { label: "Outlined", styleType: BootstrapStyleTypes.OUTLINED },
];

// List of supported Bootstrap shapes
const ShapeList: Array<{ label: string; shape: BootstrapShapeTypes }> = [
    { label: "Default Shape", shape: BootstrapShapeTypes.DEFAULT },
    { label: "Pill Shape", shape: BootstrapShapeTypes.PILL },
    { label: "Square Shape", shape: BootstrapShapeTypes.SQUARE },
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

                            <div className="d-flex flex-wrap gap-2 py-2">
                                {VariantList.map((variant) => (
                                    <BootstrapButton
                                        key={`${styleType}-${shape}-${variant}`}
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
                    ))}
                </div>
            ))}
        </Fragment>
    );
}