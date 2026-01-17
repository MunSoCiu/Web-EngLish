import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grammar } from './grammar.entity';

@Injectable()
export class GrammarsService {
  constructor(
    @InjectRepository(Grammar)
    private grammarRepo: Repository<Grammar>,
  ) {}

  // ========================
  // GET BY LESSON
  // ========================
  findByLesson(lessonId: number) {
    return this.grammarRepo.find({
      where: { lesson: { id: lessonId } },
    });
  }

  // ========================
  // CREATE (ADMIN / SEED)
  // ========================
  create(data: Partial<Grammar>) {
    const grammar = this.grammarRepo.create(data);
    return this.grammarRepo.save(grammar);
  }
}
