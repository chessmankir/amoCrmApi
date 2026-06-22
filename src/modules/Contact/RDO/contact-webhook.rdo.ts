export type ContactWebhookRdo = {
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

export type BaseContactWebhook = {
    account: {
        subdomain: string;
        id: string;
        _links: {
            self: string;
        };
    };
};

export type ContactAddedWebhook = BaseContactWebhook & {
    contacts: {
        add: ContactWebhookRdo[];
    };
};

export type ContactUpdatedWebhook = BaseContactWebhook & {
    contacts: {
        update: ContactWebhookRdo[];
    };
};

export type ContactWebhookResponse = {
    success: boolean;
    message: string;
    age?: number;
    contactId?: number;
};
