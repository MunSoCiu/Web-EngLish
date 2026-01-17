import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  updateProfile(userId: number, dto: UpdateProfileDto) {
    return this.repo.update(userId, dto);
  }
}
