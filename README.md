# Picto App

Aplicación móvil desarrollada con **Expo + React Native + TypeScript** para gestionar pictogramas, artículos, horarios, autenticación y funciones de cámara/fotos. Está pensada como una base de producto para entornos educativos y de comunicación mediante pictogramas.

## Qué hace esta app

- Autenticación de usuario con módulo `auth`
- Gestión de artículos y contenido en `modules/articles`
- Calendario y horarios en `modules/calendar` y `modules/shedules`
- Soporte de cámara y galería en `modules/photos`
- Integración de IA en `modules/IA`
- Navegación basada en `expo-router`
- Uso de formularios con `react-hook-form` y validación con `zod`

## Tecnologías

- Expo SDK
- React Native
- TypeScript
- Expo Router
- Zustand para estado global
- React Query para cache y sincronización de datos
- Axios para llamadas HTTP
- NativeWind para estilos
- Jest + `@testing-library/react-native` para pruebas unitarias

## Estructura principal

- `app/` - rutas y pantallas principales de la aplicación
- `modules/` - módulos funcionales por dominio
  - `auth/` - login, registro, store de autenticación
  - `articles/` - creación y consulta de artículos
  - `calendar/` - eventos y utilidades de calendario
  - `shedules/` - búsqueda y administración de horarios
  - `photos/` - cámara, galería y subida de fotos
  - `IA/` - funcionalidades de inteligencia artificial
- `common/` - componentes, hooks y servicios reutilizables
- `config/` - configuración de APIs externas
- `constants/` - constantes globales del proyecto
- `infrastructure/` - mapeo e interfaces de datos

## Instalación

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Iniciar el servidor de Expo:

   ```bash
   npm run start
   ```

3. Ejecutar en un emulador o dispositivo:

   - `npm run android`
   - `npm run ios`
   - `npm run web`

## Scripts útiles

- `npm run start` - inicia Expo
- `npm run android` - ejecuta en Android
- `npm run ios` - ejecuta en iOS
- `npm run web` - ejecuta en web
- `npm run lint` - corre ESLint
- `npm test` - ejecuta pruebas con Jest

## Pruebas

Este proyecto usa Jest con `jest-expo` y `@testing-library/react-native`.

- Los tests están configurados en `package.json`.
- Usa `npm test` para ejecutar el conjunto de pruebas.

## Notas

- El proyecto usa `expo-router`, por lo que las rutas se definen por archivos dentro de `app/`.
- Los estilos se gestionan con `nativewind`, por lo que se emplea `className` en componentes React Native.
- Las pantallas y componentes comparten hooks personalizados y utilidades en `common/`.

---

Desarrollado para facilitar la gestión de comunicación con pictogramas y contenidos visuales en un entorno móvil moderno.
