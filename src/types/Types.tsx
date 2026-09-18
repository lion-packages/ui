import { type ReactNode } from 'react';

export type TargetPlatform = 'web' | 'android' | 'ios';

export interface LionUIContextProps {
    platform: TargetPlatform;
    setPlatform: (platform: TargetPlatform) => void;
}

export interface LionUIComponentsProviderProps {
    children: ReactNode;
    defaultPlatform?: TargetPlatform;
}