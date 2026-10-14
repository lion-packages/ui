import React from "react";
import type { PlatformTypes } from "../types/PlatformTypes.tsx";

export interface LionUIComponentsProviderProps {
    children: React.ReactNode;
    defaultPlatform?: PlatformTypes;
}