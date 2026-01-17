import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonProgress } from './lesson-progress.entity';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LessonProgress])],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
