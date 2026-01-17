import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly service: ReviewsService) {}

  @Get('course/:courseId')
  getByCourse(@Param('courseId') id: number) {
    return this.service.findByCourse(+id);
  }

  @Post('course/:courseId')
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser() user,
    @Param('courseId') courseId: number,
    @Body() body: { rating: number; comment?: string },
  ) {
    return this.service.create({
      rating: body.rating,
      comment: body.comment,
      course: { id: +courseId } as any,
      user: { id: user.id || user.sub } as any,
    });
  }
}
