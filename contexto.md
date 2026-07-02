# Contexto para IA

## ¿Qué hace exactamente la app?

La app es una aplicación móvil Expo/React Native para crear y gestionar horarios visuales con pictogramas. Permite elegir pictogramas de ARASAAC, usar fotos propias y construir secuencias de actividades o planes visuales. También incluye un módulo de IA para que el usuario escriba una acción o palabra y la aplicación pueda sugerir términos útiles para buscar pictogramas o fotos.

## ¿Quiénes son los usuarios finales?

- Terapeutas
- Padres y madres
- Profesores y educadores
- Cuidadores
- Personas que acompañan a personas con dificultades comunicativas o con TEA
- Personas con TEA u otras necesidades de comunicación visual

## ¿Qué escribe el usuario en el prompt?

El usuario escribe una acción o palabra clave breve que describa lo que quiere representar. En la UI aparece un placeholder tipo "Escribe una acción..." y en otros casos se pide "Escriba la palabra que representa la acción de la imagen".

## ¿Qué esperas obtener de Gemini?

Se espera obtener una lista de palabras clave en español que sean adecuadas para buscar pictogramas en ARASAAC o asociar a fotos. Idealmente, la respuesta debe ser un conjunto de términos claros, directos y útiles para la búsqueda visual.

## ¿Las palabras deben ser sustantivos únicamente o también verbos y adjetivos?

Preferiblemente verbos y sustantivos cortos. La app parece orientarse a acciones y actividades, por lo que los verbos son especialmente útiles. Los adjetivos no son el foco principal y conviene evitarlos si pueden generar ambigüedad.

## ¿Deben ser palabras simples o pueden ser frases?

Deben ser palabras simples o frases muy cortas. Lo ideal es que sean términos breves, concretos y fáciles de mapear a pictogramas.

## ¿En qué idioma deben devolverse?

En español. El proyecto usa la API de ARASAAC en `/es` y la interfaz está en español.

## ¿Vas a buscar después pictogramas/fotos usando esas palabras?

Sí. El objetivo es usar esos términos para buscar pictogramas de ARASAAC y también para asociarlos a fotos propias cargadas por el usuario.

## ¿Hay un catálogo de pictogramas propio o utilizas una fuente externa como ARASAAC?

No hay un catálogo propio de pictogramas en el código. Se utiliza ARASAAC como fuente externa de pictogramas y se complementa con fotos del usuario.

## ¿Necesitas exactamente 10 resultados o un número variable?

No se ve un requisito de número fijo en el código. Es mejor devolver un número pequeño y manejable, por ejemplo entre 5 y 10 resultados, pero no es estrictamente obligatorio que sean exactamente 10.

## ¿Quieres evitar duplicados, sinónimos muy parecidos o términos ambiguos?

Sí. La respuesta debería evitar duplicados y términos demasiado parecidos. Es preferible ofrecer palabras distintas y concretas, no sinónimos redundantes ni términos confusos.

## ¿Necesitas categorías (comida, emociones, acciones, lugares, etc.)?

No parece necesario para el flujo actual, ya que la app no muestra explicitamente categorías en el módulo IA. Si se añaden, sería un extra útil, pero no es un requisito obligatorio.

## ¿Necesitas que la IA adapte el vocabulario a la edad del usuario?

Sí. El vocabulario debe ser simple y accesible, especialmente para niños o personas con dificultades comunicativas. Conviene usar palabras fáciles y adaptadas para un público infantil o con TEA.
