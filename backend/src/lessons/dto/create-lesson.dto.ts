import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { LessonLevel } from '../../common/enums/lesson-level.enum';

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  unit: number;

  @IsOptional()
  @IsEnum(LessonLevel)
  level?: LessonLevel;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  video_url?: string;

  @IsOptional()
  @IsBoolean()
  is_published?: boolean;

  @IsNumber()
  courseId: number;
}
