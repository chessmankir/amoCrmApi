export type Contact = {
  id: string;
  name: string;
  custom_fields: ContactField[];
};

export type ContactField = {
  id: string;
  name: string;
  values: ContactFieldValue[];
};

export type ContactFieldValue =
  | string
  | {
      value: string;
    };

export type ContactWebhook = {
  account: {
    subdomain: string;
    id: string;
    _links: {
      self: string;
    };
  };
  contacts: {
    add: Contact[];
  };
};

export type ContactWebhookResponse = {
  success: boolean;
  message: string;
  age?: number;
  contactId?: number;
};
