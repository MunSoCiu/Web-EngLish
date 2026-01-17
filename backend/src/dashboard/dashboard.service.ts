import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LessonProgress } from '../progress/lesson-progress.entity';
import { Course } from '../courses/course.entity';
import { User } from '../users/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(LessonProgress)
    private progressRepo: Repository<LessonProgress>,

    @InjectRepository(Course)
    private courseRepo: Repository<Course>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // ==========================
  // HOME DASHBOARD
  // ==========================
  async getHome(userId: number) {
    // 1️⃣ Progress
    const progress = await this.progressRepo.find({
      where: { user: { id: userId } },
      relations: ['lesson'],
      order: { updated_at: 'DESC' },
    });

    const completed = progress.filter((p) => p.completed).length;

    // 2️⃣ Continue learning (lesson gần nhất chưa xong)
    const continueLesson = progress.find((p) => !p.completed);

    // 3️⃣ Featured courses
    const featuredCourses = await this.courseRepo.find({
      where: { is_published: true },
      relations: ['instructor'],
      take: 4,
    });

    // 4️⃣ User info (mở rộng sau)
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    return {
      stats: {
        totalLessons: progress.length,
        completedLessons: completed,
        completionPercent:
          progress.length > 0
            ? Math.round((completed / progress.length) * 100)
            : 0,
      },

      continueLearning: continueLesson
        ? {
            lessonId: continueLesson.lesson.id,
            title: continueLesson.lesson.title,
            progress: continueLesson.progress_percent,
          }
        : null,

      featuredCourses,

      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      },
    };
  }
}
