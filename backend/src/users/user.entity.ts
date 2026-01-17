import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LessonProgress } from '../progress/lesson-progress.entity';
import { QuizAttempt } from '../quizzes/quiz-attempt.entity';
import { UserRole } from '../common/enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // ===================
  // RELATIONS
  // ===================
  @OneToMany(() => LessonProgress, (p) => p.user)
  lessonProgress: LessonProgress[];

  @OneToMany(() => QuizAttempt, (a) => a.user)
  quizAttempts: QuizAttempt[];
}
