import { ValidationOptions, registerDecorator } from "class-validator";
import { validateEcuadorianIdCard } from "../utils";
export function IsIdCard(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isIdCard",
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: "The $property must be a valid Ecuadorian ID card",
        ...validationOptions
      },
      validator: {
        validate(value) {
          return validateEcuadorianIdCard(value);
        }
      }
    });
  };
}
