// ========== CONFIGURACIÓN DE LA EMPRESA ==========
const EMPRESA_CONFIG = {
    nombre: 'VALDERRAMA SAS',
    whatsapp: '573025705072', // Reemplaza con tu número de WhatsApp (sin + ni espacios)
    email: 'jorgehernan1178@gmail.com',
    telefono: '+57 302 5705072'
};

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    setupWhatsappButton();
    setupContactForm();
    setupMenuToggle();
    initializeMap();
    setupSmoothScroll();
    observeAnimations();
    animateStatistics();
    initializeLazyLoading();
    setupLoadingStates();
});

// ========== BOTÓN FLOTANTE WHATSAPP ==========
function setupWhatsappButton() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    const whatsappLink = document.getElementById('whatsappLink');
    
    const whatsappUrl = `https://wa.me/${EMPRESA_CONFIG.whatsapp}?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios%20de%20transporte.`;
    
    whatsappBtn.href = whatsappUrl;
    whatsappBtn.target = '_blank';
    
    if (whatsappLink) {
        whatsappLink.href = whatsappUrl;
        whatsappLink.target = '_blank';
    }
}

// ========== FORMULARIO DE CONTACTO ==========
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const ciudadOrigen = document.getElementById('ciudad-origen').value;
            const ciudadDestino = document.getElementById('ciudad-destino').value;
            const tipoVehiculo = document.getElementById('tipo-vehiculo').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Construir mensaje para WhatsApp
            const mensajeCompleto = encodeURIComponent(
                `¡Hola! Solicito una cotización:\n\n` +
                `*Nombre:* ${nombre}\n` +
                `*Teléfono:* ${telefono}\n` +
                `*Ciudad de Origen:* ${ciudadOrigen}\n` +
                `*Ciudad Destino:* ${ciudadDestino}\n` +
                `*Tipo de Vehículo:* ${tipoVehiculo}\n\n` +
                `*Mensaje:*\n${mensaje}`
            );
            
            const whatsappURL = `https://wa.me/${EMPRESA_CONFIG.whatsapp}?text=${mensajeCompleto}`;
            
            // Abrir WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Limpiar formulario
            contactForm.reset();
            
            // Mostrar mensaje de éxito
            showNotification('¡Mensaje enviado a WhatsApp!', 'success');
        });
    }
}

// ========== ABRIR FORMULARIO DE WHATSAPP DESDE SERVICIOS ==========
function openWhatsappForm(servicio) {
    const mensaje = encodeURIComponent(
        `Hola,\n\n` +
        `Me interesa solicitar información sobre: *${servicio}*\n\n` +
        `Por favor, bríndame más detalles sobre este servicio y envíame una cotización.\n\n` +
        `¡Gracias!`
    );
    
    const whatsappURL = `https://wa.me/${EMPRESA_CONFIG.whatsapp}?text=${mensaje}`;
    window.open(whatsappURL, '_blank');
}

// ========== MENU TOGGLE (MÓVIL) ==========
function setupMenuToggle() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            
            // Actualizar atributos de accesibilidad
            this.setAttribute('aria-expanded', !isExpanded);
            this.setAttribute('aria-label', isExpanded ? 'Abrir menú' : 'Cerrar menú');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menú');
            });
        });
        
        // Cerrar menú al presionar Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menú');
                menuToggle.focus();
            }
        });
    }
}

// ========== SCROLL SUAVE A SECCIONES ==========
function scrollTo(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                scrollTo(href);
            }
        });
    });
}

// ========== NOTIFICACIONES ==========
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${type === 'success' ? '#25d366' : '#ff6b35'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== MAPA INTERACTIVO CON LEAFLET ==========
function initializeMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    // Crear mapa centrado en Colombia
    const map = L.map('map').setView([4.5, -74.5], 5);
    
    // Agregar tiles del mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Coordenadas de principales ciudades
    const ciudades = [
        { nombre: 'Bogotá', lat: 4.7110, lng: -74.0721 },
        { nombre: 'Medellín', lat: 6.2442, lng: -75.5812 },
        { nombre: 'Cali', lat: 3.4372, lng: -76.5297 },
        { nombre: 'Neiva', lat: 2.9271, lng: -75.2898 },
        { nombre: 'Bucaramanga', lat: 7.1254, lng: -73.1198 },
        { nombre: 'Barranquilla', lat: 10.9639, lng: -74.7964 },
        { nombre: 'Santa Marta', lat: 11.2431, lng: -74.2207 },
        { nombre: 'Cartagena', lat: 10.3910, lng: -75.4794 },
        { nombre: 'Cúcuta', lat: 7.8764, lng: -72.6479 },
        { nombre: 'Pasto', lat: 1.2136, lng: -77.2811 },
        { nombre: 'Armenia', lat: 4.5339, lng: -75.7348 },
        { nombre: 'Ibagué', lat: 4.4369, lng: -75.2321 }
    ];
    
    // Agregar marcadores
    ciudades.forEach(ciudad => {
        L.circleMarker([ciudad.lat, ciudad.lng], {
            radius: 8,
            fillColor: '#00a86b',
            color: '#003a70',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        })
        .bindPopup(`<b>${ciudad.nombre}</b><br>Cobertura disponible`)
        .addTo(map);
    });
    
    // Líneas de ruta ejemplo (Bogotá - Medellín - Cartagena)
    const rutaEjemplo = [
        [4.7110, -74.0721],  // Bogotá
        [6.2442, -75.5812],  // Medellín
        [10.9639, -74.7964]  // Barranquilla
    ];
    
    L.polyline(rutaEjemplo, {
        color: '#ff6b35',
        weight: 3,
        opacity: 0.7,
        dashArray: '5, 5'
    }).addTo(map);
}

