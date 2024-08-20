import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';

import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config';

import { GetToken } from './decorators/get-token.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  register(@Body() registerDto: RegisterUserDto) {
    return this.client.send('auth.register.user', { ...registerDto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('login')
  login(@Body() loginDto: LoginUserDto) {
    return this.client.send('auth.login.user', { ...loginDto });
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  validate(@GetUser() user: CurrentUser, @GetToken() token: string) {
    return this.client.send('auth.verify.user', token).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
