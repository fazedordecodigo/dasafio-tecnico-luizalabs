import { forwardRef, Module } from '@nestjs/common';
import { CustomersService } from './Application/Services/customers.service';
import { FavoritesService } from './Application/Services/favorites.service';
import { ProductsService } from './Application/Services/products.service';
import { UsersService } from './Application/Services/users.service';
import { CUSTOMER_SERVICE, USER_SERVICE } from 'src/adapters/constants';
import { AdaptersModule } from 'src/adapters/adapters.module';

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