// ========== ANIMACIONES AL DESPLAZARSE ==========
function observeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    // Observar elementos animables
    const animatables = document.querySelectorAll(
        '.service-card, .benefit-card, .security-card, .gallery-item, .testimonial-card'
    );
    
    animatables.forEach(element => {
        observer.observe(element);
    });
}

// ========== CALCULADORA DE COTIZACIÓN (OPCIONAL) ==========
function calculateQuote(tipoVehiculo, distancia) {
    // Precios base por tipo de vehículo (ejemplo)
    const preciosBase = {
        'Carro particular': 150000,
        'Camioneta': 200000,
        'Camabaja': 300000,
        'Grúa': 250000,
        'Maquinaria liviana': 100000
    };
    
    const precioBase = preciosBase[tipoVehiculo] || 150000;
    const precioKm = 3000;
    const costoDistancia = distancia * precioKm;
    const total = precioBase + costoDistancia;
    
    return {
        precioBase: precioBase,
        costoDistancia: costoDistancia,
        total: total
    };
}

// ========== FUNCIONES DE COTIZACIÓN ==========
function updateCotizacion() {
    const tipoVehiculo = document.getElementById('tipo-vehiculo-cot').value;
    const ciudadOrigen = document.getElementById('ciudad-origen-cot').value;
    const ciudadDestino = document.getElementById('ciudad-destino-cot').value;
    const distancia = parseFloat(document.getElementById('distancia-cot').value) || 0;
    
    const resultadoDiv = document.getElementById('cotizacion-resultado');
    
    if (tipoVehiculo && ciudadOrigen && ciudadDestino && distancia > 0) {
        const cotizacion = calculateQuote(tipoVehiculo, distancia);
        
        document.getElementById('precio-base').textContent = `$${cotizacion.precioBase.toLocaleString()}`;
        document.getElementById('costo-distancia').textContent = `$${cotizacion.costoDistancia.toLocaleString()}`;
        document.getElementById('total-cotizacion').textContent = `$${cotizacion.total.toLocaleString()}`;
        
        resultadoDiv.style.display = 'block';
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        resultadoDiv.style.display = 'none';
    }
}

function solicitarCotizacion() {
    const tipoVehiculo = document.getElementById('tipo-vehiculo-cot').value;
    const ciudadOrigen = document.getElementById('ciudad-origen-cot').value;
    const ciudadDestino = document.getElementById('ciudad-destino-cot').value;
    const distancia = document.getElementById('distancia-cot').value;
    
    const mensaje = encodeURIComponent(
        `¡Hola! Solicito cotización detallada:\n\n` +
        `*Tipo de Vehículo:* ${tipoVehiculo}\n` +
        `*Origen:* ${ciudadOrigen}\n` +
        `*Destino:* ${ciudadDestino}\n` +
        `*Distancia aproximada:* ${distancia} km\n\n` +
        `Me gustaría recibir una cotización más precisa.`
    );
    
    const whatsappURL = `https://wa.me/${EMPRESA_CONFIG.whatsapp}?text=${mensaje}`;
    window.open(whatsappURL, '_blank');
}

