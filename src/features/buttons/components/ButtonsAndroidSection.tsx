import {AndroidStyleTypes} from "../../../types/Android/AndroidStyleTypes.tsx";
import {AndroidShapeTypes} from "../../../types/Android/AndroidShapeTypes.tsx";
import {ButtonTypes} from "../../../types/ButtonTypes.tsx";
import VariantList from "../../VariantList.tsx";

import {Fragment} from "react";
import AndroidButton from "../../../components/buttons/AndroidButton.tsx";

// List of Material Design 3 styles
const StyleTypeList: Array<{ label: string; styleType: AndroidStyleTypes }> = [
    { label: "Filled", styleType: AndroidStyleTypes.FILLED },
    { label: "Elevated", styleType: AndroidStyleTypes.ELEVATED },
    { label: "Tonal", styleType: AndroidStyleTypes.TONAL },
    { label: "Outlined", styleType: AndroidStyleTypes.OUTLINED },
    { label: "Text", styleType: AndroidStyleTypes.TEXT },
];

// List of supported button shapes
const ShapeList: Array<{ label: string; shape: AndroidShapeTypes }> = [
    { label: "Pill Shape", shape: AndroidShapeTypes.PILL },
    { label: "Rounded Shape", shape: AndroidShapeTypes.ROUNDED },
];

export default function ButtonsAndroidSection() {
    return (
        <Fragment>
            <h2>Buttons (Android MD3)</h2>

            {StyleTypeList.map(({ label: styleLabel, styleType }) => (
                <div key={styleType} className="my-4">
                    <h4 className="text-primary mb-3">{styleLabel} Buttons</h4>

                    {ShapeList.map(({ label: shapeLabel, shape }) => (
                        <div key={`${styleType}-${shape}`} className="ms-3 mb-4">
                            <h6 className="text-secondary mb-2">{shapeLabel}</h6>

                            <div className="d-flex flex-wrap gap-2 py-2">
                                {VariantList.map((variant) => (
                                    <AndroidButton
                                        key={`${styleType}-${shape}-${variant}`}
                                        type={ButtonTypes.BUTTON}
                                        styleType={styleType}
                                        shape={shape}
                                        variant={variant}
                                    >
                                        {variant}
                                    </AndroidButton>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </Fragment>
    );
}