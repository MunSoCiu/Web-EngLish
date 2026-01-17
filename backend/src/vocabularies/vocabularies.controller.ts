import { Controller, Get, Param } from '@nestjs/common';
import { VocabulariesService } from './vocabularies.service';

@Controller('vocabularies')
export class VocabulariesController {
  constructor(private readonly service: VocabulariesService) {}

  @Get('lesson/:lessonId')
  getByLesson(@Param('lessonId') lessonId: number) {
    return this.service.findByLesson(+lessonId);
  }
}
