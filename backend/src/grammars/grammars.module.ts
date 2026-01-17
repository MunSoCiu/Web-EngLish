import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grammar } from './grammar.entity';
import { GrammarsService } from './grammars.service';
import { GrammarsController } from './grammars.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Grammar])],
  controllers: [GrammarsController],
  providers: [GrammarsService],
  exports: [GrammarsService],
})
export class GrammarsModule {}
