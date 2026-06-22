import { Module } from '@nestjs/common';
import { ContactModule } from './modules/contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { Env } from './core/enums/env.enum';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                [Env.AmoDomain]: Joi.string().required(),
                [Env.AmoClientId]: Joi.string().required(),
                [Env.AmoAccessToken]: Joi.string().required(),
                [Env.AmoClientSecret]: Joi.string().required(),
                [Env.AmoRedirectUri]: Joi.string().required(),
                [Env.AmoAuthCode]: Joi.string().required(),
                [Env.AmoBirthdayField]: Joi.number().required(),
                [Env.AmoAgeField]: Joi.number().required(),
            }),
        }),
        ContactModule,
    ],
})
export class AppModule {}
