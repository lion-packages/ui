import React from "react";
import { PlatformTypes } from "../../types/PlatformTypes.tsx";
import type { LionAlertProps } from "./LionAlertProps.tsx";
import BootstrapAlert from "./BootstrapAlert.tsx";
import AndroidAlert from "./AndroidAlert.tsx";
import IOSAlert from "./IOSAlert.tsx";

/**
 * Multi-platform Alert component that renders the appropriate implementation
 * for Web (Bootstrap), Android (Material Design 3), or iOS (Cupertino/SwiftUI).
 */
export const LionAlert: React.FC<LionAlertProps> = ({
                                                        platform = PlatformTypes.WEB,
                                                        ...props
                                                    }) => {
    switch (platform) {
        case PlatformTypes.ANDROID:
            return <AndroidAlert {...props} />;
        case PlatformTypes.IOS:
            return <IOSAlert {...props} />;
        case PlatformTypes.WEB:
        default:
            return <BootstrapAlert {...props} />;
    }
};

export default LionAlert;