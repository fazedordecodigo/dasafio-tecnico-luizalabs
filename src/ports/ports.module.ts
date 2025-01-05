import { forwardRef, Module } from '@nestjs/common';
import { CUSTOMER_SERVICE, USER_SERVICE } from '@adapters/constants';
import { AdaptersModule } from '@adapters/adapters.module';
import {
  CustomersService,
  FavoritesService,
  ProductsService,
  UsersService,
} from '@ports/application/services';

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
    },
  ],
  exports: [FavoritesService, ProductsService, USER_SERVICE, CUSTOMER_SERVICE],
})
export class PortsModule {}
