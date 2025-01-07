import { Module } from '@nestjs/common';
import { AdaptersModule } from '@adapters/adapters.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { DomainModule } from '@domain/domain.module';

@Module({
  imports: [
    DomainModule,
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
