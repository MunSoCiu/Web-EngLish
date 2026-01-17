import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instructor } from './instructor.entity';

@Injectable()
export class InstructorsService {
  constructor(
    @InjectRepository(Instructor)
    private instructorRepo: Repository<Instructor>,
  ) {}

  // ========================
  // CREATE (ADMIN / SEED)
  // ========================
  create(data: Partial<Instructor>) {
    const instructor = this.instructorRepo.create(data);
    return this.instructorRepo.save(instructor);
  }

  // ========================
  // FIND ALL
  // ========================
  findAll() {
    return this.instructorRepo.find({
      relations: ['courses'],
    });
  }

  // ========================
  // FIND ONE
  // ========================
  async findOne(id: number) {
    const instructor = await this.instructorRepo.findOne({
      where: { id },
      relations: ['courses'],
    });

    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    return instructor;
  }
}
