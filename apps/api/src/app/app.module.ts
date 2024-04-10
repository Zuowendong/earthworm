import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '../auth/auth.module';
import { CourseHistoryModule } from '../course-history/course-history.module';
import { CourseModule } from '../course/course.module';
import { CronJobModule } from '../cron-job/cron-job.module';
import { EventsModule } from '../events/events.module';
import { GameModule } from '../game/game.module';
import { GlobalModule } from '../global/global.module';
import { RankModule } from '../rank/rank.module';
import { ToolModule } from '../tool/tool.module';
import { UserProgressModule } from '../user-progress/user-progress.module';
import { UserModule } from '../user/user.module';
// import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [
    GlobalModule,
    UserModule,
    AuthModule,
    CourseModule,
    UserProgressModule,
    ToolModule,
    RankModule,
    GameModule,
    CronJobModule,
    CourseHistoryModule,
    // WebsocketModule,
    EventsModule,
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        url: process.env.REDIS_URL,
        options: {
          password: process.env.REDIS_PASSWORD,
        },
      }),
    }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
