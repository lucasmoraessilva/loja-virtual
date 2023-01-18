export default class GenericApiError extends Error {
    private _message: string;
    private _statusCode: number;
    private _status: string;

    constructor(message: string, statusCode: number, status: string) {
        super(message);
        this._message = message;
        this._statusCode = statusCode;
        this._status = status;
    }

    get message(): string{
        return this._message;
    }

    get statusCode(): number {
        return this._statusCode;
    }
    
    get status(): string {
        return this._status;
    }
}