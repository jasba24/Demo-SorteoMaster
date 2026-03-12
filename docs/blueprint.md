# **App Name**: RaffleLink

## Core Features:

- Interfaz de Selección de Boletos: Permite a los usuarios seleccionar visualmente múltiples números o boletos de un pool disponible, con indicaciones claras de las selecciones elegidas y su estado actual.
- Cálculo Dinámico del Carrito: Proporciona cálculo y visualización en tiempo real del costo total basado en el número de boletos seleccionados, reflejando su precio y cualquier descuento aplicable.
- Recopilación de Información del Usuario: Un formulario seguro para recopilar datos personales esenciales del usuario (Nombre, Número de Identificación, Correo Electrónico, Dirección) requeridos para la compra.
- Simulación de Pasarela de Pagos: Simula una redirección a una pasarela de procesamiento de pagos externa (como PSE), manejando respuestas de éxito y fallo simuladas para demostrar el flujo de pago.
- Visualización de Boleto Digital: Tras un 'pago' exitoso, genera y muestra un boleto digital único y verificable que contiene todos los números comprados y los detalles de la transacción.
- Persistencia de Datos del Backend: Gestiona el almacenamiento y la recuperación de boletos disponibles, números seleccionados, detalles de compra del usuario y estados de transacción dentro de una base de datos robusta de backend (ej. PostgreSQL).

## Style Guidelines:

- Color principal: Un azul rico y profesional (#222EB3) para evocar confianza y dinamismo. Este color forma la base de la imagen profesional y segura de la plataforma, resonando con fiabilidad.
- Color de fondo: Un azul-gris muy claro y desaturado (#F1F3F5), que proporciona un lienzo limpio, abierto y accesible que favorece la legibilidad y la concentración del usuario.
- Color de acento: Un azul vibrante y claro (#0AA8F6), que ofrece un fuerte contraste para resaltar elementos interactivos, llamadas a la acción y transmitir momentos de éxito o emoción dentro del flujo del usuario.
- Fuente general: 'Inter', una sans-serif de estilo grotesco, elegida por sus características modernas, limpias y altamente legibles, adecuada tanto para titulares como para textos extensos en una aplicación técnica.
- Emplear iconos vectoriales simples, modernos y geométricos. Centrarse en la claridad y el reconocimiento instantáneo para acciones como seleccionar boletos, añadir al carrito, perfil de usuario y estado de pago.
- Adoptar un diseño de cuadrícula limpio, intuitivo y responsivo. Asegurar una jerarquía visual clara para guiar a los usuarios a través de la selección de boletos, la entrada de datos y los pasos de simulación de pago de manera fluida en todos los dispositivos.
- Implementar animaciones sutiles pero efectivas para la retroalimentación del usuario, como estados de 'hover' en los números seleccionables, transiciones suaves durante las actualizaciones del carrito y animaciones de celebración al completar el pago con éxito.