import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vocabulary } from './vocabulary.entity';

@Injectable()
export class VocabulariesService {
  constructor(
    @InjectRepository(Vocabulary)
    private vocabRepo: Repository<Vocabulary>,
  ) {}

  // ========================
  // GET BY LESSON
  // ========================
  findByLesson(lessonId: number) {
    return this.vocabRepo.find({
      where: { lesson: { id: lessonId } },
    });
  }

  // ========================
  // CREATE (ADMIN / SEED)
  // ========================
  create(data: Partial<Vocabulary>) {
    const vocab = this.vocabRepo.create(data);
    return this.vocabRepo.save(vocab);
  }
}
