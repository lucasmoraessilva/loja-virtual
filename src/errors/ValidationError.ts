import GenericApiError from "./GenericApiError";

export default class ValidationError extends GenericApiError {
    private _messages: string[] | string;

    constructor(statusCode: number, status: string, messages: string[] | string) {
        super('',statusCode,status);
        this._messages = messages;
    }

    get messages(): string[] | string{
        return this._messages;
    }
}