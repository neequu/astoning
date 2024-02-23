## <a id="ci-cd-badges"></a> CI/CD badges
[![CI](https://github.com/neequu/astoning/actions/workflows/ci.yml/badge.svg)](https://github.com/neequu/astoning/actions/workflows/ci.yml)
[![Vercel Production Deployment](https://github.com/neequu/astoning/actions/workflows/deploy.yml/badge.svg)](https://github.com/neequu/astoning/actions/workflows/deploy.yml)
[![Vercel Preview Deployment](https://github.com/neequu/astoning/actions/workflows/preview.yml/badge.svg)](https://github.com/neequu/astoning/actions/workflows/preview.yml)
![Vercel](https://vercelbadge.vercel.app/api/neequu/astoning)
# aniston

приложение с инфой про аниме

**API** - используется [jikan](https://docs.api.jikan.moe)

## deploy

deployed on [vercel](https://astoning-neequus-projects.vercel.app)

## local startup

Install dependencies:
```javascript
pnpm install
```
```javascript
npm install
```
Start dev server:
```javascript
pnpm run dev
```
```javascript
npm run dev
```

## **functionality**

- 🔐 **Регистрация и авторизация** пользователи могут создать учетную запись и авторизоваться в приложении
- 🔎 **Поиск** приложение предоставляет возможность поиска аниме
- 🖤 **Избранное** пользователи могут добавлять в аниме избранное
- 🕣 **История поиска:** приложение дает пользователям доступ к истории поиска

## Реализованные требования:

### **1 уровень (обязательный - необходимый минимум)**

- [x] Реализованы **Требования к функциональности**

- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используется [**Supabase**](https://github.com/neequu/astoning/blob/main/src/services/supabase.ts)

**React**

- [x] **Функциональные компоненты c хуками** в приоритете над классовыми
- [x] Есть разделение на **[глупые](https://github.com/neequu/astoning/blob/main/src/components/wrappers/PageWrapper.tsx)** и **[умные](https://github.com/neequu/astoning/blob/main/src/pages/home.tsx)** компоненты

- [x] Есть [**рендеринг списков**](https://github.com/neequu/astoning/blob/main/src/pages/search.tsx)

- [x] Реализована хотя бы одна [**форма**](https://github.com/neequu/astoning/blob/main/src/components/AuthForm.tsx)

- [x] Есть применение [**Контекст API**](https://github.com/neequu/astoning/blob/main/src/providers/theme-provider.tsx)

- [x] Есть применение **предохранителя** [тут](https://github.com/neequu/astoning/blob/main/src/App.tsx) и [тут](https://github.com/neequu/astoning/blob/main/src/components/ErrorLayout.tsx)

- [x] Есть хотя бы один [**кастомный хук**](https://github.com/neequu/astoning/blob/main/src/hooks)

- [x] Хотя бы несколько компонентов используют **PropTypes** [тут](https://github.com/neequu/astoning/blob/main/src/components/ui/spinner.tsx) и [тут](https://github.com/neequu/astoning/blob/main/src/components/misc/HiddenTextBlock.tsx)

- [x] Поиск не должен триггерить много запросов к серверу [**debounce**](https://github.com/neequu/astoning/blob/main/src/hooks/use-debounce.ts)

- [x] Есть применение [lazy](https://github.com/neequu/astoning/blob/main/src/router/router-config.ts) + [Suspense](https://github.com/neequu/astoning/blob/main/src/router/index.tsx)

**Redux**

- [x] Используем **Modern Redux with Redux Toolkit**
- [x] Используем [**слайсы**](https://github.com/neequu/astoning/blob/main/src/store/slices)

- [x] Есть хотя бы одна **кастомная мидлвара** или [**createListenerMiddleware**](https://github.com/neequu/astoning/blob/main/src/store/utils/middleware/console.ts)

- [x] Используется [**RTK Query**](https://github.com/neequu/astoning/tree/main/src/store/api)

- [x] Используется [**Transforming Responses**](https://github.com/neequu/astoning/blob/main/src/store/utils/transforms)

### **2 уровень (необязательный)**

- [x] Использование [**TypeScript**](https://github.com/neequu/astoning/blob/main/tsconfig.json)
- [x] Подключен **storybook** и созданы два, три сториса с knobs, которые показывают разные состояния компонента [тут](https://github.com/neequu/astoning/blob/main/src/stories/Button.stories.tsx) и [тут](https://github.com/neequu/astoning/blob/main/src/stories/Spinner.stories.tsx)
- [x] Использование Supabase для учетных записей и их Избранного и Истории поиска
    - [x] [Инвалидация кеша](https://github.com/neequu/astoning/blob/main/src/store/api/db-api.ts)

- [x] [**Низкая связанность клиентского кода**](https://github.com/neequu/astoning/blob/main/src/services/db/db-methods-switch.ts), использующего апи кода, работающего с внешним стором **LS + Supabase с одним переключателем в .env файле**
- [x] Настроен CI/CD:
    - [x] Настроен CI: [CI](https://github.com/neequu/astoning/blob/main/.github/workflows/ci.yml)
        - [x] [Readme Status Badge](#ci-cd-badges)
        - [x] Проверки Eslint, TS, build

    - [x] Настроен CD: [Deploy Link](#deploy)
- [x] Реализована [**виртуализация списков**](https://github.com/neequu/astoning/blob/main/src/pages/history.tsx)
- [x] Используются [**мемоизированные селекторы** (createSelector)](https://github.com/neequu/astoning/blob/main/src/store/utils/selectors.ts) [пример использования](https://github.com/neequu/astoning/blob/main/src/pages/visit.tsx)
- [x] Используется **нормализованная структура стейта** [createEntityAdapter](https://github.com/neequu/astoning/blob/main/src/store/slices/entity-visit-slice.ts)

- [x] Проведена [**оптимизация приложения**](#optimization)

- [x] Feature Flags. Реализовать фичу “Поделиться в телеграм”, закрытую под фича флагом. [тут](https://github.com/neequu/astoning/blob/main/server) и [тут](https://github.com/neequu/astoning/tree/main/src/features)

- [x] Добавить **e2e тесты** через cypress
    - [x] [Гость. Поиск. Единица информации.](https://github.com/neequu/astoning/blob/main/cypress/e2e/search-card-redirect.cy.ts)
    - [x] [**Пользователь. Поиск. Единица информации. Избранное**](https://github.com/neequu/astoning/blob/main/cypress/e2e/favorites.cy.ts)

- [x] Связь UI и бизнес-логики построена не через команды, а через **события** [тут](https://github.com/neequu/astoning/blob/main/src/components/like/LikeComponent.tsx) [тут](https://github.com/neequu/astoning/blob/main/src/pages/visit.tsx)
- [x] [**Project Console API**](https://github.com/neequu/astoning/blob/main/src/services/console)

## **additional**

- mobile adaptive
- [tailwind](https://tailwindcss.com) for styling
- [shadcn](https://ui.shadcn.com) ui library
- [zod](https://zod.dev/) input validation with
- [useForm](https://react-hook-form.com/docs/useform) forms
- [supabase](https://supabase.com/) backend service
- [sonner](https://sonner.emilkowal.ski/toast) toast
- [formkit-aa](https://auto-animate.formkit.com) animation
- [usehooks-ts](https://usehooks-ts.com) hooks
- [react-window](https://github.com/bvaughn/react-window) virtualization
- [react-virtualized-auto-sizer](https://github.com/bvaughn/react-virtualized-auto-sizer) auto sizing
- [react-lazily](https://github.com/JLarky/react-lazily) lazy loading of named components
- [lucide-react](https://lucide.dev/) icons
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)



<a id="optimization"></a>

## оптимизация

- использование хуков usecallback, usememo etc. для избежания лишних ререндеров
  
https://github.com/neequu/astoning/assets/69749247/ca0cb02c-befd-48be-8931-94ece768ccfd

- кеширование результатов, как api так и данных из базы данных и инвалидация кеша по тегам + мутациям
  
https://github.com/neequu/astoning/assets/69749247/b7083ac2-69b7-4efd-b6ae-b7f309bc4763

- code splitting - lazy loading - импорт компонентов, которые отображаются по условию чере lazily

- анализ репортов перформанса, исправление моментов, которые были помечены, как плохо влияющие на производительность
 ![unl](https://github.com/neequu/astoning/assets/69749247/f9186aff-bf92-4a6e-bca1-8a54eafb8207)

  
