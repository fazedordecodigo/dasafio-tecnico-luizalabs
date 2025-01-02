import { Module } from '@nestjs/common';
import { CustomersService } from './Application/Services/customers.service';
import { FavoritesService } from './Application/Services/favorites.service';
import { ProductsService } from './Application/Services/products.service';
import { UsersService } from './Application/Services/users.service';
import { USER_SERVICE } from 'src/adapters/constants';

@Module({
    providers: [
        CustomersService,
        FavoritesService,
        ProductsService,
        {
            provide: USER_SERVICE,
            useClass: UsersService,
        }
    ],
    exports: [
        CustomersService,
        FavoritesService,
        ProductsService,
        {
            provide: USER_SERVICE,
            useClass: UsersService,
        }
    ]
})
export class PortsModule {}
