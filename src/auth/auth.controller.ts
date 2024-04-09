import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, SignupDTO } from './dto';
import { User } from 'src/users/entities';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDTO: SignupDTO): Promise<User> {
    return this.authService.signup(signupDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body() loginDTO: LoginDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(loginDTO);
  }
}
