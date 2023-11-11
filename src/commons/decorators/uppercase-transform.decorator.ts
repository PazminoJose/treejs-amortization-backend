import { Transform, TransformOptions } from "class-transformer";

export function UppercaseTransform(transformOptions?: TransformOptions) {
  return Transform(({ value }) => value.toUpperCase(), transformOptions);
}
