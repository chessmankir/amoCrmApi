import { ConfigService } from '@nestjs/config';

export const amoConfig = (configService: ConfigService) => ({
    domain: configService.getOrThrow<string>('AMO_DOMAIN'),
    clientId: configService.getOrThrow<string>('AMO_CLIENT_ID'),
    accessToken: configService.getOrThrow<string>('AMO_ACCESS_TOKEN'),
    clientSecret: configService.getOrThrow<string>('AMO_CLIENT_SECRET'),
    redirectUri: configService.getOrThrow<string>('AMO_REDIRECT_URI'),
    authCode: configService.getOrThrow<string>('AMO_AUTH_CODE'),
    birthdayFieldId: Number(configService.getOrThrow<string>('AMO_BIRTHDAY_FIELD')),
    ageFieldId: Number(configService.getOrThrow<string>('AMO_AGE_FIELD')),
});
