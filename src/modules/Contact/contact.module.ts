import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { AmoAuthenticationModule } from '../AmoAuthentication/amo-authentication.module';

@Module({
  imports: [AmoAuthenticationModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}