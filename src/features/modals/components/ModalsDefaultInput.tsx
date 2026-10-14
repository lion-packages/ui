import { Form } from "react-bootstrap";
import { InputTypes } from "../../../types/InputTypes.tsx";
import AndroidInput from "../../../components/inputs/AndroidInput.tsx";

export default function ModalsDefaultInput({ variant }) {
    return (
        <Form.Group className="mb-3">
            <AndroidInput
                type={InputTypes.TEXT}
                label="Extra Large input text"
                variant={variant}
                placeholder="Example text..."
            />
        </Form.Group>
    );
}