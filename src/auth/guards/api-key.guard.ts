import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const validApiKey = this.configService.get<string>('API_KEY');
    const apiKey = request.headers['api-key'] || request.query['api-key'];

    if (apiKey !== validApiKey) {
      throw new UnauthorizedException('API Key inválida.');
    }

    return true;
  }
}
