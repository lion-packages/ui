import {useLionUI} from "../context/LionUIComponentsContext.tsx";
import { type TargetPlatform } from '../types/Types';

export const usePlatform = (override?: TargetPlatform): TargetPlatform => {
    const context = useLionUI();
    return override || context.platform;
};