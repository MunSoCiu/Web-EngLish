import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStats } from './user-stats.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(UserStats)
    private statsRepo: Repository<UserStats>,
  ) {}

  async getMyStats(userId: number) {
    let stats = await this.statsRepo.findOne({
      where: { user: { id: userId } },
    });

    if (!stats) {
      stats = this.statsRepo.create({
        user: { id: userId } as any,
      });
      await this.statsRepo.save(stats);
    }

    return stats;
  }

  async addXP(userId: number, xp: number) {
    const stats = await this.getMyStats(userId);
    stats.xp += xp;
    stats.streak += 1;
    return this.statsRepo.save(stats);
  }
}
