# JOGAN_Sushi-Experience
Menú digital interactivo para el restaurante JŌGAN. Renderizado dinámico desde Google Sheets, carrito de compras integrado y pedidos directos a WhatsApp. Incluye "Modo Mesa" para escaneo en local.
# 🍣 Menú Digital JŌGAN | Más que Sushi

Menú digital interactivo y sin servidor (serverless) para el restaurante **JŌGAN**. Esta aplicación web permite a los clientes explorar el menú, armar su pedido en un carrito de compras y enviarlo directamente al restaurante a través de WhatsApp.

##  Características Principales

- **CMS Dinámico (Google Sheets):** El menú, precios y categorías se cargan en tiempo real desde una hoja de cálculo de Google publicada como TSV. No requiere base de datos ni backend.
- **Carrito de Compras:** Botón flotante con contador en tiempo real. Los clientes pueden agregar múltiples productos y ver el total estimado.
- **Checkout por WhatsApp:** Genera un mensaje formateado automáticamente con el detalle del pedido y lo envía al número del restaurante.
- **Modo Mesa (QR):** Si la URL contiene el parámetro `?mesa`, la interfaz oculta el carrito y los botones de compra (ideal para mostrar el menú en las mesas sin permitir pedidos directos desde ahí).
- **Diseño Elegante y Responsive:** Tema oscuro con acentos dorados, tipografía serif y carruseles horizontales optimizados para móviles.

## ️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Datos:** Google Sheets (Publicado como TSV)
- **Integración:** API de WhatsApp (`wa.me`)
- **Sin dependencias:** No requiere frameworks (React, Vue) ni librerías externas.

##  Estructura del Proyecto

```text
.
├── index.html      # Estructura, estilos y lógica de la aplicación
── fondo.jpg       # Imagen de fondo principal (asegúrate de incluirla)
