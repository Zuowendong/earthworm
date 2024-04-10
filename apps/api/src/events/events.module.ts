import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { EventGateway } from './events.gateway';

@Module({
  providers: [EventGateway],
  imports: [UserModule],
})
export class EventsModule {}
