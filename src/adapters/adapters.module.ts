import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './Controllers/auth.controller';
import { AuthService } from './Services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import {
  CUSTOMER_REPOSITORY,
  jwtConstants,
  USER_REPOSITORY,
} from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './Guards/auth.guard';
import { CustomersController } from './Controllers/customers.controller';
import { ProductsController } from './Controllers/products.controller';
import { FavoritesController } from './Controllers/favorites.controller';
import { PortsModule } from 'src/ports/ports.module';
import { CustomersRepository } from './Repositories/customers.repository';
import { PrismaService } from './Services/prisma.service';
import { UsersRepository } from './Repositories/users.repository';
import { UsersController } from './Controllers/users.controller';
import { RolesGuard } from './Guards/role.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

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
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
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
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomersRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UsersRepository,
    }
  ],
  exports: [CUSTOMER_REPOSITORY, USER_REPOSITORY],
})
export class AdaptersModule {}
