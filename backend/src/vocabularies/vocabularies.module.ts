import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vocabulary } from './vocabulary.entity';
import { VocabulariesService } from './vocabularies.service';
import { VocabulariesController } from './vocabularies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vocabulary])],
  controllers: [VocabulariesController],
  providers: [VocabulariesService],
  exports: [VocabulariesService],
})
export class VocabulariesModule {}
