import { IOSButtonStyleTypes } from "../../../types/IOS/IOSButtonStyleTypes.tsx";
import { IOSButtonShapeTypes } from "../../../types/IOS/IOSButtonShapeTypes.tsx";
import { ButtonTypes } from "../../../types/ButtonTypes.tsx";
import VariantList from "../../VariantList.tsx";

import { Fragment } from "react";
import IOSButton from "../../../components/buttons/IOSButton.tsx";

// List of iOS Human Interface Guidelines styles
const StyleTypeList: Array<{ label: string; styleType: IOSButtonStyleTypes }> = [
    { label: "Filled", styleType: IOSButtonStyleTypes.FILLED },
    { label: "Tinted", styleType: IOSButtonStyleTypes.TINTED },
    { label: "Gray", styleType: IOSButtonStyleTypes.GRAY },
    { label: "Plain", styleType: IOSButtonStyleTypes.PLAIN },
];

// List of supported iOS button shapes
const ShapeList: Array<{ label: string; shape: IOSButtonShapeTypes }> = [
    { label: "Rounded Shape", shape: IOSButtonShapeTypes.ROUNDED },
    { label: "Capsule Shape", shape: IOSButtonShapeTypes.CAPSULE },
];

export default function ButtonsIOSSection() {
    return (
        <Fragment>
            <h2>Buttons (iOS HIG)</h2>

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
                                        <IOSButton
                                            key={`${styleType}-${shape}-${variant}-enabled`}
                                            type={ButtonTypes.BUTTON}
                                            styleType={styleType}
                                            shape={shape}
                                            variant={variant}
                                        >
                                            {variant}
                                        </IOSButton>
                                    ))}
                                </div>
                            </div>

                            {/* Disabled State */}
                            <div>
                                <span className="text-muted d-block mb-1 small">Disabled</span>
                                <div className="d-flex flex-wrap gap-2 py-1">
                                    {VariantList.map((variant) => (
                                        <IOSButton
                                            key={`${styleType}-${shape}-${variant}-disabled`}
                                            type={ButtonTypes.BUTTON}
                                            styleType={styleType}
                                            shape={shape}
                                            variant={variant}
                                            disabled={true}
                                        >
                                            {variant}
                                        </IOSButton>
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