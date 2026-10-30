import { createContext, type FC, useContext, useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { PlatformTypes } from "../types/PlatformTypes.tsx";
import type { LionUIContextProps } from "../interfaces/LionUIContextProps.tsx";
import type { LionUIComponentsProviderProps } from "../interfaces/LionUIComponentsProviderProps.tsx";
import type { LionUIState } from "../interfaces/LionUIState.tsx";

const LionUIComponentsContext = createContext<LionUIContextProps | undefined>(undefined);

export const LionUIComponentsProvider: FC<LionUIComponentsProviderProps> = ({
                                                                                      children,
                                                                                      defaultPlatform,
                                                                                  }) => {
    const [state, setState] = useState<LionUIState>(() => {
        let initialPlatform: PlatformTypes = PlatformTypes.WEB;

        if (defaultPlatform) {
            initialPlatform = defaultPlatform;
        } else {
            const capPlatform = Capacitor.getPlatform();

            if (capPlatform === PlatformTypes.IOS || capPlatform === PlatformTypes.ANDROID) {
                initialPlatform = capPlatform as PlatformTypes;
            }
        }

        return {
            platform: initialPlatform,
            loading: false,
            reload: false,
            booting: false,
            sidebar: false,
            version: null,
            modal: null,
            logo: null,
            background: null,
            session: false,
        };
    });

    const updateState = (partial: Partial<LionUIState>) => {
        setState((prev) => ({ ...prev, ...partial }));
    };

    useEffect(() => {
        if (!defaultPlatform) {
            const capPlatform = Capacitor.getPlatform();

            const detected: PlatformTypes =
                capPlatform === PlatformTypes.IOS || capPlatform === PlatformTypes.ANDROID
                    ? (capPlatform as PlatformTypes)
                    : PlatformTypes.WEB;

            if (detected !== state.platform) {
                setState((prev) => ({ ...prev, platform: detected }));
            }
        }
    }, [defaultPlatform, state.platform]);

    return (
        <LionUIComponentsContext.Provider value={{ state, updateState }}>
            {children}
        </LionUIComponentsContext.Provider>
    );
};

export const useLionUI = (): LionUIContextProps => {
    const context = useContext(LionUIComponentsContext);

    if (!context) {
        throw new Error('useLionUI must be used within a LionUIComponentsProvider.');
    }

    return context;
};