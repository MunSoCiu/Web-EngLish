import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

// ENTITIES
import { User } from '../users/user.entity';
import { Lesson } from '../lessons/lesson.entity';
import { Vocabulary } from '../vocabularies/vocabulary.entity';
import { Grammar } from '../grammars/grammar.entity';
import { Quiz } from '../quizzes/quiz.entity';
import { QuizQuestion } from '../quizzes/quiz-question.entity';
import { QuizOption } from '../quizzes/quiz-option.entity';
import { LessonProgress } from '../progress/lesson-progress.entity';
import { QuizAttempt } from '../quizzes/quiz-attempt.entity';

import { UserRole } from '../common/enums/role.enum';
import { LessonLevel } from '../common/enums/lesson-level.enum';
import { QuizType } from '../common/enums/quiz-type.enum';
import { Course } from '../courses/course.entity';

dotenv.config();

/* =======================
   DATA SOURCE
======================= */
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Lesson,
    Vocabulary,
    Grammar,
    Quiz,
    QuizQuestion,
    QuizOption,
    LessonProgress,
    QuizAttempt,
  ],
  synchronize: false,
});

/* =======================
   SEED
======================= */
async function seed() {
  await dataSource.initialize();
  console.log('🌱 Seeding database...');

  const userRepo = dataSource.getRepository(User);
  const lessonRepo = dataSource.getRepository(Lesson);
  const vocabRepo = dataSource.getRepository(Vocabulary);
  const grammarRepo = dataSource.getRepository(Grammar);
  const quizRepo = dataSource.getRepository(Quiz);
  const questionRepo = dataSource.getRepository(QuizQuestion);
  const optionRepo = dataSource.getRepository(QuizOption);
  const progressRepo = dataSource.getRepository(LessonProgress);
  const attemptRepo = dataSource.getRepository(QuizAttempt);
  const courseRepo = dataSource.getRepository(Course);

  /* =======================
     CLEAR TABLES
  ======================= */

  // con trước
  await dataSource.query('DELETE FROM quiz_attempts');
  await dataSource.query('DELETE FROM lesson_progress');
  await dataSource.query('DELETE FROM quiz_options');
  await dataSource.query('DELETE FROM quiz_questions');
  await dataSource.query('DELETE FROM quizzes');
  await dataSource.query('DELETE FROM vocabularies');
  await dataSource.query('DELETE FROM grammars');
  await dataSource.query('DELETE FROM lessons');
  await dataSource.query('DELETE FROM users');
  await dataSource.query('DELETE FROM courses');

  /* =======================
     USERS
  ======================= */
  const password = await bcrypt.hash('123456', 10);

  const users = await userRepo.save([
    userRepo.create({
      name: 'Admin',
      email: 'admin@english.com',
      password,
      role: UserRole.ADMIN,
    }),
    userRepo.create({ name: 'John Doe', email: 'john@mail.com', password }),
    userRepo.create({ name: 'Anna Smith', email: 'anna@mail.com', password }),
    userRepo.create({ name: 'David Lee', email: 'david@mail.com', password }),
    userRepo.create({ name: 'Maria Tran', email: 'maria@mail.com', password }),
  ]);

  /* ==============================
    Courses
    ============================== */

  const courses = await courseRepo.save([
    courseRepo.create({
      title: 'Basic English',
      category: 'General',
      level: 'A1',
      description: 'Basic English for beginners',
      price: 0,
    }),
  ]);

  /* =======================
     LESSONS
  ======================= */
  const lessons = await lessonRepo.save([
    lessonRepo.create({
      title: 'Basic Greetings',
      description: 'Learn how to greet in English',
      level: LessonLevel.BEGINNER,
      unit: 1,
      course: courses[0],
    }),
    lessonRepo.create({
      title: 'Daily Conversation',
      description: 'Common daily English conversations',
      level: LessonLevel.BEGINNER,
      unit: 1,
      course: courses[0],
    }),
    lessonRepo.create({
      title: 'Travel English',
      description: 'English for traveling',
      level: LessonLevel.INTERMEDIATE,
      unit: 1,
      course: courses[0],
    }),
    lessonRepo.create({
      title: 'Business Email',
      description: 'Write professional emails',
      level: LessonLevel.INTERMEDIATE,
      unit: 1,
      course: courses[0],
    }),
    lessonRepo.create({
      title: 'Interview Skills',
      description: 'English for job interviews',
      level: LessonLevel.ADVANCED,
      unit: 1,
      course: courses[0],
    }),
    lessonRepo.create({
      title: 'English Tenses',
      description: 'Understand all tenses',
      level: LessonLevel.BEGINNER,
      unit: 1,
      course: courses[0],
    }),
    lessonRepo.create({
      title: 'Phrasal Verbs',
      description: 'Common phrasal verbs',
      level: LessonLevel.INTERMEDIATE,
      unit: 1,
      course: courses[0],
    }),
    lessonRepo.create({
      title: 'Idioms',
      description: 'Popular English idioms',
      level: LessonLevel.ADVANCED,
      unit: 1,
      course: courses[0],
    }),
    lessonRepo.create({
      title: 'Pronunciation',
      description: 'Improve pronunciation',
      level: LessonLevel.BEGINNER,
      unit: 1,
      course: courses[0],
    }),
    lessonRepo.create({
      title: 'Presentation Skills',
      description: 'English for presentations',
      level: LessonLevel.ADVANCED,
      unit: 1,
      course: courses[0],
    }),
  ]);

  /* =======================
     VOCABULARIES
  ======================= */
  await vocabRepo.save([
    vocabRepo.create({
      lesson: lessons[0],
      word: 'Hello',
      meaning: 'Xin chào',
      example: 'Hello, how are you?',
    }),
    vocabRepo.create({
      lesson: lessons[0],
      word: 'Goodbye',
      meaning: 'Tạm biệt',
      example: 'Goodbye, see you later',
    }),
    vocabRepo.create({
      lesson: lessons[1],
      word: 'Breakfast',
      meaning: 'Bữa sáng',
      example: 'I eat breakfast at 7',
    }),
    vocabRepo.create({
      lesson: lessons[1],
      word: 'Dinner',
      meaning: 'Bữa tối',
      example: 'Dinner is ready',
    }),
    vocabRepo.create({
      lesson: lessons[2],
      word: 'Airport',
      meaning: 'Sân bay',
      example: 'Go to the airport early',
    }),
    vocabRepo.create({
      lesson: lessons[2],
      word: 'Passport',
      meaning: 'Hộ chiếu',
      example: 'Bring your passport',
    }),
    vocabRepo.create({
      lesson: lessons[3],
      word: 'Meeting',
      meaning: 'Cuộc họp',
      example: 'Attend a meeting',
    }),
    vocabRepo.create({
      lesson: lessons[3],
      word: 'Deadline',
      meaning: 'Hạn chót',
      example: 'Meet the deadline',
    }),
    vocabRepo.create({
      lesson: lessons[4],
      word: 'Strength',
      meaning: 'Điểm mạnh',
      example: 'My strength is teamwork',
    }),
    vocabRepo.create({
      lesson: lessons[4],
      word: 'Weakness',
      meaning: 'Điểm yếu',
      example: 'My weakness is impatience',
    }),
  ]);

  /* =======================
     QUIZZES
  ======================= */
  const quizzes = await quizRepo.save([
    quizRepo.create({
      lesson: lessons[0],
      title: 'Greeting Quiz',
      time_limit: 60,
    }),
    quizRepo.create({
      lesson: lessons[1],
      title: 'Daily Talk Quiz',
      time_limit: 90,
    }),
  ]);

  /* =======================
     QUIZ QUESTIONS
  ======================= */
  const questions = await questionRepo.save([
    questionRepo.create({
      quiz: quizzes[0],
      question: 'How do you say xin chào?',
      type: QuizType.MULTIPLE_CHOICE,
    }),
    questionRepo.create({
      quiz: quizzes[1],
      question: 'Breakfast is eaten in the morning?',
      type: QuizType.TRUE_FALSE,
    }),
  ]);

  /* =======================
     QUIZ OPTIONS
  ======================= */
  await optionRepo.save([
    optionRepo.create({
      question: questions[0],
      content: 'Hello',
      is_correct: true,
    }),
    optionRepo.create({
      question: questions[0],
      content: 'Goodbye',
      is_correct: false,
    }),
    optionRepo.create({
      question: questions[1],
      content: 'True',
      is_correct: true,
    }),
    optionRepo.create({
      question: questions[1],
      content: 'False',
      is_correct: false,
    }),
  ]);

  /* =======================
     LESSON PROGRESS
  ======================= */
  await progressRepo.save([
    progressRepo.create({
      user: users[1],
      lesson: lessons[0],
      completed: true,
      progress_percent: 100,
    }),
    progressRepo.create({
      user: users[1],
      lesson: lessons[1],
      completed: false,
      progress_percent: 50,
    }),
    progressRepo.create({
      user: users[2],
      lesson: lessons[0],
      completed: true,
      progress_percent: 100,
    }),
    progressRepo.create({
      user: users[3],
      lesson: lessons[2],
      completed: false,
      progress_percent: 30,
    }),
    progressRepo.create({
      user: users[4],
      lesson: lessons[3],
      completed: true,
      progress_percent: 100,
    }),
  ]);

  /* =======================
     QUIZ ATTEMPTS
  ======================= */
  await attemptRepo.save([
    attemptRepo.create({ user: users[1], quiz: quizzes[0], score: 90 }),
    attemptRepo.create({ user: users[2], quiz: quizzes[0], score: 80 }),
    attemptRepo.create({ user: users[3], quiz: quizzes[1], score: 70 }),
    attemptRepo.create({ user: users[4], quiz: quizzes[1], score: 85 }),
  ]);

  console.log('✅ Seed completed!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
