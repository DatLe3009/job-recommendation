import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, SignupDTO } from './dto';
import { User } from 'src/users/entities';
import { Response } from 'express';
import { ApiResponse } from 'src/shared/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDTO: SignupDTO): Promise<ApiResponse<User>> {
    const newUser = await this.authService.signup(signupDTO);
    return {
      message: 'Signup successful',
      statusCode: 201,
      data: newUser
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body() loginDTO: LoginDTO,
    @Res() res: Response
  ) {
    return this.authService.login(loginDTO, res);
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(204);
  }
}
