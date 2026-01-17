import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Instructor } from '../instructors/instructor.entity';
import { Lesson } from '../lessons/lesson.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 50 })
  category: string; // Daily, Travel, Business

  @Column({ length: 20 })
  level: string; // A1, A2, B1, B2

  @Column('text')
  description: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: true })
  is_published: boolean;

  @ManyToOne(() => Instructor, (i) => i.courses, { nullable: true })
  instructor?: Instructor;

  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];
}
