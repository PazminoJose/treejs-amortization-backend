import { HttpStatus } from "@nestjs/common";
import { Transform } from "class-transformer";
import { GLOBAL_ERRORS_MESSAGES } from "../constants";
import { HttpErrorException } from "../exceptions";

export function ParseNumber() {
  return Transform(({ value, key }) => {
    if (typeof value === "number") return value;
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      throw new HttpErrorException(
        {
          error: GLOBAL_ERRORS_MESSAGES.BadRequestException,
          message: `The ${key} must be a valid number`
        },
        HttpStatus.BAD_REQUEST
      );
    }
    return parsedValue;
  });
}
