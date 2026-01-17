import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';

import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly service: LessonsService) {}

  // ========================
  // PUBLIC
  // ========================
  @Get('course/:courseId')
  getByCourse(@Param('courseId') courseId: number) {
    return this.service.findByCourse(+courseId);
  }

  @Get(':id')
  getDetail(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  // ========================
  // ADMIN
  // ========================
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateLessonDto) {
    return this.service.create(dto);
  }
}
