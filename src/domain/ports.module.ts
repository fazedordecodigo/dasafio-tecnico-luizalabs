import { forwardRef, Module } from '@nestjs/common';
import {
  CUSTOMER_SERVICE,
  PRODUCT_SERVICE,
  USER_SERVICE,
} from '@adapters/constants';
import { AdaptersModule } from '@adapters/adapters.module';
import {
  CustomersService,
  ProductsService,
  UsersService,
} from '@domain/services';

@Module({
  imports: [forwardRef(() => AdaptersModule)],
  providers: [
    CustomersService,
    {
      provide: USER_SERVICE,
      useClass: UsersService,
    },
    {
      provide: CUSTOMER_SERVICE,
      useClass: CustomersService,
    },
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductsService,
    },
  ],
  exports: [
    USER_SERVICE,
    CUSTOMER_SERVICE,
    PRODUCT_SERVICE,
  ],
})
export class PortsModule {}
