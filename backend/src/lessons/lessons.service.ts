import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Lesson } from './lesson.entity';
import { Course } from '../courses/course.entity';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepo: Repository<Lesson>,

    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  // ========================
  // GET LESSONS BY COURSE
  // ========================
  findByCourse(courseId: number) {
    return this.lessonRepo.find({
      where: {
        course: { id: courseId },
        is_published: true,
      },
      order: { unit: 'ASC' },
    });
  }

  // ========================
  // GET LESSON DETAIL
  // ========================
  async findOne(id: number) {
    const lesson = await this.lessonRepo.findOne({
      where: { id },
      relations: ['vocabularies', 'grammars', 'quizzes'],
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson;
  }

  // ========================
  // CREATE LESSON (ADMIN)
  // ========================
  async create(dto: CreateLessonDto) {
    const course = await this.courseRepo.findOne({
      where: { id: dto.courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    const lesson = this.lessonRepo.create({
      title: dto.title,
      description: dto.description,
      unit: dto.unit,
      level: dto.level,
      thumbnail: dto.thumbnail,
      video_url: dto.video_url,
      is_published: dto.is_published ?? true,
      course,
    });

    return this.lessonRepo.save(lesson);
  }
}
