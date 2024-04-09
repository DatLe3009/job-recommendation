import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO, SignupDTO } from './dto';
import { User } from 'src/users/entities';
import { UserRole } from 'src/shared/enums';
import { CreateUserDto } from 'src/users/dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
  ) {}
  async signup(signupDTO: SignupDTO): Promise<User> {
    const { password, confirmPassword, role } =  signupDTO;
    if (password !== confirmPassword ) {
      throw new BadRequestException('password does not match confirmPassword');
    }

    if (role === UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to create an admin account')
    }

    delete signupDTO.confirmPassword;
    const createUserDto: CreateUserDto = signupDTO;
    return this.userService.create(createUserDto);
  }

  async login( loginDTO: LoginDTO): Promise<User> {
    const user = await this.userService.findOne(loginDTO); // 1.
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password
    );
    if (passwordMatched) {
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException("Password does not match");
    }
  }
}
