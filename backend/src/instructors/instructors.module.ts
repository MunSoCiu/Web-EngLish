import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from './instructor.entity';
import { InstructorsService } from './instructors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Instructor])],
  providers: [InstructorsService],
  exports: [InstructorsService, TypeOrmModule],
})
export class InstructorsModule {}
