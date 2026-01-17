import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private repo: Repository<Review>,
  ) {}

  findByCourse(courseId: number) {
    return this.repo.find({
      where: { course: { id: courseId } },
      relations: ['user'],
    });
  }

  create(data: Partial<Review>) {
    const review = this.repo.create(data);
    return this.repo.save(review);
  }
}
