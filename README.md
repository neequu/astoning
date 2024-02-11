## <a id="ci-cd-badges"></a> CI/CD badges
[![CI](https://github.com/neequu/astoning/actions/workflows/ci.yml/badge.svg)](https://github.com/neequu/astoning/actions/workflows/ci.yml)
[![Vercel Production Deployment](https://github.com/neequu/astoning/actions/workflows/deploy.yml/badge.svg)](https://github.com/neequu/astoning/actions/workflows/deploy.yml)
[![Vercel Preview Deployment](https://github.com/neequu/astoning/actions/workflows/preview.yml/badge.svg)](https://github.com/neequu/astoning/actions/workflows/preview.yml)

# Pokebu

Приложение с информацией о покемонах

**Использованное API**: в приложении используется [Pokeapi](https://pokeapi.co/docs/v2)

## Deploy

[Vercel](https://astoning-eight.vercel.app/)

## Local Startup

Install dependencies:
```javascript
pnpm install
```
Start dev server:
```javascript
pnpm run dev
```

## **Основной функционал**:

- 🔐 **Регистрация и авторизация** пользователи могут создать учетную запись и авторизоваться в приложении
- 🔎 **Поиск** приложение предоставляет возможность поиска покемонов
- 🖤 **Избранное** пользователи могут добавлять в покемонов избранное
- 🕣 **История поиска:** приложение дает пользователям доступ к истории поиска покемонов

## Реализованные требования:

### **1 уровень (обязательный - необходимый минимум)**

- [x] Реализованы **Требования к функциональности**

- [ ] ~~Для хранения учетных записей пользователей, их Избранного и Истории поиска, используется **Firebase**~~

**React**

- [x] **Функциональные компоненты c хуками** в приоритете над классовыми
- [ ] ~~Есть разделение на **умные и глупые компоненты**~~

- [ ] ~~Есть **рендеринг списков**~~

- [ ] ~~Реализована хотя бы одна **форма**~~

- [ ] ~~Есть применение Контекст API~~

- [ ] ~~Есть применение **предохранителя**~~

- [ ] ~~Есть хотя бы один **кастомный хук**~~

- [ ] ~~Хотя бы несколько компонентов используют **PropTypes**~~
- [ ] ~~Поиск не должен триггерить много запросов к серверу (**debounce**)~~

- [ ] ~~Есть применение lazy + Suspense~~

**Redux**

- [x] Используем **Modern Redux with Redux Toolkit**
- [x] Используем **слайсы**

- [ ] ~~Есть хотя бы одна **кастомная мидлвара** или **createListenerMiddleware**~~

- [x] Используется **RTK Query**

- [ ] ~~Используется **Transforming Responses**~~

### **2 уровень (необязательный)**

- [x] Использование **TypeScript**
- [ ] ~~Подключен **storybook** и созданы два, три сториса ~~с knobs~~, которые показывают разные состояния компонента~~
- [ ] ~~Использование Firebase для учетных записей и их Избранного и Истории поиска~~

- [ ] ~~**Низная связанность клиентского кода**, использующего апи кода, работающего с внешним стором~~
- [x] Настроен CI/CD:
    - [x] Настроен CI: [CI](https://github.com/neequu/astoning/blob/main/.github/workflows/ci.yml)
        - [x] [Readme Status Badge](#ci-cd-badges)
        - [x] Проверки Eslint, TS, build

    - [x] Настроен CD: [Deploy Link](#deploy)
- [ ] ~~Реализована **виртуализация списков**~~
- [ ] ~~Используются **мемоизированные селекторы** (createSelector)~~
- [ ] ~~Используется **нормализованная структура стейта** (createEntityAdapter)~~
- [ ] ~~Проведена **оптимизация приложения**~~

- [ ] ~~Feature Flags. Реализовать фичу “Поделиться в телеграм”, закрытую под фича флагом.~~

- [ ] ~~Добавить **тесты** через jest, react-testing-library или Playwright~~

- [ ] ~~Связь UI и бизнес-логики построена не через команды, а через **события**~~

- [ ] ~~**Project Console API**~~

## **Дополнительно**

- Приложение построено согласно архитектуре [Feature-Sliced Design](https://feature-sliced.design)
- Для стилизации использован [tailwindCSS](https://tailwindcss.com)
