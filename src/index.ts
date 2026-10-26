/**
 * ---------------------------------------------------------------------------------------------------------------------
 * CSS
 * ---------------------------------------------------------------------------------------------------------------------
 */

import "./assets/css/index.css";
import "./assets/css/buttons/buttons-android.css";
import "./assets/css/buttons/buttons-ios.css";
import "./assets/css/buttons/buttons-web.css";
import "./assets/css/inputs/inputs-android.css";
import "./assets/css/inputs/inputs-ios.css";
import "./assets/css/inputs/inputs-bootstrap.css";
import "./assets/css/modals/modals.css";
import "./assets/css/loadings/loadings-bar.css";
import "./assets/css/tables/datatables.css";

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * TYPES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export * from './types/Android/AndroidButtonShapeTypes';
export * from './types/Android/AndroidButtonStyleTypes';
export * from './types/Android/AndroidInputShapeTypes';
export * from './types/Android/AndroidInputStyleTypes';
export * from './types/IOS/IOSButtonShapeTypes';
export * from './types/IOS/IOSButtonStyleTypes';
export * from './types/IOS/IOSInputShapeTypes';
export * from './types/IOS/IOSInputStyleTypes';
export * from './types/Web/BootstrapButtonShapeTypes';
export * from './types/Web/BootstrapButtonStyleTypes';
export * from './types/Web/BootstrapInputShapeTypes';
export * from './types/Web/BootstrapInputStyleTypes';
export * from './types/ButtonTypes';
export * from './types/InputTypes';
export * from './types/PlatformTypes';
export * from './types/SizeTypes';
export * from './types/VariantTypes';

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * CONTEXT
 * ---------------------------------------------------------------------------------------------------------------------
 */

export { LionUIComponentsProvider, useLionUI } from './context/LionUIComponentsContext';

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * HOOKS
 * ---------------------------------------------------------------------------------------------------------------------
 */

export { default as usePlatformStyle } from './hooks/usePlatformStyle';

/**
 * ---------------------------------------------------------------------------------------------------------------------
 * COMPONENTS
 * ---------------------------------------------------------------------------------------------------------------------
 */

export { default as AndroidButton } from './components/buttons/AndroidButton';
export { default as IOSButton } from './components/buttons/IOSButton';
export { default as BootstrapButton } from './components/buttons/BootstrapButton';
export { default as AndroidInput } from './components/inputs/AndroidInput';
export { default as IOSInput } from './components/inputs/IOSInput';
export { default as BootstrapInput } from './components/inputs/BootstrapInput';
export { default as AndroidSelect } from './components/select/AndroidSelect';
export { default as BootstrapSelect } from './components/select/BootstrapSelect';
export { default as IOSSelect } from './components/select/IOSSelect';
export { default as LoadingBar } from './components/loadings/LoadingBar';
export { default as LionButton } from './components/buttons/LionButton';
export { default as LionInput } from './components/inputs/LionInput';
export { default as LionSelect } from './components/select/LionSelect';
export { default as LionModal } from './components/modals/LionModal';
export { default as DataTable } from './components/tables/DataTable';