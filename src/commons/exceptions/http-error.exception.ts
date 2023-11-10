import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { MongooseError } from "mongoose";

export interface HttpErrorExceptionResponse {
  error: string;
  message: string;
}
export class HttpErrorException extends HttpException {
  constructor(response: HttpErrorExceptionResponse | string, status: HttpStatus) {
    const res =
      typeof response === "string"
        ? { error: response }
        : { error: response.error, message: response.message };
    super({ ...res }, status);
  }

  /**
   * Crea una instancia de HttpErrorException a partir de un error dado.
   * @param error - error a ser arrojado
   * @returns HttpErrorException - una instancia de HttpErrorException
   */
  static createFromError(error: any) {
    if (error instanceof HttpErrorException) return error;
    else if (error instanceof MongooseError)
      return new HttpErrorException(
        { error: "MONGO_ERROR", message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    else if (error instanceof Error) return new HttpErrorException(error.message, HttpStatus.BAD_REQUEST);
    else return new HttpErrorException(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
