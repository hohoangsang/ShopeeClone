export interface ResponseSuccessType<Data> {
  message: string;
  data: Data;
}

export interface ResponseErrorType<Data> {
  message: string;
  data?: Data;
}
