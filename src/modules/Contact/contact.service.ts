import { Injectable } from '@nestjs/common';
import { ContactAddedWebhook, ContactUpdatedWebhook, ContactWebhookRdo, ContactWebhookResponse } from './RDO/contact-webhook.rdo';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Env } from '../../core/enums/env.enum';

@Injectable()
export class ContactService {
    constructor(private readonly configService: ConfigService) {}

    public async handleAddContactWebhook(body: ContactAddedWebhook): Promise<ContactWebhookResponse> {
        console.log('handle contact webhook');
        console.log(JSON.stringify(body, null, 2));
        const contact = body?.contacts?.add?.[0];
        return this.processContact(contact);
    }

    public async handleUpdateContactWebhook(body: ContactUpdatedWebhook): Promise<ContactWebhookResponse> {
        const contact = body.contacts.update?.[0];
        return this.processContact(contact);
    }

    private async processContact(contact?: ContactWebhookRdo): Promise<ContactWebhookResponse> {
        if (!contact) {
            return {
                success: false,
                message: 'not found user',
            };
        }

        const contactId = Number(contact.id);
        const birthdayTimestamp = this.getBirthdayFromTimestamp(contact);
        if (!birthdayTimestamp) {
            return {
                success: false,
                message: 'Field birthday not found.',
            };
        }

        const age = this.calculateAgeFromTs(birthdayTimestamp);
        const currentAge = this.getCurrentAge(contact);
        if (currentAge === age) {
            return {
                success: true,
                message: 'Successfully updated contact age',
                contactId,
                age,
            };
        }
        await this.updateContactAge(contactId, age);
        return {
            success: true,
            message: 'Successfully updated contact',
            contactId,
            age,
        };
    }

    private getBirthdayFromTimestamp(contact: ContactWebhookRdo): number | null {
        const birthdayField = contact.custom_fields?.find(
            (field) => Number(field.id) === Number(this.configService.getOrThrow<string>(Env.AmoBirthdayField))
        );

        const value = birthdayField?.values?.[0];

        if (typeof value !== 'string') {
            return null;
        }

        return Number(value);
    }

    private getCurrentAge(contact: ContactWebhookRdo): number | null {
        const ageField = contact.custom_fields?.find(
            (field) => Number(field.id) === Number(this.configService.getOrThrow<string>(Env.AmoAgeField))
        );

        const value = ageField?.values?.[0];

        if (typeof value === 'string') {
            return Number(value);
        }

        if (value && typeof value === 'object') {
            return Number(value.value);
        }

        return null;
    }

    private calculateAgeFromTs(ts: number): number {
        const birthDate = new Date(ts * 1000);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        const birthdayThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

        if (today < birthdayThisYear) {
            age--;
        }

        return age;
    }

    public async updateContactAge(contactId: number, age: number): Promise<void> {
        const contactUrl = `${this.configService.getOrThrow<string>(Env.AmoDomain)}/api/v4/contacts`;
        await axios.patch(
            contactUrl,
            [
                {
                    id: contactId,
                    custom_fields_values: [
                        {
                            field_id: this.configService.getOrThrow<string>(Env.AmoAgeField),
                            values: [{ value: age }],
                        },
                    ],
                },
            ],
            {
                headers: {
                    Authorization: `Bearer ${this.configService.getOrThrow<string>(Env.AmoAccessToken)}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}