// ========== FUNCIONES DE SEGUIMIENTO ==========
function buscarEnvio() {
    const codigo = document.getElementById('codigo-seguimiento').value.trim().toUpperCase();
    const resultadoDiv = document.getElementById('seguimiento-resultado');
    
    if (!codigo) {
        showNotification('Por favor ingresa un código de seguimiento', 'error');
        return;
    }
    
    // Simular búsqueda de envío (en producción esto vendría de una API)
    const enviosSimulados = {
        'TC-2026-0001': {
            codigo: 'TC-2026-0001',
            estado: 'En tránsito',
            origen: 'Bogotá',
            destino: 'Medellín',
            fecha: '15 Dic 2026',
            conductor: 'Carlos Rodríguez',
            timeline: [
                { titulo: 'Recogida programada', descripcion: 'Vehículo listo para recogida', fecha: '12 Dic 2026', estado: 'completed' },
                { titulo: 'En tránsito', descripcion: 'Vehículo en camino a destino', fecha: '13 Dic 2026', estado: 'current' },
                { titulo: 'Entrega estimada', descripcion: 'Llegada prevista al destino', fecha: '15 Dic 2026', estado: 'pending' }
            ]
        },
        'TC-2026-0002': {
            codigo: 'TC-2026-0002',
            estado: 'Entregado',
            origen: 'Cali',
            destino: 'Neiva',
            fecha: '10 Dic 2026',
            conductor: 'María González',
            timeline: [
                { titulo: 'Recogida completada', descripcion: 'Vehículo recogido exitosamente', fecha: '08 Dic 2026', estado: 'completed' },
                { titulo: 'En tránsito', descripcion: 'Vehículo transportado', fecha: '09 Dic 2026', estado: 'completed' },
                { titulo: 'Entregado', descripcion: 'Vehículo entregado al cliente', fecha: '10 Dic 2026', estado: 'completed' }
            ]
        }
    };
    
    const envio = enviosSimulados[codigo];
    
    if (envio) {
        // Mostrar información del envío
        document.getElementById('envio-codigo').textContent = envio.codigo;
        document.getElementById('envio-estado').textContent = envio.estado;
        document.getElementById('envio-estado').className = `estado ${getEstadoClass(envio.estado)}`;
        document.getElementById('envio-origen').textContent = envio.origen;
        document.getElementById('envio-destino').textContent = envio.destino;
        document.getElementById('envio-fecha').textContent = envio.fecha;
        document.getElementById('envio-conductor').textContent = envio.conductor;
        
        // Generar timeline
        const timelineDiv = document.getElementById('envio-timeline');
        timelineDiv.innerHTML = '';
        
        envio.timeline.forEach(item => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <div class="timeline-icon ${item.estado}">
                    <i class="fas ${getTimelineIcon(item.titulo)}"></i>
                </div>
                <div class="timeline-content">
                    <h5>${item.titulo}</h5>
                    <p>${item.descripcion}</p>
                    <small>${item.fecha}</small>
                </div>
            `;
            timelineDiv.appendChild(timelineItem);
        });
        
        resultadoDiv.style.display = 'block';
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        showNotification('Código de seguimiento no encontrado', 'error');
        resultadoDiv.style.display = 'none';
    }
}

function getEstadoClass(estado) {
    const estados = {
        'En tránsito': 'en-transito',
        'Entregado': 'entregado',
        'Pendiente': 'pendiente'
    };
    return estados[estado] || 'pendiente';
}

function getTimelineIcon(titulo) {
    const iconos = {
        'Recogida programada': 'fa-calendar-check',
        'Recogida completada': 'fa-check-circle',
        'En tránsito': 'fa-truck',
        'Entrega estimada': 'fa-clock',
        'Entregado': 'fa-box-open'
    };
    return iconos[titulo] || 'fa-circle';
}

// ========== FUNCIONES DE FAQ ==========
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Cerrar todas las FAQ abiertas
    document.querySelectorAll('.faq-item.active').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abrir la FAQ seleccionada si no estaba abierta
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ========== ANIMACIONES DE ESTADÍSTICAS ==========
function animateStatistics() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.estadistica-number');
                numbers.forEach(number => {
                    animateNumber(number);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const estadisticasSection = document.querySelector('.estadisticas');
    if (estadisticasSection) {
        observer.observe(estadisticasSection);
    }
}

function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const step = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// ========== LAZY LOADING PARA IMÁGENES ==========
function initializeLazyLoading() {
    // El lazy loading ya está implementado con el atributo loading="lazy" en HTML5
    // Esta función puede ser usada para polyfill en navegadores antiguos si es necesario
    
    // Mejorar la experiencia de carga con Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Remover placeholder si existe
                const placeholder = img.parentElement.querySelector('.lazy-loading');
                if (placeholder) {
                    placeholder.remove();
                }
                observer.unobserve(img);
            }
        });
    });

    // Observar todas las imágenes con lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== LOADING STATES ==========
function setupLoadingStates() {
    // Agregar loading states a botones de acción
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Solo agregar loading si es un botón de envío o acción importante
            if (this.type === 'submit' || this.hasAttribute('data-loading')) {
                addLoadingState(this);
                
                // Remover loading después de 3 segundos (simulando procesamiento)
                setTimeout(() => {
                    removeLoadingState(this);
                }, 3000);
            }
        });
    });
}

function addLoadingState(button) {
    button.classList.add('btn-loading');
    button.disabled = true;
    button.setAttribute('data-original-text', button.textContent);
    button.textContent = 'Procesando...';
}

function removeLoadingState(button) {
    button.classList.remove('btn-loading');
    button.disabled = false;
    const originalText = button.getAttribute('data-original-text');
    if (originalText) {
        button.textContent = originalText;
        button.removeAttribute('data-original-text');
    }
}

// ========== MEJORA DE ACCESIBILIDAD ==========
function setupAccessibility() {
    // Detectar navegación por teclado
    let isUsingKeyboard = false;
    
    document.addEventListener('keydown', function(e) {
        // Si se presiona Tab, activar modo teclado
        if (e.key === 'Tab') {
            isUsingKeyboard = true;
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        // Si se hace clic con mouse, desactivar modo teclado
        isUsingKeyboard = false;
        document.body.classList.remove('keyboard-navigation');
    });

    // Agregar skip links para navegación
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.setAttribute('aria-label', 'Saltar directamente al contenido principal de la página');
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Detectar preferencia de reducción de movimiento
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }

    // Mejorar navegación por teclado en formularios
    const formElements = document.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service Worker registrado'))
            .catch(() => console.warn('No se pudo registrar el Service Worker'));
    }
}

// ========== INICIALIZACIÓN ADICIONAL ==========
document.addEventListener('DOMContentLoaded', function() {
    // Funciones existentes ya se llaman en la inicialización principal
    setupAccessibility();
    registerServiceWorker();
});

// ========== VALIDAR TELÉFONO ==========
function validatePhone(phone) {
    const phoneRegex = /^(\+57|0057|57)?[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/[^0-9+]/g, ''));
}

// ========== VALIDAR EMAIL ==========
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========== GUARDAR COTIZACIÓN EN LOCALSTORAGE ==========
function saveQuote(datos) {
    const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
    quotes.push({
        ...datos,
        fecha: new Date().toLocaleString('es-CO')
    });
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// ========== OBTENER COTIZACIONES ==========
function getQuotes() {
    return JSON.parse(localStorage.getItem('quotes')) || [];
}

// ========== CHAT AUTOMÁTICO WHATSAPP ==========
function openWhatsappChat(mensaje = null) {
    const mensajePredefinido = mensaje || 
        `Hola ${EMPRESA_CONFIG.nombre}, tengo interés en sus servicios de transporte de vehículos.`;
    
    const url = `https://wa.me/${EMPRESA_CONFIG.whatsapp}?text=${encodeURIComponent(mensajePredefinido)}`;
    window.open(url, '_blank');
}

// ========== FORMATEAR TELÉFONO ==========
function formatPhoneNumber(phone) {
    return phone.replace(/[^0-9]/g, '');
}

// ========== RASTREO DE VEHÍCULO (SIMULADO) ==========
function trackVehicle(trackingNumber) {
    // Simular rastreo
    const estados = [
        { estado: 'Recogida completada', ubicacion: 'Bogotá', hora: new Date() },
        { estado: 'En tránsito', ubicacion: 'Fusagasugá', hora: new Date() },
        { estado: 'Parada de seguridad', ubicacion: 'Ibagué', hora: new Date() },
        { estado: 'En tránsito', ubicacion: 'Pereira', hora: new Date() },
        { estado: 'Llegada próxima', ubicacion: 'Medellín', hora: new Date() }
    ];
    
    return estados;
}

// ========== AGREGAR EFECTO DE SCROLL A LA NAVBAR ==========
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
    }
});

// ========== DATOS DE EJEMPLO (SOLO PARA DEMOSTRACIÓN) ==========
const datosEmpresa = {
    experiencia: '15+ años en el mercado',
    vehiculos: '25 vehículos propios',
    conductores: '35 conductores profesionales',
    ciudades: '32 ciudades de cobertura',
    clientes: '500+ clientes satisfechos',
    servicios: 6
};

// ========== EXPORTAR DATOS A CSV ==========
function exportToCSV(data, filename = 'cotizaciones.csv') {
    let csv = 'Nombre,Teléfono,Ciudad Origen,Ciudad Destino,Tipo Vehículo,Mensaje,Fecha\n';
    
    data.forEach(item => {
        csv += `"${item.nombre}","${item.telefono}","${item.ciudadOrigen}","${item.ciudadDestino}","${item.tipoVehiculo}","${item.mensaje}","${item.fecha}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ========== ANIMACIONES CSS (INYECTADAS) ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ========== PREVENIR ACCESO DIRECTO ==========
// Comentar esta línea si necesitas acceso directo a las funciones
console.log('VALDERRAMA SAS - Sistema de Cotizaciones');
console.log('Versión: 1.0');
console.log('Contacto: ' + EMPRESA_CONFIG.whatsapp);