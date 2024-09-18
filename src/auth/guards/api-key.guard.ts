import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {
    this.configService = configService;
  }

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const validApiKey = this.configService.get<string>('API_KEY');
    const apiKey = request.headers['x-api-key'];

    if (apiKey === validApiKey) {
      return true;
    }

    throw new UnauthorizedException('Invalid API Key');
  }
}
