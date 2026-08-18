# Picto App Documentation

## 1. Overview

**Picto App** es una aplicación móvil desarrollada con **Expo + React Native + TypeScript** para gestionar pictogramas, horarios, artículos, cámara/fotos y funcionalidades de IA. La aplicación está pensada para entornos educativos y de comunicación asistida.

### Objetivo principal

- Permitir que los usuarios creen y utilicen horarios basados en pictogramas.
- Ofrecer navegación mediante pestañas para acceso rápido a perfil, horarios y artículos.
- Integrar cámara y galería para tomar y subir imágenes.
- Apoyar busca y selección de pictogramas con un modal especializado.
- Habilitar flujos de IA y guardado de esquemas.

## 2. Tecnologías principales

- **Expo SDK**
- **React Native**
- **TypeScript**
- **Expo Router** para navegación basada en archivos
- **Zustand** para estado local/global
- **React Query** para cache y sincronización con APIs
- **Axios** para peticiones HTTP
- **NativeWind** para estilos estilo Tailwind
- **React Native Reanimated** y **Gesture Handler** para animaciones y gestos
- **Jest** y **@testing-library/react-native** para pruebas

## 3. Estructura del proyecto

- `app/` - rutas y layout de la aplicación
- `modules/` - lógica dividida por dominio
  - `auth/` - login, registro y estado de autenticación
  - `dashboard/` - carga de datos y contexto de pictogramas
  - `calendar/` - calendario, eventos y pantallas relacionadas
  - `shedules/` - editor de horarios, lista de pictogramas y guardado de horarios
  - ` articles/` - componentes y pantallas de artículos
  - `photos/` - cámara, galería y manejo de fotos
  - `IA/` - integración de inteligencia artificial
  - `onboarding/` - flujo inicial de bienvenida
- `common/` - componentes reutilizables, hooks y servicios compartidos
- `config/` - configuración de APIs externas
- `constants/` - constantes globales
- `infrastructure/` - interfaces y funciones de mapeo de datos

## 4. Arquitectura de navegación

### Rutas principales

- `/` - redirige a `/profile` o `/onboarding` según sesión
- `/login` - pantalla de inicio de sesión
- `/register` - pantalla de registro
- `/profile` - perfil de usuario y acceso al dashboard
- `/horario` - sección principal de horarios
- `/articles` - sección de artículos
- `/camara` - pantalla de cámara
- `/onboarding` - flujo de bienvenida inicial

### Layout global

- `app/_layout.tsx` - root layout con providers globales
- `app/(auth)/_layout.tsx` - layout específico de autenticación
- `app/(innerApp)/_layout.tsx` - layout para la aplicación autenticada con tabs

### Estado global y providers

- `QueryClientProvider` de React Query
- `GestureHandlerRootView` para gestos nativos
- `LoadPictosProvider` para compartir pictogramas cargados
- `PlayModeProvider` y `EditModeProvider` para modo reproducción/edición
- `SchedulesInEvenProvider` para datos de calendario

## 5. Módulos destacados

### `modules/auth`

- `screens/LoginScreen.tsx` - pantalla de inicio de sesión
- `screens/RegisterScreen.tsx` - pantalla de registro
- `hooks/useLogin.ts`, `useRegister.ts` - lógica de formulario y servicio
- `store/authState.ts` - estado global de autenticación
- `services/auth.service.ts` - llamadas a APIs de autenticación

### `modules/dashboard`

- `context/LoadPictosContext.ts` - contexto para pictogramas seleccionados
- `context/LoadPictosProvider.tsx` - proveedor de pictogramas

### `modules/shedules`

- `screens/SheduleScreen.tsx` - editor principal de horarios
- `components/pictos/PictoOnBoardItem.tsx` - item de pictograma en el tablero
- `components/pictos/SaveMenuModal.tsx` - modal de guardado
- `components/pictos/ModalPictosList.tsx` - modal para seleccionar pictogramas
- `hooks/useSetSelectedPictos.ts` - lógica de selección y estado de pictogramas
- `animations/drag_drop/useDragDrop.tsx` - lógica de arrastre personalizado

### `modules/calendar`

