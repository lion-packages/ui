import type { FC, ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";
import { VariantTypes } from "../../types/VariantTypes.tsx";
import { PlatformTypes } from "../../types/PlatformTypes.tsx";
import { ButtonTypes } from "../../types/ButtonTypes.tsx";
import { SizeTypes } from "../../types/SizeTypes.tsx";
import { useLionUI } from "../../context/LionUIComponentsContext.tsx";

export interface LionModalProps {
    modalId: string;
    title: string;
    body: ReactNode;
    buttons?: ReactNode;
    backdrop?: string;
    fullscreen?: true | "sm" | "md" | "lg" | "xl" | "xxl" | "sm-down" | "md-down" | "lg-down" | "xl-down" | "xxl-down";
    // @ts-ignore
    size?: SizeTypes.SM | SizeTypes.LG | SizeTypes.XL;
    variant?: VariantTypes | string;
    platform?: PlatformTypes | string;
    cancelButtonIcon?: ReactNode;
    cancelButtonText?: string;
}

export default function LionModal({
                                      modalId,
                                      title,
                                      body,
                                      buttons,
                                      backdrop = "static",
                                      fullscreen = "sm-down",
                                      size = SizeTypes.LG,
                                      variant = VariantTypes.LIGHT,
                                      platform = undefined,
                                      cancelButtonIcon = null,
                                      cancelButtonText = "Cancel",
                                  }: LionModalProps) {
    const { state, updateState } = useLionUI();
    const platformDefined = platform || state.platform;
    const isIOS = platformDefined === PlatformTypes.IOS;
    const isAndroid = platformDefined === PlatformTypes.ANDROID;

    const modalPlatformClass = isIOS
        ? "ios-modal"
        : isAndroid
            ? "android-modal"
            : "web-modal";

    const getHeaderTextColor = (variantType: VariantTypes | string | undefined): string => {
        switch (variantType) {
            case VariantTypes.LIGHT:
            case VariantTypes.LINK:
            case VariantTypes.WARNING:
            case VariantTypes.INFO:
                return "text-dark";
            case VariantTypes.PRIMARY:
            case VariantTypes.SECONDARY:
            case VariantTypes.SUCCESS:
            case VariantTypes.DANGER:
            case VariantTypes.DARK:
            case VariantTypes.LION_GLAM:
            case VariantTypes.LION_TECH:
            case VariantTypes.LION_PACKAGES:
            case VariantTypes.LION_PARKING:
            default:
                return "text-white";
        }
    };

    const getCancelButtonTextColor = (variantType: VariantTypes | string | undefined): string => {
        switch (variantType) {
            case VariantTypes.LIGHT:
            case VariantTypes.LINK:
            case VariantTypes.DARK:
            case VariantTypes.MODAL:
                return "text-dark";
            case VariantTypes.WARNING:
                return "text-warning";
            case VariantTypes.PRIMARY:
                return "text-primary";
            case VariantTypes.INFO:
                return "text-info";
            case VariantTypes.SECONDARY:
                return "text-secondary";
            case VariantTypes.DANGER:
                return "text-danger";
            case VariantTypes.SUCCESS:
                return "text-success";
            case VariantTypes.LION_PARKING:
            case VariantTypes.LION_PACKAGES:
                return "text-lion-packages";
            case VariantTypes.LION_TECH:
                return "text-lion-tech";
            case VariantTypes.LION_GLAM:
                return "text-lion-glam";
            default:
                return "text-white";
        }
    };

    const textColorClass = getHeaderTextColor(variant);
    const cancelTextColorClass = getCancelButtonTextColor(variant);

    const CancelButton: FC = () => (
        <Button
            // @ts-ignore
            type={ButtonTypes.BUTTON}
            variant={VariantTypes.MODAL}
            id={"modal-cancel-button"}
            className={`btn-modal btn-modal-cancel ${cancelTextColorClass}`}
            onClick={() => updateState({ modal: null })}
            disabled={state.reload || state.loading}
        >
            {cancelButtonIcon ?? cancelButtonText}
        </Button>
    );

    return (
        <Modal
            // @ts-ignore
            backdrop={backdrop}
            id={modalId}
            show={modalId === state.modal}
            fullscreen={fullscreen}
            onHide={() => updateState({ modal: null })}
            size={size}
            scrollable
            centered
            className={modalPlatformClass}
        >
            <Modal.Header
                closeButton={!state.reload || !state.loading}
                className={`custom-modal-header py-3 px-4 bg-${variant} ${textColorClass}`}
            >
                <Modal.Title
                    className={`custom-modal-title w-100 ${textColorClass} ${
                        isIOS ? "text-center fw-semibold" : "text-start fw-bold"
                    }`}
                >
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="custom-modal-body px-4 py-3">
                {modalId === state.modal ? body : null}
            </Modal.Body>

            <Modal.Footer className="custom-modal-footer p-0">
                <div className="custom-btn-group w-100 d-flex align-items-stretch">
                    <CancelButton />
                    {buttons}
                </div>
            </Modal.Footer>
        </Modal>
    );
}