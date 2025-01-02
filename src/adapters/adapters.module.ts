import { Module } from '@nestjs/common';
import { AuthController } from './Controllers/auth.controller';
import { AuthService } from './Services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './Guards/auth.guard';
import { CustomersController } from './Controllers/customers.controller';
import { ProductsController } from './Controllers/products.controller';
import { FavoritesController } from './Controllers/favorites.controller';

@Module({
  controllers: [AuthController, CustomersController, ProductsController, FavoritesController],
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AdaptersModule {}
