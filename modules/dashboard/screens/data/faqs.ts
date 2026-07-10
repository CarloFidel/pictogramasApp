export const faqItems = [
  {
    question:
      "¿Cuál es la funcionalidad principal de Picto App y qué tecnologías utiliza para implementarla?",
    answer:
      "Picto App es una aplicación móvil para la gestión de pictogramas, artículos, horarios y recursos multimedia con enfoque educativo y de comunicación accesible. Está construida con Expo + React Native + TypeScript, usa expo-router para navegación, Zustand para estado global, React Query para sincronización de datos, Axios para llamadas HTTP, NativeWind para estilos, react-hook-form con zod para validación de formularios y componentes de react-native-paper para la interfaz.",
  },
  {
    question:
      "¿Cómo se gestionan las imágenes y pictogramas dentro de la aplicación?",
    answer:
      "La aplicación utiliza los módulos de cámara y galería de Expo para capturar y seleccionar imágenes. Los pictogramas se buscan mediante servicios HTTP y se usan en horarios y artículos para una experiencia visual ordenada.",
  },
  {
    question: "¿Qué librerías se usan para formularios y validación?",
    answer:
      "Se usa react-hook-form para manejar formularios y Zod para la validación de datos, lo que permite mensajes de error claros y entradas seguras.",
  },
];
