import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import * as ContactTypes from './RDO/contact-webhook.rdo';
import { ContactWebhookResponse } from './RDO/contact-webhook.rdo';

@Controller('amo')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @Post('webhook/contact-added')
    public contactAdded(@Body() body: ContactTypes.ContactAddedWebhook): Promise<ContactWebhookResponse> {
        return this.contactService.handleAddContactWebhook(body);
    }

    @Post('webhook/contact-updated')
    public contactUpdated(@Body() body: ContactTypes.ContactUpdatedWebhook): Promise<ContactWebhookResponse> {
        return this.contactService.handleUpdateContactWebhook(body);
    }
}
