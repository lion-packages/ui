import { Fragment, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { VariantTypes } from "../../../../types/VariantTypes.tsx";
import { BootstrapButtonStyleTypes } from "../../../../types/Web/BootstrapButtonStyleTypes.tsx";
import { BootstrapButtonShapeTypes } from "../../../../types/Web/BootstrapButtonShapeTypes.tsx";
import { PlatformTypes } from "../../../../types/PlatformTypes.tsx";
import { AndroidButtonStyleTypes } from "../../../../types/Android/AndroidButtonStyleTypes.tsx";
import { AndroidButtonShapeTypes } from "../../../../types/Android/AndroidButtonShapeTypes.tsx";
import { IOSButtonStyleTypes } from "../../../../types/IOS/IOSButtonStyleTypes.tsx";
import { IOSButtonShapeTypes } from "../../../../types/IOS/IOSButtonShapeTypes.tsx";
import { ButtonTypes } from "../../../../types/ButtonTypes.tsx";
import LionTitle from "../../../../components/titles/LionTitle.tsx";
import LionButton from "../../../../components/buttons/LionButton.tsx";

export default function LionTitleSection() {
    const [titleText, setTitleText] = useState<string>("Orders & Logistics");
    const [forcedPlatform, setForcedPlatform] = useState<string>(PlatformTypes.WEB);

    return (
        <Fragment>
            <LionTitle
                title={titleText}
                platform={forcedPlatform}
                rightActions={
                    <Fragment>
                        <LionButton
                            variant={VariantTypes.PRIMARY}
                            type={ButtonTypes.BUTTON}
                            platform={forcedPlatform}
                            styleType={{
                                web: BootstrapButtonStyleTypes.FILLED,
                                android: AndroidButtonStyleTypes.TONAL,
                                ios: IOSButtonStyleTypes.TINTED,
                            }}
                            shape={{
                                web: BootstrapButtonShapeTypes.STANDARD,
                                android: AndroidButtonShapeTypes.ROUNDED,
                                ios: IOSButtonShapeTypes.ROUNDED,
                            }}
                        >
                            + Create
                        </LionButton>

                        <LionButton
                            variant={VariantTypes.LIGHT}
                            type={ButtonTypes.BUTTON}
                            platform={forcedPlatform}
                            styleType={{
                                web: BootstrapButtonStyleTypes.FILLED,
                                android: AndroidButtonStyleTypes.TONAL,
                                ios: IOSButtonStyleTypes.TINTED,
                            }}
                            shape={{
                                web: BootstrapButtonShapeTypes.STANDARD,
                                android: AndroidButtonShapeTypes.ROUNDED,
                                ios: IOSButtonShapeTypes.ROUNDED,
                            }}
                        >
                            <i className="bi bi-arrow-clockwise" />
                        </LionButton>
                    </Fragment>
                }
            />

            <div className="card p-3 bg-light border-0 mt-4 mb-4">
                <h5 className="mb-3">Unified Title Simulator</h5>

                <div className="row g-3">
                    <div className="col-md-6">
                        <InputGroup>
                            <InputGroup.Text>Title Label</InputGroup.Text>
                            <Form.Control
                                type="text"
                                value={titleText}
                                onChange={(e) => setTitleText(e.target.value)}
                            />
                        </InputGroup>
                    </div>

                    <div className="col-md-6">
                        <InputGroup>
                            <InputGroup.Text>Simulate Platform</InputGroup.Text>
                            <Form.Select
                                value={forcedPlatform}
                                onChange={(e) => setForcedPlatform(e.target.value)}
                            >
                                <option value="web">Web Browser</option>
                                <option value="ios">iOS Environment</option>
                                <option value="android">Android Environment</option>
                            </Form.Select>
                        </InputGroup>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}