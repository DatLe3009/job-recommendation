import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO, SignupDTO } from './dto';
import { User } from 'src/users/entities';
import { UserRole } from 'src/shared/enums';
import { CreateUserDto } from 'src/users/dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
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
    return this.usersService.create(createUserDto);
  }

  login( loginDTO: LoginDTO) {
    return loginDTO;
  }
}
