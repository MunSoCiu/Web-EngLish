import { IsNumber } from 'class-validator';

export class SubmitQuizDto {
  @IsNumber()
  score: number;
}
