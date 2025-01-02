import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { FavoritesModule } from './favorites/favorites.module';
import { InfraestructureModule } from './infraestructure/infraestructure.module';
import { PortsModule } from './ports/ports.module';
import { AdaptersModule } from './adapters/adapters.module';

@Module({
  imports: [
    CustomersModule,
    ProductsModule,
    FavoritesModule,
    AuthModule,
    UsersModule,
    InfraestructureModule,
    PortsModule,
    AdaptersModule
  ]
})
export class AppModule {}
