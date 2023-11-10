import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { unlinkSync } from "fs";
import { GLOBAL_ERRORS_MESSAGES } from "../constants";
import { HttpExceptionResponse } from "../interfaces";
import { UploadedMulterFiles } from "../types";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    if (request.files) this.deleteTrashFiles(request.files as any);
    const response = ctx.getResponse<Response>();
    let error: string;
    let message: any;
    let status: number;
    if (exception instanceof HttpException) {
      const errorInstanceResponse = this.getErrorInstanceResponse(exception);
      status = errorInstanceResponse?.status ?? exception.getStatus();
      const errorResponse = exception.getResponse() as HttpExceptionResponse;
      error = errorInstanceResponse?.error ?? errorResponse.error;
      message = errorInstanceResponse?.message ?? errorResponse.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      error = GLOBAL_ERRORS_MESSAGES[status];
      message = exception?.message;
    }
    const errorResponse: HttpExceptionResponse = { error, message };
    response.status(status).json(errorResponse);
  }

  getErrorInstanceResponse(exception: any) {
    const status = exception.status;
    const error = GLOBAL_ERRORS_MESSAGES[exception.constructor.name] || exception.getResponse().error;
    const message = exception.getResponse()?.message;
    return { error, status, message };
  }

  deleteTrashFiles(files: UploadedMulterFiles) {
    Object.keys(files).forEach((key) => {
      try {
        unlinkSync(files[key][0].path);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
