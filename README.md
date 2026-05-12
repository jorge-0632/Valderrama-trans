# 🚚 Transportes Colombia - Página Web Profesional Completa

Una página web completa y profesional para una empresa de transportes con múltiples secciones especializadas, sistema de cotización, seguimiento GPS, y optimizaciones avanzadas de SEO, performance y accesibilidad.

## 📋 Características Principales

### ✅ **Sistema de Autenticación Completo**
- Registro de nuevos usuarios con validación
- Login seguro con email y contraseña
- Gestión de sesiones persistentes
- Recuperación automática de sesión

### ✅ **Secciones Especializadas**
- **Cotización Instantánea**: Calculadora automática de precios
- **Seguimiento GPS**: Rastrea tus envíos en tiempo real
- **Servicios Diferenciados**: Carros, camionetas, camabajas, grúas, maquinaria
- **Certificaciones**: Reconocimientos y acreditaciones
- **Estadísticas**: Números que respaldan la experiencia
- **Preguntas Frecuentes**: Resolución de dudas comunes

### ✅ **Optimizaciones Avanzadas**
- **SEO Avanzado**: Meta tags Open Graph, Twitter Cards, Schema.org
- **Performance**: Lazy loading, Service Worker, PWA
- **Accesibilidad**: ARIA labels, navegación por teclado, skip links
- **PWA Ready**: Instalable como app móvil
- **Responsive**: Optimizado para todos los dispositivos

### ✅ **Funcionalidades Avanzadas**
- **Mapa Interactivo**: Cobertura nacional con Leaflet.js
- **WhatsApp Integration**: Contacto directo desde cualquier sección
- **Formulario Inteligente**: Pre-llenado y validación automática
- **Animaciones**: Transiciones suaves y efectos visuales
- **Loading States**: Estados de carga para mejor UX

## 📁 Estructura de Archivos

```
TRANSPORTADORA/
├── index.html          # Página principal completa
├── styles.css          # Estilos profesionales con animaciones
├── script.js           # Lógica JavaScript avanzada
├── sw.js              # Service Worker para PWA
├── manifest.json       # Manifiesto PWA
├── img/               # Carpeta de imágenes
│   ├── hero-banner.jpg          (600x400) - Banner principal
│   ├── camabaja-1.jpg           (400x300) - Galería 1
│   ├── grua-1.jpg               (400x300) - Galería 2
│   ├── transporte-vehiculo.jpg  (400x300) - Galería 3
│   ├── carretera-1.jpg          (400x300) - Galería 4
│   ├── camabaja-2.jpg           (400x300) - Galería 5
│   └── equipo-profesional.jpg   (500x500) - Galería 6 + Quiénes Somos
└── README.md          # Documentación completa
```

## 🚀 Cómo Usar

### 1. Preparación
Asegúrate de tener todos los archivos en la misma carpeta, incluyendo la carpeta `img/` con las imágenes requeridas.

### 2. Abrir la Página
Abre el archivo `index.html` en tu navegador web moderno (Chrome, Firefox, Edge, Safari).

### 3. Navegación
- **Inicio**: Información general y hero section
- **Servicios**: Detalle de servicios por tipo de vehículo
- **Cotización**: Calculadora automática de precios
- **Seguimiento**: Rastrea envíos con códigos únicos
- **Quiénes Somos**: Historia y valores de la empresa
- **Galería**: Imágenes de flota y operaciones
- **Cobertura**: Mapa interactivo de zonas de servicio
- **Testimonios**: Opiniones de clientes satisfechos
- **Contacto**: Formulario con integración WhatsApp

### 4. Funcionalidades Interactivas

#### Sistema de Cotización
- Selecciona tipo de vehículo, origen y destino
- Ingresa distancia aproximada
- Obtén cotización instantánea
- Solicita cotización detallada por WhatsApp

#### Seguimiento de Envíos
- Ingresa código de seguimiento (formato: TC-2026-XXXX)
- Visualiza estado actual del envío
- Timeline completo del proceso
- Información del conductor asignado

