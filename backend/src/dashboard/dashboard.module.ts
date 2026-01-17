import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

import { LessonProgress } from '../progress/lesson-progress.entity';
import { Course } from '../courses/course.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonProgress, Course, User])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
