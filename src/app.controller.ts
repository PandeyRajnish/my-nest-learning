import { Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
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
}
