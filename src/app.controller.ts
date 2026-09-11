import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Req,
  Res,
  ParseIntPipe,
  ParseFloatPipe,
  ParseBoolPipe,
  ParseArrayPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller()
export class AppController {
  // @Get(':id')
  // fetchReq(@Req() req: Request, @Res() res: Response) {
  //   const { id } = req.params;
  //   const queryParams = req.query;
  //   const userAgent = req.headers['user-agent'];

  //   return res.status(500).send(`
  //     <script>
  //       console.log('ID: ${id}');
  //       console.log('Query Params: ${JSON.stringify(queryParams)}');
  //       console.log('User Agent: ${userAgent}');
  //     </script>
  //     `);
  // }

  // GET /pipe/int/42
  @Get('pipe/int/:id')
  getInt(@Param('id', ParseIntPipe) id: number) {
    return { pipe: 'ParseIntPipe', id, type: typeof id };
  }
  // GET /pipe/float/3.14
  @Get('pipe/float/:id')
  getFloat(@Param('id', ParseFloatPipe) id: number) {
    return { pipe: 'ParseFloatPipe', id, type: typeof id };
  }
  // GET /pipe/bool?isActive=true
  @Get('pipe/bool')
  getBool(@Query('isActive', ParseBoolPipe) isActive: boolean) {
    return { pipe: 'ParseBoolPipe', isActive };
  }
  // GET /pipe/array?num=1,2,3
  @Get('pipe/array')
  getArray(@Query('num', new ParseArrayPipe({ items: Number })) num: number[]) {
    return { pipe: 'ParseArrayPipe', num };
  }

  // /pipe/uuid/550e8400-e29b-41d4-a716-446655440000
  @Get('/pipe/uuid/:id')
  getUuid(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return `Id received: ${id}`;
  }

  @Get(':id')
  fetchQuery(
    @Param('id') id: string,
    @Query('name') name: string,
    @Query('age') age: number,
  ) {
    return {
      ID: `${id}`,
      Name: `${name}`,
      Age: `${age}`,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Res() res: Response) {
    return res.status(200).json({
      message:
        'HttpCode status code will be hidded here because of Response object',
    });
  }
}
