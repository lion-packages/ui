// iOS HIG Button Styles
export const IOSStyleTypes = {
    FILLED: "filled", // Prominent background fill (High emphasis)
    TINTED: "tinted", // Semi-transparent colored background (Medium emphasis)
    GRAY: "gray",     // Neutral background tint
    PLAIN: "plain",   // Borderless text button (Low emphasis)
} as const;

export type IOSStyleTypes = (typeof IOSStyleTypes)[keyof typeof IOSStyleTypes];