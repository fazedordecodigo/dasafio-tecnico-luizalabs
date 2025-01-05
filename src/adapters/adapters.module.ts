import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import {
  CUSTOMER_REPOSITORY,
  jwtConstants,
  USER_REPOSITORY,
} from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { CustomersController } from './controllers/customers.controller';
import { ProductsController } from './controllers/products.controller';
import { FavoritesController } from './controllers/favorites.controller';
import { PortsModule } from 'src/ports/ports.module';
import { CustomersRepository } from './repositories/customers.repository';
import { PrismaService } from './services/prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './controllers/users.controller';
import { RolesGuard } from './guards/role.guard';
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
