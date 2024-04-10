export interface ApiResponse<T> {
    message: string;
    data?: T;
    error?: any;
    statusCode: number;
  }