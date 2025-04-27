import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('my-details')
  @UseGuards(AuthGuard('jwt'))
  getUserDetails(@Req() req: { user: { id: string } }) {
    return this.userService.getUser(req.user.id);
  }
}
