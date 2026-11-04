import { useLionUI } from "../context/LionUIComponentsContext.tsx";

/**
 * Custom hook to resolve error messages from the global context or local props.
 * Supports global form errors, string messages, and raw backend error structures.
 */
export const useValidationError = (
    errorProp?: any,
    formId?: string,
    fieldName?: string
): string[] => {
    const { state } = useLionUI();

    // 1. Check global context errors indexed by formId and field name
    if (formId && fieldName && state.formErrors && state.formErrors[formId]) {
        const globalErrors = state.formErrors[formId][fieldName];
        if (Array.isArray(globalErrors) && globalErrors.length > 0) {
            return globalErrors;
        }
    }

    // 2. Fallback to local error prop handling
    if (!errorProp) return [];
    if (typeof errorProp === "string") return [errorProp];
    if (typeof errorProp === "boolean") return [];

    if (fieldName) {
        // Handle array of record objects (e.g., [{ name: ["err1", "err2"] }])
        if (Array.isArray(errorProp)) {
            for (const item of errorProp) {
                if (typeof item === "object" && item !== null) {
                    const messages = item[fieldName];
                    if (Array.isArray(messages) && messages.length > 0) {
                        return messages;
                    }
                }
            }
        }
        // Handle dictionary object map (e.g., { name: ["err1"] })
        else if (typeof errorProp === "object" && errorProp !== null) {
            const messages = (errorProp as Record<string, any>)[fieldName];
            if (Array.isArray(messages) && messages.length > 0) {
                return messages;
            }
        }
    }

    return [];
};