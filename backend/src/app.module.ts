import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config';
import { databaseConfig } from './config/database.config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LessonsModule } from './lessons/lessons.module';
import { VocabulariesModule } from './vocabularies/vocabularies.module';
import { GrammarsModule } from './grammars/grammars.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { ProgressModule } from './progress/progress.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { StatsModule } from './stats/stats.module';
import { ReviewsModule } from './reviews/reviews.module';
import { InstructorsModule } from './instructors/instructors.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    // 🌍 GLOBAL CONFIG
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),

    // 🗄️ DATABASE (CHỈ 1 LẦN)
    TypeOrmModule.forRoot(databaseConfig()),

    // 🔐 AUTH + CORE MODULES
    AuthModule,
    UsersModule,

    // 📘 LEARNING
    InstructorsModule,
    CoursesModule,
    LessonsModule,
    VocabulariesModule,
    GrammarsModule,
    QuizzesModule,
    ProgressModule,

    // 📊 UI / STATS
    DashboardModule,
    StatsModule,
    ReviewsModule,
  ],
})
export class AppModule {}
