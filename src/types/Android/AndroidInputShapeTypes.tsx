export const AndroidInputShapeTypes = {
    SMALL: "small",
    NORMAL: "normal",
} as const;

export type AndroidInputShapeTypes =
    (typeof AndroidInputShapeTypes)[keyof typeof AndroidInputShapeTypes];