export interface ApiResponse<T> {
    message: string | string[];
    statusCode: number;
    data?: T;
    error?: string;
}