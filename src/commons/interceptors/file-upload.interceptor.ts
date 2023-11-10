import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
  mixin
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { randomBytes } from "crypto";
import multer from "multer";
import { HttpErrorException } from "../exceptions";
import { FilesUploadInterceptorOptions, MulterUploadField } from "../interfaces";
import { validateFileMimeType } from "../utils";

export function FilesUploadInterceptor(
  uploadFields: MulterUploadField[],
  options?: FilesUploadInterceptorOptions
) {
  @Injectable()
  class FilesUploadUploadMixin implements NestInterceptor {
    async intercept(context: ExecutionContext, call$: CallHandler<any>) {
      const { acceptedMimeTypes, destination } = options || ({} as FilesUploadInterceptorOptions);
      const fieldDestination = {};
      uploadFields.forEach((field) => {
        fieldDestination[field.name] = field.destination;
      });
      const ctx = context.switchToHttp();
      const fileIntConst = FileFieldsInterceptor(uploadFields, {
        storage: multer.diskStorage({
          destination(_req, file, callback) {
            const destinationFolder = fieldDestination[file.fieldname] || destination;
            if (validateFileMimeType(file, acceptedMimeTypes))
              callback(new HttpErrorException("MIME TYPE not valid", HttpStatus.BAD_REQUEST), null);
            if (!destinationFolder)
              callback(new HttpErrorException("ENOENT path not found", HttpStatus.BAD_REQUEST), null);
            callback(null, destinationFolder);
          },
          filename(_req, file, callback) {
            const filename = `${Date.now()}-${randomBytes(10).toString("hex")}.${file.originalname
              .split(".")
              .pop()}`;
            callback(null, filename);
          }
        })
      });

      const fileInt = new fileIntConst();
      return fileInt.intercept(context, call$);
    }
  }

  const Interceptor = mixin(FilesUploadUploadMixin);
  return Interceptor;
}
