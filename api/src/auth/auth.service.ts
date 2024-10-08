import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 20 * 1000;
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(loginUserDto);

    const payload = {
      email: user.email,
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!,
          secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY!,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!,
          secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY!,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findUserWithPasswordByEmail(
      loginUserDto.email,
    );

    console.log('User is valid');

    if (user && (await compare(loginUserDto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }

  async refreshToken(user: any) {
    const payload = {
      email: user.email,
    };

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!,
          secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY!,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!,
          secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY!,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }
}
