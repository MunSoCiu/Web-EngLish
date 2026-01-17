import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Lesson } from '../lessons/lesson.entity';

@Entity('lesson_progress')
@Unique(['user', 'lesson'])
export class LessonProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (u) => u.lessonProgress)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Lesson, (l) => l.progress)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: 0 })
  progress_percent: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
