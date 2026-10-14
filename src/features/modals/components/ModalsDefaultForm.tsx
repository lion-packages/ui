import { Col, Form, Row } from "react-bootstrap";
import ModalsDefaultInput from "./ModalsDefaultInput.tsx";

export default function ModalsDefaultForm ({ variant }) {
    return (
        <Form>
            <ModalsDefaultInput variant={variant} />

            <ModalsDefaultInput variant={variant} />

            <Row>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <ModalsDefaultInput variant={variant} />
                </Col>

                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <ModalsDefaultInput variant={variant} />
                </Col>

                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <ModalsDefaultInput variant={variant} />
                </Col>

                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <ModalsDefaultInput variant={variant} />
                </Col>
            </Row>
        </Form>
    );
}