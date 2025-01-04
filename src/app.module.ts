import { Module } from '@nestjs/common';
import { PortsModule } from './ports/ports.module';
import { AdaptersModule } from './adapters/adapters.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    PortsModule,
    AdaptersModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
  ]
})
export class AppModule {}
