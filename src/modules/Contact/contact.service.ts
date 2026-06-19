import { Injectable } from '@nestjs/common';
import {
  Contact,
  ContactWebhook,
  ContactWebhookResponse,
} from './types/Contact';
import axios from 'axios';
import { amoConfig } from '../../../config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactService {
  private readonly config: ReturnType<typeof amoConfig>;

  constructor(private readonly configService: ConfigService) {
    this.config = amoConfig(this.configService);
  }

  public async handleContactWebhook(
    body: ContactWebhook,
  ): Promise<ContactWebhookResponse> {
    console.log('AMO CRM WEBHOOK');
    console.log(JSON.stringify(body, null, 2));

    const contact = body?.contacts?.add?.[0];

    if (!contact) {
      return {
        success: false,
        message: 'not found user',
      };
    }

    const contactId = Number(contact.id);
    console.log(contactId);
    const birthdayTs = this.getBirthdayFromTs(contact);
    console.log(birthdayTs);
    if (!birthdayTs) {
      return {
        success: false,
        message: 'Field birthday not found.',
      };
    }

    const age = this.calculateAgeFromTs(birthdayTs);
    console.log(age);
    await this.updateContactAge(contactId, age);

    return {
      success: true,
      contactId,
      age,
    };
  }

  private getBirthdayFromTs(contact: Contact): number | null {
    const birthdayField = contact.custom_fields?.find(
      (field) => Number(field.id) === this.config.birthday_field_id,
    );

    const value = birthdayField?.values?.[0];

    if (typeof value !== 'string') {
      return null;
    }

    return Number(value);
  }

  private calculateAgeFromTs(ts: number): number {
    const birthDate = new Date(ts * 1000);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const birthdayThisYear = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate(),
    );

    if (today < birthdayThisYear) {
      age--;
    }

    return age;
  }

  public async updateContactAge(contactId: number, age: number): Promise<void> {
    const contactUrl = `${this.config.domain}/api/v4/contacts`;
    console.log(contactUrl);
    console.log(this.config.access_token);
    await axios.patch(
      contactUrl,
      [
        {
          id: contactId,
          custom_fields_values: [
            {
              field_id: this.config.age_field_id,
              values: [{ value: age }],
            },
          ],
        },
      ],
      {
        headers: {
          Authorization: `Bearer ${this.config.access_token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
