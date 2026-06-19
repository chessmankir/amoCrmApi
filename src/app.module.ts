import { Module } from '@nestjs/common';
import { ContactModule } from './modules/Contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AMO_DOMAIN: Joi.string().required(),
        AMO_CLIENT_ID: Joi.string().required(),
        AMO_ACCESS_TOKEN: Joi.string().required(),
        AMO_REDIRECT_URI: Joi.string().required(),
        AMO_AUTH_CODE: Joi.string().required(),
        AMO_BIRTHDAY_FIELD: Joi.string().required(),
        AMO_AGE_FIELD: Joi.string().required(),
      }),
    }),
    ContactModule,
  ],
})
export class AppModule {}
