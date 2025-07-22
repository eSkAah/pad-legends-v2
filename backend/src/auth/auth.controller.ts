import { Controller, Post, Body, Get, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, RefreshTokenDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      const data = await this.authService.signUp(
        signUpDto.email, 
        signUpDto.password,
        { pseudo: signUpDto.pseudo }
      );
      
      return {
        message: 'User created successfully',
        user: data.user,
        session: data.session
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Signup failed',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    try {
      const data = await this.authService.signIn(signInDto.email, signInDto.password);
      
      if (data.user) {
        const profile = await this.authService.getOrCreateProfile(data.user);
        return {
          user: data.user,
          session: data.session,
          profile
        };
      }

      return data;
    } catch (error) {
      throw new HttpException(
        error.message || 'Signin failed',
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const data = await this.authService.refreshToken(refreshTokenDto.refreshToken);
      return data;
    } catch (error) {
      throw new HttpException(
        'Token refresh failed',
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  @Post('signout')
  @UseGuards(JwtAuthGuard)
  async signOut(@Request() req) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      await this.authService.signOut(token);
      return { message: 'Signed out successfully' };
    } catch (error) {
      throw new HttpException(
        'Signout failed',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return {
      user: req.user,
      profile: req.profile
    };
  }

  @Get('test')
  test() {
    return { message: 'Auth module working!' };
  }
}