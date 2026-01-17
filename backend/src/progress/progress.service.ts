import { Injectable } from '@nestjs/common';
import { LessonProgress } from './lesson-progress.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(LessonProgress)
    private repo: Repository<LessonProgress>,
  ) {}

  getMyProgress(userId: number) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['lesson'],
    });
  }

  updateProgress(userId: number, lessonId: number, progress: number) {
    return this.repo.upsert(
      {
        user: { id: userId },
        lesson: { id: lessonId },
        progress_percent: progress,
        completed: progress === 100,
      },
      ['user', 'lesson'],
    );
  }
}
