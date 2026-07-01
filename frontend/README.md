# 🍽️ SpotsLunch

Plataforma web para descubrir y gestionar lugares para comer con amigos.

![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=flat&logo=angular)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase)

## ✨ Características

- **Gestión de Salas**: Crea y únete a salas privadas con contraseña
- **Spots (Lugares)**: Añade restaurantes, cafeterías, bares...
- **Valoraciones**: Puntuaciones del 0 al 10 de cada spot
- **Visitados/Pendientes**: Lista diferenciada de lugares visitados y por visitar
- **Contraseña editable**: Cambia la contraseña de una sala en cualquier momento
- **Historial de salas**: Acceso rápido a salas recientes
- **Re-autenticación**: Si la contraseña cambia, el sistema te pide la nueva
- **Diseño responsivo**: Funciona en móvil y escritorio
- **Modo oscuro**: Soporte para tema claro/oscuro

## 🛠️ Tecnologías

| Capa | Tecnología |
|------|-------------|
| Frontend | Angular 21 |
| Estilos | Tailwind CSS 4 |
| Icons | Lucide Angular |
| Backend | Supabase (PostgreSQL + Auth) |
| Despliegue | Netlify |

## 📁 Estructura del Proyecto

```
src/app/
├── core/
│   ├── constants/     # Constantes (errores)
│   ├── guards/         # Rutas protegidas
│   ├── models/         # Modelos de datos
│   └── services/       # Servicios (auth, spots, boards, etc.)
├── features/
│   ├── board/          # Componente de la sala
│   └── login/          # Componente de login
└── shared/
    └── components/     # Componentes reutilizables
```

## 🚀 Getting Started

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Cuenta de Supabase configurada

### Instalación

```bash
# Instalar dependencias
npm install
```

### Configuración

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta las migraciones de la base de datos (tablas: `boards`, `spots`, `ratings`)
3. Configura las variables de entorno en tu archivo de configuración de Supabase

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run start
# o
ng serve

# Abrir en http://localhost:4200
```

### Build

```bash
# Build para producción
npm run build
# Los archivos se generan en /dist
```

### Despliegue

El proyecto está configurado para Netlify. Simplemente conecta tu repositorio y Netlify detectará la configuración automáticamente.

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt
- Validación de inputs en cliente y servidor
- Sanitización de datos para prevenir XSS
- Guards para proteger rutas

## 📝 Variables de Entorno

Configura tu cliente de Supabase en el servicio correspondiente con tu URL y clave pública.

## 📄 Licencia

MIT License