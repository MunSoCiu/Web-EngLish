import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from '../courses/course.entity';

@Entity('instructors')
export class Instructor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ length: 150, nullable: true })
  title?: string; // Senior English Teacher, IELTS Trainer

  @Column('text', { nullable: true })
  bio?: string;

  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];
}
