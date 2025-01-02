import { Module } from '@nestjs/common';
import { CustomersService } from './Application/Services/customers.service';
import { FavoritesService } from './Application/Services/favorites.service';
import { ProductsService } from './Application/Services/products.service';
import { UsersService } from './Application/Services/users.service';

@Module({
    providers: [CustomersService, FavoritesService, ProductsService, UsersService],
})
export class PortsModule {}
