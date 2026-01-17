import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('me')
  me(@CurrentUser() user) {
    return this.service.findById(user.id || user.sub);
  }

  @Put('me')
  update(@CurrentUser() user, @Body() dto: UpdateProfileDto) {
    return this.service.updateProfile(user.id || user.sub, dto);
  }
}
