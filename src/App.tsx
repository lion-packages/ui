import {Container, Form} from "react-bootstrap";
import AndroidButton from "./components/buttons/AndroidButton.tsx";
import {Variant} from "./types/Variant.tsx";

const VariantList: Array<Variant> = [
    Variant.SECONDARY,
    Variant.PRIMARY,
    Variant.SUCCESS,
    Variant.DANGER,
    Variant.WARNING,
    Variant.INFO,
    Variant.LIGHT,
    Variant.DARK,
    Variant.LION_RED,
    Variant.LION_ORANGE,
];

export default function App() {
    const buttonEvent = () => alert("Hola desde @lion/ui");

    return (
        <Container>
            <h1>Components</h1>

            <hr />

            <Form.Group>
                {VariantList.map((variant: Variant) => (
                    <AndroidButton
                        variant={variant}
                        platform="web"
                        className={"me-2"}
                        onClick={buttonEvent}
                    >
                        {"Check"}
                    </AndroidButton>
                ))}
            </Form.Group>
        </Container>
    );
}