import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly service: QuizzesService) {}

  @Get(':quizId')
  getQuiz(@Param('quizId') quizId: number) {
    return this.service.getQuiz(+quizId);
  }

  @Post(':quizId/submit')
  @UseGuards(JwtAuthGuard)
  submit(
    @Req() req,
    @Param('quizId') quizId: number,
    @Body() dto: SubmitQuizDto,
  ) {
    return this.service.submit(req.user.id || req.user.sub, +quizId, dto.score);
  }
}
