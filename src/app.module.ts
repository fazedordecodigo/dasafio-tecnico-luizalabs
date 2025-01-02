import { Module } from '@nestjs/common';
import { PortsModule } from './ports/ports.module';
import { AdaptersModule } from './adapters/adapters.module';

@Module({
  imports: [
    PortsModule,
    AdaptersModule
  ]
})
export class AppModule {}
