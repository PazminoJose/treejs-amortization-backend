export const GLOBAL_ERRORS_MESSAGES = {
  BadRequestException: "La solicitud no pudo ser procesada debido a datos inválidos.",
  NotFoundException: "El elemento que busca no se encontró.",
  ForbiddenException: "No tiene permiso para acceder a este recurso.",
  InternalServerErrorException:
    "Se produjo un error interno en el servidor. Por favor, inténtelo de nuevo más tarde.",
  UnauthorizedException: "No está autorizado para acceder a este recurso."
} as const;
