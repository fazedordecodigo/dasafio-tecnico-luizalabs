import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PortsModule } from '@ports/ports.module';
import { CUSTOMER_REPOSITORY, USER_REPOSITORY } from '@adapters/constants';
import {
  AuthController,
  CustomersController,
  ProductsController,
  FavoritesController,
  UsersController,
} from '@adapters/controllers';
import { AuthGuard, RoleGuard } from '@adapters/guards';
import { CustomersRepository, UsersRepository } from '@adapters/repositories';
import { AuthService, PrismaService } from '@adapters/services';

@Module({
  controllers: [
    AuthController,
    CustomersController,
    ProductsController,
    FavoritesController,
    UsersController,
  ],
  imports: [
    forwardRef(() => PortsModule),
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomersRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UsersRepository,
    },
  ],
  exports: [CUSTOMER_REPOSITORY, USER_REPOSITORY],
})
export class AdaptersModule {}
