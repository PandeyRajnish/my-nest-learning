import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { PhoneAuth } from './customPipe/phoneAuth';
import { CustomPipe } from './customPipe/customPipe';

@Controller('auth')
export class AuthController {
  @Post('register')
  @UsePipes(PhoneAuth)
  registerUser(@Body() userData: AuthDto) {
    return {
      Name: `${userData.name}`,
      Email: `${userData.email}`,
      Country: `${userData.country}`,
      data: userData,
    };
  }

  @Post('metadata/data')
  @UsePipes(new ValidationPipe(), new CustomPipe())
  registerUserPhone(
    @Body('dob') dob: Date,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('country') country: string,
  ) {
    return {
      data: dob,
      name: name,
      email: email,
      country: country,
    };
  }

  @Post('custom-pipe')
  @UsePipes(new ValidationPipe(), new CustomPipe())
  customPipe(@Body('name') name: string) {
    return {
      data: name,
    };
  }

  @Get('/register/:id')
  @UsePipes(new CustomPipe())
  getId(@Param('id') id: number) {
    return {
      data: id,
    };
  }
}
