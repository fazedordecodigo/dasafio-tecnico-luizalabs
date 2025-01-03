import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './Controllers/auth.controller';
import { AuthService } from './Services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CUSTOMER_REPOSITORY, jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './Guards/auth.guard';
import { CustomersController } from './Controllers/customers.controller';
import { ProductsController } from './Controllers/products.controller';
import { FavoritesController } from './Controllers/favorites.controller';
import { PortsModule } from 'src/ports/ports.module';
import { CustomersRepository } from './Repositories/customers.repository';
import { PrismaService } from './Services/prisma.service';

@Module({
  controllers: [AuthController, CustomersController, ProductsController, FavoritesController],
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
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomersRepository
    }
  ],
  exports: [CUSTOMER_REPOSITORY],
})
export class AdaptersModule {}
