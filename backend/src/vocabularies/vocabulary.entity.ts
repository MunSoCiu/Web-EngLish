import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Lesson } from '../lessons/lesson.entity';

@Entity('vocabularies')
export class Vocabulary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  word: string;

  @Column({ length: 255, nullable: true })
  meaning?: string;

  @Column('text', { nullable: true })
  example?: string;

  @Column({ nullable: true })
  audio?: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.vocabularies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;
}
