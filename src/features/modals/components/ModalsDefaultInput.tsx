import { Form } from "react-bootstrap";
import { InputTypes } from "../../../types/InputTypes.tsx";
import AndroidInput from "../../../components/inputs/AndroidInput.tsx";
import {PlatformTypes} from "../../../types/PlatformTypes.tsx";
import IOSInput from "../../../components/inputs/IOSInput.tsx";
import BootstrapInput from "../../../components/inputs/BootstrapInput.tsx";

// @ts-ignore
export default function ModalsDefaultInput({ platform, variant }) {
    const InputComponent = PlatformTypes.IOS === platform ? IOSInput : PlatformTypes.ANDROID === platform ? AndroidInput : BootstrapInput;

    return (
        <Form.Group className="mb-3">
            <InputComponent
                type={InputTypes.TEXT}
                label="Extra Large input text"
                variant={variant}
                placeholder="Example text..."
            />
        </Form.Group>
    );
}