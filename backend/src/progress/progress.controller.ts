import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private service: ProgressService) {}

  @Get()
  getMine(@Req() req) {
    return this.service.getMyProgress(req.user.sub);
  }

  @Post(':lessonId')
  update(
    @Req() req,
    @Param('lessonId') lessonId: number,
    @Body('progress') progress: number,
  ) {
    return this.service.updateProgress(req.user.sub, +lessonId, progress);
  }
}
