import HttpError from "../errors/Erro";

export function validateRequiredFields(fields: { [key: string]: any }) {
    const missingFields = Object.keys(fields).filter(field => !fields[field]);

    if (missingFields.length > 0) {
        return {
            status: 400,
            message: "Os seguintes campos são obrigatórios e não foram preenchidos:",
            campos: missingFields
        };
    }

    return null;
}

export function isInvalidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
}
