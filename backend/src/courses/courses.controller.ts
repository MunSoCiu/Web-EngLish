import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly service: CoursesService) {}

  // ========================
  // PUBLIC
  // ========================
  @Get()
  getAll() {
    return this.service.findAll();
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
  create(@Body() dto: CreateCourseDto) {
    return this.service.create(dto);
  }
}