- `screen/CalendarScreen.tsx` - pantalla de calendario con eventos
- `components/SetSchedulesToCalendar.tsx` - integrador de horarios al calendario
- `hooks/useCalendarQuery.ts` - consulta de eventos

### `modules/photos`

- `screens/CamaraScreen.tsx` - pantalla de captura de fotos
- `store/useCamaraStore.ts` - estado de cámara temporal
- `components/PhotosModalList.tsx` - selección de fotos

### `modules/IA`

- `screens/IAScreen.tsx` - funcionalidad IA
- `services/IA.service.ts` - llamadas a la API de IA
- `hooks/usePropmpt.tsx` - manejo de prompts

## 6. Dependencias clave

- `expo` - plataforma base
- `react-native-draggable-flatlist` - lista arrastrable
- `react-native-reanimated` - animaciones avanzadas
- `react-native-gesture-handler` - gestos táctiles
- `expo-router` - rutas y tabs
- `uuid` - generación de identificadores únicos
- `zustand` - gestión de estado global
- `@tanstack/react-query` - gestión de datos remotos y caché
- `zod` - validación de schemas

## 7. Configuración local

### Requisitos previos

- Node.js compatible con Expo
- Expo CLI instalada globalmente (opcional)

### Instalación

```bash
npm install
```

### Ejecución

```bash
npm run start
```

Luego elige:

```bash
npm run android
npm run ios
npm run web
```

### Scripts disponibles

- `npm run start` - inicia Expo
- `npm run android` - ejecuta en Android
- `npm run ios` - ejecuta en iOS
- `npm run web` - ejecuta en web
- `npm run lint` - ejecuta ESLint
- `npm test` - ejecuta Jest

## 8. Testing

La app está configurada con Jest y `jest-expo`.

- `@testing-library/react-native` para pruebas de componentes
- Cobertura habilitada en `package.json`
- El comando principal es `npm test`

## 9. Recomendaciones de diseño y uso

### Pantallas importantes

- Autenticación (`/login`, `/register`)
- Onboarding inicial (`/onboarding`)
- Vista principal de perfil y tabs
- Editor de horarios (`/horario`)
- Lista de pictogramas y selección de pictos
- Cámara y fotos
- Calendario de eventos

### Buenas prácticas

- Mantener las keys estables en listas drag-and-drop
- No usar `index` ni `pictosOn.indexOf(item)` como key
- Usar `keyExtractor` en `DraggableFlatList`
- Evitar remounts innecesarios al cambiar orden de lista
- Separar lógica de UI en hooks y componentes reutilizables

## 10. Capturas de pantalla

Es conveniente colocar capturas de pantalla en los siguientes apartados:

1. **Introducción / Overview**
   - Captura de la pantalla de inicio o onboarding.
   - `![Pantalla de inicio](./assets/docs/onboarding.png)`

2. **Autenticación**
   - Login y registro.
   - `![Login](./assets/docs/login.png)`
   - `![Registro](./assets/docs/register.png)`

3. **Navegación principal y tabs**
   - Vista de pestañas dentro de la app.
   - `![Navegación de pestañas](./assets/docs/tabs.png)`

4. **Editor de horarios**
   - Pantalla de `SheduleScreen` con pictogramas.
   - `![Editor de horarios](./assets/docs/schedule-editor.png)`

5. **Lista de pictogramas y selección**
   - Modal de selección de pictos.
   - `![Selección de pictogramas](./assets/docs/picto-modal.png)`

6. **Drag & Drop**
   - Interacción con `DraggableFlatList` y arrastre.
   - `![Drag and drop](./assets/docs/drag-drop.png)`

7. **Calendario**
   - Vista de calendario y eventos.
   - `![Calendario](./assets/docs/calendar.png)`

8. **Cámara / Fotos**
   - Pantalla de cámara y galería.
   - `![Cámara](./assets/docs/camera.png)`

9. **Popups y modales**
   - Modal de guardar horario y alertas.
   - `![Modal de guardado](./assets/docs/save-schedule.png)`

## 11. Archivo de referencia

- `README.md` - descripción general y comandos de uso
- `DOCUMENTATION.md` - documentación técnica extendida

---

> Esta documentación está pensada para desarrolladores que trabajan sobre el proyecto y para cualquier persona que necesite entender la arquitectura, uso, rutas y componentes clave de la app.
