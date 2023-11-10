import { AppRoles, GLOBAL_ERRORS_MESSAGES, HttpErrorException, IS_PUBLIC_KEY, ROLES_KEY } from "@commons";
import { CanActivate, ExecutionContext, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Payload, Roles } from "../interfaces";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new HttpErrorException(GLOBAL_ERRORS_MESSAGES.UnauthorizedException, HttpStatus.UNAUTHORIZED);
    }

    const payload = await this.validateToken(token);
    const admittedRoles = this.reflector.getAllAndOverride<AppRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (this.isAllowedForAllLoggedUsers(admittedRoles)) {
      return true;
    }

    if (!this.hasAdmittedRole(payload.roles, admittedRoles)) {
      throw new HttpErrorException(GLOBAL_ERRORS_MESSAGES.ForbiddenException, HttpStatus.FORBIDDEN);
    }

    return true;
  }

  private isAllowedForAllLoggedUsers(admittedRoles: AppRoles[]): boolean {
    return admittedRoles.includes("ALL_LOGGED_USERS");
  }

  private hasAdmittedRole(userRoles: Roles[], admittedRoles: AppRoles[]): boolean {
    return userRoles.some((role) => admittedRoles.includes(role.name));
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

  private async validateToken(token: string): Promise<Payload> {
    try {
      const payload = await this.jwtService.verifyAsync<Payload>(token, {
        secret: this.configService.get("JWT_SECRET")
      });
      return payload;
    } catch {
      throw new HttpErrorException(GLOBAL_ERRORS_MESSAGES.UnauthorizedException, HttpStatus.UNAUTHORIZED);
    }
  }
}
