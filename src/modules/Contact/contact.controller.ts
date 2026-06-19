import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import * as ContactTypes from './types/Contact';

@Controller('amo')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('webhook/contact-added')
  public contactAdded(@Body() body: ContactTypes.ContactWebhook) {
    return this.contactService.handleContactWebhook(body);
  }
}
