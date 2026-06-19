import { ConfigService } from '@nestjs/config';

export const amoConfig = (configService: ConfigService) => ({
  domain: configService.getOrThrow<string>('AMO_DOMAIN'),
  client_id: configService.getOrThrow<string>('AMO_CLIENT_ID'),
  access_token: configService.getOrThrow<string>('AMO_ACCESS_TOKEN'),
  client_secret: configService.getOrThrow<string>('AMO_CLIENT_SECRET'),
  redirect_uri: configService.getOrThrow<string>('AMO_REDIRECT_URI'),
  auth_code: configService.getOrThrow<string>('AMO_AUTH_CODE'),
  birthday_field_id: Number(
    configService.getOrThrow<string>('AMO_BIRTHDAY_FIELD'),
  ),
  age_field_id: Number(configService.getOrThrow<string>('AMO_AGE_FIELD')),
});
