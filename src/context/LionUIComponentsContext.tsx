import { createContext, type FC, useContext, useState } from 'react';
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
            formErrors: {},
        };
    });

    const updateState = (partial: Partial<LionUIState>) => {
        setState((prev) => ({ ...prev, ...partial }));
    };

    // Set validation errors for a specific form by its ID
    const setFormErrors = (formId: string, errors: Record<string, string[]>) => {
        setState((prev) => ({
            ...prev,
            formErrors: {
                ...prev.formErrors,
                [formId]: errors,
            },
        }));
    };

    // Clear validation errors for a specific form or a single field inside it
    const clearFormErrors = (formId: string, fieldName?: string) => {
        setState((prev) => {
            const currentFormErrors = prev.formErrors[formId];
            if (!currentFormErrors) return prev;

            if (fieldName) {
                const updatedFields = { ...currentFormErrors };
                delete updatedFields[fieldName];
                return {
                    ...prev,
                    formErrors: {
                        ...prev.formErrors,
                        [formId]: updatedFields,
                    },
                };
            } else {
                const updatedForms = { ...prev.formErrors };
                delete updatedForms[formId];
                return {
                    ...prev,
                    formErrors: updatedForms,
                };
            }
        });
    };

    return (
        <LionUIComponentsContext.Provider value={{ state, updateState, setFormErrors, clearFormErrors }}>
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