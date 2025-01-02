import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { FavoritesModule } from './favorites/favorites.module';

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
