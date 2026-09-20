import React from 'react';
import { usePlatform } from '../../hooks/usePlatform.tsx';
import { type TargetPlatform } from '../../types/Types';
import {PlatformTypes} from "../../types/PlatformTypes.tsx";
// @ts-ignore
import {SizeTypes} from "../../types/SizeTypes.tsx";
import type {BootstrapShapeTypes} from "../../types/Web/BootstrapShapeTypes.tsx";
import type {AndroidShapeTypes} from "../../types/Android/AndroidShapeTypes.tsx";
import type {IOSShapeTypes} from "../../types/IOS/IOSShapeTypes.tsx";
import type {IOSStyleTypes} from "../../types/IOS/IOSStyleTypes.tsx";
import type {AndroidStyleTypes} from "../../types/Android/AndroidStyleTypes.tsx";
import type {BootstrapStyleTypes} from "../../types/Web/BootstrapStyleTypes.tsx";
import AndroidButton from "./AndroidButton.tsx";
import IOSButton from "./IOSButton.tsx";
import BootstrapButton from "./BootstrapButton.tsx";

export type LionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    platform?: TargetPlatform;
    variant?: string;
    // @ts-ignore
    size?: SizeTypes.SM | SizeTypes.MD | SizeTypes.LG;
    shape?: BootstrapShapeTypes | AndroidShapeTypes | IOSShapeTypes | string;
    styleType?: BootstrapStyleTypes | AndroidStyleTypes | IOSStyleTypes | string;
};

export const LionButton: React.FC<LionButtonProps> = ({
                                                          platform: platformOverride,
                                                          children,
                                                          ...props
                                                      }) => {
    const activePlatform = usePlatform(platformOverride);

    switch (activePlatform) {
        case PlatformTypes.ANDROID:
            return <AndroidButton {...(props as any)}>{children}</AndroidButton>;

        case PlatformTypes.IOS:
            return <IOSButton {...(props as any)}>{children}</IOSButton>;

        case PlatformTypes.WEB:
        default:
            return <BootstrapButton {...(props as any)}>{children}</BootstrapButton>;
    }
};