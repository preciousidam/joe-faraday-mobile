
export interface ErrorResponse  {
    message: string;
    errors?: {
        [key: string]: Array<string>
    }
}

export type Error = {
    status: number;
    data: ErrorResponse;
}