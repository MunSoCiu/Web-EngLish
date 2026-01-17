import { Controller, Get, Param } from '@nestjs/common';
import { GrammarsService } from './grammars.service';

@Controller('grammars')
export class GrammarsController {
  constructor(private readonly service: GrammarsService) {}

  @Get('lesson/:lessonId')
  getByLesson(@Param('lessonId') lessonId: number) {
    return this.service.findByLesson(+lessonId);
  }
}