#### Contacto por WhatsApp
- Formulario inteligente con validación
- Mensaje pre-formateado para WhatsApp
- Integración desde cualquier sección
- Botón flotante siempre visible

## 🎨 Personalización

### Colores Corporativos
Los colores principales se definen en `:root` en `styles.css`:
```css
--primary-color: #003a70;    /* Azul corporativo */
--secondary-color: #00a86b;  /* Verde secundario */
--accent-color: #ff6b35;     /* Naranja acento */
```

### Información de Contacto
Actualiza los datos en `script.js`:
```javascript
const EMPRESA_CONFIG = {
    nombre: 'Transportes Colombia',
    whatsapp: '573001234567', // Tu número sin + ni espacios
    email: 'info@transportescolombia.com',
    telefono: '+57 1 5555-1234'
};
```

## 📱 Progressive Web App (PWA)

La página incluye funcionalidades PWA completas:

### Características PWA
- **Instalable**: Se puede instalar como app en móviles
- **Offline**: Funciona sin conexión a internet
- **Notificaciones**: Soporte para push notifications
- **Cache**: Archivos cacheados para carga rápida
- **Shortcuts**: Accesos directos desde el menú de la app

### Instalación
1. Abre la página en Chrome/Edge móvil
2. Toca el menú (tres puntos)
3. Selecciona "Agregar a pantalla de inicio"
4. ¡Listo! Tendrás la app instalada

## 🔍 SEO y Performance

### Optimizaciones SEO
- **Meta Tags Completos**: Open Graph, Twitter Cards, Schema.org
- **Structured Data**: Datos estructurados para motores de búsqueda
- **Canonical URLs**: Evita contenido duplicado
- **Sitemap Ready**: Preparado para sitemap XML

### Optimizaciones de Performance
- **Lazy Loading**: Imágenes se cargan solo cuando son visibles
- **Service Worker**: Cache inteligente para carga rápida
- **Preconnect**: Conexiones anticipadas a recursos externos
- **Minificación**: Código optimizado para producción

## ♿ Accesibilidad

### Funcionalidades de Accesibilidad
- **Navegación por Teclado**: Soporte completo para teclado
- **Skip Links**: Enlaces para saltar secciones
- **ARIA Labels**: Etiquetas de accesibilidad
- **Alt Texts**: Descripciones de imágenes detalladas
- **Contraste**: Colores con buen contraste
- **Reducción de Movimiento**: Respeta preferencias del usuario

### Navegación por Teclado
- `Tab`: Navegar entre elementos interactivos
- `Enter/Espacio`: Activar botones y enlaces
- `Escape`: Cerrar menús y modales

## 📊 Estadísticas Incluidas

- 15,000+ Vehículos transportados
- 500+ Clientes satisfechos
- 32 Ciudades cubiertas
- 25 Vehículos en flota
- 98% Puntualidad
- 15 Años de experiencia

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna con Schema.org
- **CSS3**: Flexbox, Grid, Animaciones, Variables CSS
- **JavaScript ES6+**: Funcionalidades interactivas y PWA
- **Leaflet.js**: Mapa interactivo
- **FontAwesome**: Iconos profesionales
- **Service Worker**: PWA y cache offline
- **LocalStorage**: Persistencia de datos

## 📞 Soporte

Para soporte técnico o personalización adicional:
- WhatsApp: +57 300 1234567
- Email: info@transportescolombia.com
- Teléfono: +57 1 5555-1234

## 🚀 Próximas Mejoras Planificadas

### Fase 2 (1-2 semanas)
- Sistema de reseñas interactivo
- Carrusel automático en galería
- API de distancias reales para cotización
- Dashboard administrativo

### Fase 3 (1 mes)
- Blog/noticias corporativo
- Sistema de reservas en línea
- Integración con CRM
- Multiples idiomas

---

**Desarrollado con ❤️ para Transportes Colombia - Optimizado para el éxito empresarial** 🚚✨