# Environment Variables

## AMO_DOMAIN

Домен аккаунта amoCRM.

Используется для выполнения запросов к API amoCRM.

Пример:

```env
AMO_DOMAIN=company.amocrm.ru
```

---

## AMO_CLIENT_ID

Уникальный идентификатор OAuth-интеграции amoCRM.

Получается при создании интеграции в amoCRM.

Пример:

```env
AMO_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

---

## AMO_ACCESS_TOKEN

Сгененрированный долгосрочный токен

Пример:

```env
AMO_ACCESS_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOi...
```

---

## AMO_CLIENT_SECRET

Секретный ключ OAuth-интеграции.

Используется при получении и обновлении access_token.

Пример:

```env
AMO_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## AMO_REDIRECT_URI

Redirect URI, указанный в настройках интеграции amoCRM.

Должен полностью совпадать со значением, настроенным в amoCRM.

Пример:

```env
AMO_REDIRECT_URI=https://example.com/api/amocrm/callback
```

---

## AMO_AUTH_CODE

Authorization Code, который используется для первоначального получения access_token и refresh_token.

> После обмена на токены обычно становится неактуальным.

Пример:

```env
AMO_AUTH_CODE=def50200...
```

---

## AMO_BIRTHDAY_FIELD

ID пользовательского поля amoCRM, содержащего дату рождения контакта.

Пример:

```env
AMO_BIRTHDAY_FIELD=123456
```

---

## AMO_AGE_FIELD

ID пользовательского поля amoCRM, в которое записывается рассчитанный возраст контакта.

Пример:

```env
AMO_AGE_FIELD=654321
```
