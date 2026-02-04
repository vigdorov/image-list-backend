# Image List Backend

Учебный backend-проект — упрощенный Instagram для обучения студентов.

## Назначение

REST API для работы с изображениями. Используется как практический проект при обучении backend-разработке на NestJS.

## Стек

- **Framework:** NestJS
- **Language:** TypeScript
- **Runtime:** Node.js

## Структура

```
src/
├── main.ts              # Точка входа
├── app.module.ts        # Корневой модуль
├── app.controller.ts    # REST контроллер
├── app.service.ts       # Бизнес-логика
├── schemas.ts           # Валидация данных
├── types.ts             # TypeScript типы
├── consts.ts            # Константы
└── api.responses.ts     # Форматы ответов API
```

## Команды

```bash
npm install          # Установка зависимостей
npm run start:dev    # Запуск в dev режиме
npm run build        # Сборка
npm run start:prod   # Production запуск
npm run test         # Тесты
npm run lint         # Линтер
```

## Деплой

- **Dockerfile:** есть
- **Namespace:** backend-for-learning
- **URL:** https://image-list.vigdorov.ru
