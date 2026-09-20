import React, { createContext, useContext, useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import type {LionUIContextProps, LionUIComponentsProviderProps, TargetPlatform} from '../types/Types';

const LionUIComponentsContext = createContext<LionUIContextProps | undefined>(undefined);

export const LionUIComponentsProvider: React.FC<LionUIComponentsProviderProps> = ({
                                                                                      children,
                                                                                      defaultPlatform,
                                                                                  }) => {
    const [platform, setPlatform] = useState<TargetPlatform>(() => {
        if (defaultPlatform) return defaultPlatform;
        const capPlatform = Capacitor.getPlatform() as TargetPlatform;
        return capPlatform === 'ios' || capPlatform === 'android' ? capPlatform : 'web';
    });

    useEffect(() => {
        if (!defaultPlatform) {
            const capPlatform = Capacitor.getPlatform() as TargetPlatform;
            const detected: TargetPlatform =
                capPlatform === 'ios' || capPlatform === 'android' ? capPlatform : 'web';
            setPlatform(detected);
        }
    }, [defaultPlatform]);

    return (
        <LionUIComponentsContext.Provider value={{ platform, setPlatform }}>
            {children}
        </LionUIComponentsContext.Provider>
    );
};

export const useLionUI = (): LionUIContextProps => {
    const context = useContext(LionUIComponentsContext);
    if (!context) {
        throw new Error('useLionUI debe ser utilizado dentro de un LionUIComponentsProvider');
    }
    return context;
};