import { Fragment, useState } from "react";
import { Row, Col } from "react-bootstrap";
import VariantList from "../../VariantList.tsx";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { IOSInputStyleTypes } from "../../../types/IOS/IOSInputStyleTypes.tsx";
import { IOSInputShapeTypes } from "../../../types/IOS/IOSInputShapeTypes.tsx";
import IOSSelect from "../../../components/select/IOSSelect.tsx";

const mockOptions = [
    { label: "Option 1 - Alpha", value: "1" },
    { label: "Option 2 - Beta", value: "2" },
    { label: "Option 3 - Gamma", value: "3" },
];

const stylesList = [
    { type: IOSInputStyleTypes.ROUNDED_BORDER, name: "Rounded Border" },
    { type: IOSInputStyleTypes.FILLED, name: "Filled" },
    { type: IOSInputStyleTypes.FORM, name: "Form" },
];

const shapesList = [
    { type: IOSInputShapeTypes.ROUNDED, name: "Rounded" },
    { type: IOSInputShapeTypes.PILL, name: "Pill" },
    { type: IOSInputShapeTypes.SQUARE, name: "Square" },
];

export default function SelectsIOSSection() {
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});

    const handleChange = (key: string, value: string) => {
        setSelectedValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <Fragment>
            <h2>Selects (iOS)</h2>

            <p className="text-muted">
                Interactive demonstration of iOS SwiftUI Design selects across styles, shapes, and variants.
            </p>

            {stylesList.map((styleObj) => (
                <div key={styleObj.type} className="mb-5">
                    <h4 className="text-secondary border-bottom pb-2 mb-3">Style: {styleObj.name}</h4>

                    {shapesList.map((shapeObj) => (
                        <div key={shapeObj.type} className="mb-4">
                            <h6 className="text-muted mb-3">Shape: {shapeObj.name}</h6>

                            <Row className="g-3">
                                {VariantList.map((variant) => {
                                    const controlKey = `${styleObj.type}-${shapeObj.type}-${variant}`;

                                    return (
                                        <Col xs={12} md={4} lg={3} key={controlKey}>
                                            <IOSSelect
                                                variant={variant}
                                                styleType={styleObj.type}
                                                shape={shapeObj.type}
                                                sizeType={"md"}
                                                label={`${variant} Select`}
                                                placeholderOption={"Choose an option..."}
                                                options={mockOptions}
                                                value={selectedValues[controlKey] || ""}
                                                onChange={(e) => handleChange(controlKey, e.target.value)}
                                                helperText={`Helper for ${variant}`}
                                            />
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>
                    ))}
                </div>
            ))}

            {/* Error and Disabled States Section */}
            <div className="mb-4">
                <h4 className="text-secondary border-bottom pb-2 mb-3">States (Error & Disabled)</h4>
                <Row className="g-3">
                    <Col xs={12} md={6}>
                        <IOSSelect
                            variant={VariantTypes.DANGER}
                            styleType={IOSInputStyleTypes.ROUNDED_BORDER}
                            shape={IOSInputShapeTypes.ROUNDED}
                            sizeType={"md"}
                            label={"Error State Select"}
                            placeholderOption={"Select with error..."}
                            options={mockOptions}
                            error={"This field is required"}
                        />
                    </Col>

                    <Col xs={12} md={6}>
                        <IOSSelect
                            variant={VariantTypes.PRIMARY}
                            styleType={IOSInputStyleTypes.ROUNDED_BORDER}
                            shape={IOSInputShapeTypes.ROUNDED}
                            sizeType={"md"}
                            label={"Disabled State Select"}
                            placeholderOption={"Disabled select..."}
                            options={mockOptions}
                            disabled={true}
                            value={"1"}
                        />
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
}