import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Lesson } from '../lessons/lesson.entity';

@Entity('grammars')
export class Grammar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: true })
  title?: string;

  @Column('text', { nullable: true })
  content?: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.grammars, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;
}
