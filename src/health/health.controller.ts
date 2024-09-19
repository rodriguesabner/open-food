import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller({ version: '' })
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async getApiDetails() {
    return await this.healthService.getApiDetails();
  }
}
