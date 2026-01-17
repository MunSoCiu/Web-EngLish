import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  level: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsBoolean()
  is_published?: boolean;

  @IsOptional()
  @IsNumber()
  instructorId?: number;
}
