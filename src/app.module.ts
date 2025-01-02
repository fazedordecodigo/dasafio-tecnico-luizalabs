import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CustomersModule,
    ProductsModule,
    FavoritesModule,
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
