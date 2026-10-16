// iOS HIG Button Styles
export const IOSButtonStyleTypes = {
    FILLED: "filled", // Prominent background fill (High emphasis)
    TINTED: "tinted", // Semi-transparent colored background (Medium emphasis)
    GRAY: "gray",     // Neutral background tint
    PLAIN: "plain",   // Borderless text button (Low emphasis)
} as const;

export type IOSButtonStyleTypes = (typeof IOSButtonStyleTypes)[keyof typeof IOSButtonStyleTypes];