import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Quiz } from './quiz.entity';
import { QuizAttempt } from './quiz-attempt.entity';
import { LessonProgress } from '../progress/lesson-progress.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepo: Repository<Quiz>,

    @InjectRepository(QuizAttempt)
    private attemptRepo: Repository<QuizAttempt>,

    @InjectRepository(LessonProgress)
    private progressRepo: Repository<LessonProgress>,
  ) {}

  // =========================
  // GET QUIZ DETAIL
  // =========================
  async getQuiz(quizId: number) {
    const quiz = await this.quizRepo.findOne({
      where: { id: quizId },
      relations: ['questions', 'questions.options'],
    });

    if (!quiz) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  // =========================
  // SUBMIT QUIZ
  // =========================
  async submit(userId: number, quizId: number, score: number) {
    const quiz = await this.quizRepo.findOne({
      where: { id: quizId },
      relations: ['lesson'],
    });

    if (!quiz) throw new NotFoundException('Quiz not found');

    // 1️⃣ Save attempt
    const attempt = this.attemptRepo.create({
      user: { id: userId } as any,
      quiz: { id: quizId } as any,
      score,
    });
    await this.attemptRepo.save(attempt);

    // 2️⃣ Update lesson progress
    await this.progressRepo.upsert(
      {
        user: { id: userId } as any,
        lesson: { id: quiz.lesson.id } as any,
        progress_percent: score,
        completed: score >= 70,
      },
      ['user', 'lesson'],
    );

    return attempt;
  }
}
