import { Module } from '@nestjs/common';
import { PrismaService } from './repositories/prisma.service';

@Module({
    providers: [PrismaService]
})
export class InfraestructureModule {}
