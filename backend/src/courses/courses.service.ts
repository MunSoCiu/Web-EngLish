import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Course } from './course.entity';
import { Instructor } from '../instructors/instructor.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepo: Repository<Course>,

    @InjectRepository(Instructor)
    private instructorRepo: Repository<Instructor>,
  ) {}

  // ========================
  // GET ALL COURSES
  // ========================
  findAll() {
    return this.courseRepo.find({
      where: { is_published: true },
      relations: ['instructor'],
    });
  }

  // ========================
  // GET COURSE DETAIL
  // ========================
  async findOne(id: number) {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ['instructor', 'lessons'],
    });

    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  // ========================
  // CREATE COURSE (ADMIN)
  // ========================
  async create(dto: CreateCourseDto) {
    let instructor: Instructor | undefined;

    if (dto.instructorId) {
      instructor =
        (await this.instructorRepo.findOne({
          where: { id: dto.instructorId },
        })) || undefined;
    }

    const course = this.courseRepo.create({
      title: dto.title,
      category: dto.category,
      level: dto.level,
      description: dto.description,
      thumbnail: dto.thumbnail,
      price: dto.price ?? 0,
      is_published: dto.is_published ?? true,
      instructor, // ✅ undefined hoặc Instructor
    });

    return this.courseRepo.save(course);
  }
}
