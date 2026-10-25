import { Fragment, useState } from "react";
import { Row, Col } from "react-bootstrap";
import VariantList from "../../VariantList.tsx";
import { VariantTypes } from "../../../types/VariantTypes.tsx";
import { AndroidInputStyleTypes } from "../../../types/Android/AndroidInputStyleTypes.tsx";
import { AndroidInputShapeTypes } from "../../../types/Android/AndroidInputShapeTypes.tsx";
import AndroidSelect from "../../../components/select/AndroidSelect.tsx";

const mockOptions = [
    { label: "Option 1 - Alpha", value: "1" },
    { label: "Option 2 - Beta", value: "2" },
    { label: "Option 3 - Gamma", value: "3" },
];

const stylesList = [
    { type: AndroidInputStyleTypes.OUTLINED, name: "Outlined" },
    { type: AndroidInputStyleTypes.FILLED, name: "Filled" },
];

const shapesList = [
    { type: AndroidInputShapeTypes.NORMAL, name: "Normal" },
    { type: AndroidInputShapeTypes.SMALL, name: "Small" },
];

export default function SelectsAndroidSection() {
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});

    const handleChange = (key: string, value: string) => {
        setSelectedValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <Fragment>
            <h2>Selects (Android)</h2>

            <p className="text-muted">
                Interactive demonstration of Android Material Design 3 selects across styles, shapes, and variants.
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
                                            <AndroidSelect
                                                variant={variant}
                                                styleType={styleObj.type}
                                                shape={shapeObj.type}
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
                        <AndroidSelect
                            variant={VariantTypes.DANGER}
                            styleType={AndroidInputStyleTypes.OUTLINED}
                            shape={AndroidInputShapeTypes.NORMAL}
                            label={"Error State Select"}
                            placeholderOption={"Select with error..."}
                            options={mockOptions}
                            error={"This field is required"}
                        />
                    </Col>

                    <Col xs={12} md={6}>
                        <AndroidSelect
                            variant={VariantTypes.PRIMARY}
                            styleType={AndroidInputStyleTypes.OUTLINED}
                            shape={AndroidInputShapeTypes.NORMAL}
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