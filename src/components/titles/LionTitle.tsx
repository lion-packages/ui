import { type ReactNode } from "react";
import { Row, Col } from "react-bootstrap";
import { useLionUI } from "../../context/LionUIComponentsContext.tsx";
import { type PlatformTypes } from "../../types/PlatformTypes.tsx";

export interface LionTitleProps {
    title: string | ReactNode;
    rightActions?: ReactNode;
    platform?: PlatformTypes | string;
    className?: string;
}

export default function LionTitle({
                                      title,
                                      rightActions = null,
                                      platform: propPlatform,
                                      className = "",
                                  }: LionTitleProps) {
    const { state } = useLionUI();

    const activePlatform = propPlatform || state.platform || "web";
    const normalizedPlatform = String(activePlatform).toLowerCase();

    const platformClass = `lion-title-platform-${normalizedPlatform}`;
    const combinedClasses = [
        "lion-title-container",
        platformClass,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={combinedClasses}>
            <Row className="align-items-center justify-content-between g-2 m-0">
                <Col xs={12} sm={rightActions ? 7 : 12} md={rightActions ? 8 : 12} className="p-0">
                    <h2 className="lion-title-text m-0 fw-bold">
                        {title}
                    </h2>
                </Col>

                {rightActions && (
                    <Col
                        xs={12}
                        sm={5}
                        md={4}
                        className="p-0 d-flex justify-content-sm-end align-items-center"
                    >
                        <div className="lion-title-actions d-flex gap-2 align-items-center flex-wrap justify-content-end">
                            {rightActions}
                        </div>
                    </Col>
                )}
            </Row>

            <hr className="lion-title-divider" />
        </div>
    );
}