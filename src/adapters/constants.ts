import { SetMetadata } from "@nestjs/common";

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const USER_SERVICE = 'UsersServiceProtocol';
export const USER_REPOSITORY = 'UsersRepositoryProtocol';
export const CUSTOMER_SERVICE = 'CustomerServiceProtocol';
export const PRODUCT_SERVICE = 'ProductServiceProtocol';
export const CUSTOMER_REPOSITORY = 'CustomersRepositoryProtocol';