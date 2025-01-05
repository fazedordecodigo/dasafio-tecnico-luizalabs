import { Module } from '@nestjs/common';
import { PortsModule } from '@ports/ports.module';
import { AdaptersModule } from '@adapters/adapters.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PortsModule,
    AdaptersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.test.local'
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
  ]
})
export class AppModule {}
