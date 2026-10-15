import { Col, Form, Row } from "react-bootstrap";
import ModalsDefaultInput from "./ModalsDefaultInput.tsx";

// @ts-ignore
export default function ModalsDefaultForm ({ platform, variant }) {
    return (
        <Form>
            <ModalsDefaultInput platform={platform} variant={variant} />

            <ModalsDefaultInput platform={platform} variant={variant} />

            <Row>
                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <ModalsDefaultInput platform={platform} variant={variant} />
                </Col>

                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <ModalsDefaultInput platform={platform} variant={variant} />
                </Col>

                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <ModalsDefaultInput platform={platform} variant={variant} />
                </Col>

                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <ModalsDefaultInput platform={platform} variant={variant} />
                </Col>
            </Row>
        </Form>
    );
}