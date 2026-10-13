export const InputTypes = {
    TEXT: "text",
    PASSWORD: "password",
    EMAIL: "email",
    NUMBER: "number",
    TEL: "tel",
    URL: "url",
    DATE: "date",
    DATETIME: "datetime",
} as const;

export type InputTypes =
    (typeof InputTypes)[keyof typeof InputTypes];