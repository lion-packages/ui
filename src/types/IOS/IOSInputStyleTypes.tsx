// Official SwiftUI TextFieldStyle representations from Apple Documentation
export const IOSInputStyleTypes = {
    FORM: "form",                     // SwiftUI Form/List row style (Horizontal Label + Input/Prompt)
    ROUNDED_BORDER: "rounded-border", // SwiftUI .textFieldStyle(.roundedBorder)
    FILLED: "filled",                 // iOS Native filled field style (Background tinted)
    OUTLINED: "outlined",             // Custom outlined border style
    PLAIN: "plain",                   // SwiftUI .textFieldStyle(.plain)
} as const;

export type IOSInputStyleTypes =
    (typeof IOSInputStyleTypes)[keyof typeof IOSInputStyleTypes];