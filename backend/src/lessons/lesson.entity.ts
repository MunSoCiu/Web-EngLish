import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Course } from '../courses/course.entity';
import { Vocabulary } from '../vocabularies/vocabulary.entity';
import { Grammar } from '../grammars/grammar.entity';
import { Quiz } from '../quizzes/quiz.entity';
import { LessonProgress } from '../progress/lesson-progress.entity';
import { LessonLevel } from '../common/enums/lesson-level.enum';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  // Unit 1, Unit 2, Unit 3...
  @Column()
  unit: number;

  @Column({
    type: 'enum',
    enum: LessonLevel,
    nullable: true,
  })
  level?: LessonLevel;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ nullable: true })
  video_url?: string;

  @Column({ default: true })
  is_published: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // ======================
  // RELATIONS
  // ======================
  @ManyToOne(() => Course, (course) => course.lessons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => Vocabulary, (v) => v.lesson)
  vocabularies: Vocabulary[];

  @OneToMany(() => Grammar, (g) => g.lesson)
  grammars: Grammar[];

  @OneToMany(() => Quiz, (q) => q.lesson)
  quizzes: Quiz[];

  @OneToMany(() => LessonProgress, (p) => p.lesson)
  progress: LessonProgress[];
}
