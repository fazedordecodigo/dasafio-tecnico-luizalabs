import { SetMetadata } from "@nestjs/common";

export const jwtConstants = {
  secret: '51400F15-DE93-4243-A25A-90210DC6C450',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);