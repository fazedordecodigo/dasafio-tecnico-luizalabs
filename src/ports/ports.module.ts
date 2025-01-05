import { forwardRef, Module } from '@nestjs/common';
import { CustomersService } from './application/services/customers.service';
import { FavoritesService } from './application/services/favorites.service';
import { ProductsService } from './application/services/products.service';
import { UsersService } from './application/services/users.service';
import { CUSTOMER_SERVICE, USER_SERVICE } from '@adapters/constants';
import { AdaptersModule } from '@adapters/adapters.module';

@Module({
    imports: [forwardRef(() => AdaptersModule)],
    providers: [
        CustomersService,
        FavoritesService,
        ProductsService,
        {
            provide: USER_SERVICE,
            useClass: UsersService,
        },
        {
            provide: CUSTOMER_SERVICE,
            useClass: CustomersService,
        }
    ],
    exports: [
        FavoritesService,
        ProductsService,
        USER_SERVICE,
        CUSTOMER_SERVICE,
    ]
})
export class PortsModule {}
