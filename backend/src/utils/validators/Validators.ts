import HttpError from "../errors/Erro";

export function validateRequiredFields(fields: { [key: string]: any }): void {
    const missingFields = Object.keys(fields).filter(field => !fields[field]);

    if (missingFields.length > 0) {
        throw new HttpError(400, `Os seguintes campos são obrigatórios e não foram preenchidos: ${missingFields.join(', ')}`);
    }
}

export function isInvalidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
}
