import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

@Controller()
export class AppController {
  @Get(':id')
  fetchReq(@Req() req: Request) {
    const { id } = req.params;
    const queryParams = req.query;
    const userAgent = req.headers['user-agent'];

    return {
      id,
      queryParams,
      userAgent,
    };
  }
}
