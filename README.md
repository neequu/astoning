## <a id="ci-cd-badges"></a> CI/CD badges
[![CI](https://github.com/neequu/astoning/actions/workflows/ci.yml/badge.svg)](https://github.com/neequu/astoning/actions/workflows/ci.yml)
[![Vercel Production Deployment](https://github.com/neequu/astoning/actions/workflows/deploy.yml/badge.svg)](https://github.com/neequu/astoning/actions/workflows/deploy.yml)
[![Vercel Preview Deployment](https://github.com/neequu/astoning/actions/workflows/preview.yml/badge.svg)](https://github.com/neequu/astoning/actions/workflows/preview.yml)

# aniston

приложение с инфой про аниме

**API** - используется [jikan](https://docs.api.jikan.moe)

## deploy

deployed on [vercel](https://astoning-eight.vercel.app/)

## local startup

Install dependencies:
```javascript
pnpm install
```
Start dev server:
```javascript
pnpm run dev
```

## **functionality**

- 🔐 **Регистрация и авторизация** пользователи могут создать учетную запись и авторизоваться в приложении
- 🔎 **Поиск** приложение предоставляет возможность поиска аниме
- 🖤 **Избранное** пользователи могут добавлять в аниме избранное
- 🕣 **История поиска:** приложение дает пользователям доступ к истории поиска

## Реализованные требования:

### **1 уровень (обязательный - необходимый минимум)**

- [ ] Реализованы **Требования к функциональности**

- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используется [**Supabase**](https://github.com/neequu/astoning/blob/main/src/services/supabase.ts)

**React**

- [x] **Функциональные компоненты c хуками** в приоритете над классовыми
- [x] Есть разделение на **умные и глупые компоненты**

- [x] Есть **рендеринг списков**

- [x] Реализована хотя бы одна **форма**

- [x] Есть применение Контекст API

- [x] Есть применение **предохранителя**

- [x] Есть хотя бы один **кастомный хук**

- [x] Хотя бы несколько компонентов используют **PropTypes**

- [x] Поиск не должен триггерить много запросов к серверу (**debounce**)

- [x] Есть применение lazy + Suspense

**Redux**

- [x] Используем **Modern Redux with Redux Toolkit**
- [x] Используем **слайсы**

- [ ] Есть хотя бы одна **кастомная мидлвара** или **createListenerMiddleware**

- [x] Используется **RTK Query**

- [x] Используется **Transforming Responses**

### **2 уровень (необязательный)**

- [x] Использование **TypeScript**
- [ ] Подключен **storybook** и созданы два, три сториса с knobs, которые показывают разные состояния компонента
- [x] Использование Supabase для учетных записей и их Избранного и Истории поиска

- [ ] **Низная связанность клиентского кода**, использующего апи кода, работающего с внешним стором
- [x] Настроен CI/CD:
    - [x] Настроен CI: [CI](https://github.com/neequu/astoning/blob/main/.github/workflows/ci.yml)
        - [x] [Readme Status Badge](#ci-cd-badges)
        - [x] Проверки Eslint, TS, build

    - [x] Настроен CD: [Deploy Link](#deploy)
- [ ] Реализована **виртуализация списков**
- [ ] Используются **мемоизированные селекторы** (createSelector)
- [ ] Используется **нормализованная структура стейта** (createEntityAdapter)
- [ ] Проведена **оптимизация приложения**

- [ ] Feature Flags. Реализовать фичу “Поделиться в телеграм”, закрытую под фича флагом.

- [ ] Добавить **тесты** через jest, react-testing-library или Playwright

- [ ] Связь UI и бизнес-логики построена не через команды, а через **события**

- [ ] **Project Console API**

## **additional**

- styled with [tailwind](https://tailwindcss.com)
- ui library [shadcn](https://ui.shadcn.com)
- input validation with [zod](https://zod.dev/)
- forms with [useForm](https://react-hook-form.com/docs/useform)
- backend service [supabase](https://supabase.com/) (alt to firebase)
- [mobile responsive](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- toast with [sonner](https://sonner.emilkowal.ski/toast)
- animation with [formkit-aa](https://auto-animate.formkit.com)
