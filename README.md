# Sistema de Gestión de Trámites Municipales (SGTM)

## Descripción

El Sistema de Gestión de Trámites Municipales (SGTM) es una aplicación web desarrollada para digitalizar y optimizar la gestión de trámites municipales en Guatemala.

El sistema permite a los ciudadanos registrar solicitudes de licencias comerciales, permisos de construcción y trámites catastrales, así como adjuntar documentación y consultar el estado de sus solicitudes. Además, los empleados municipales pueden validar, aprobar o rechazar trámites y generar reportes operativos.

---

## Objetivo

Automatizar la gestión de trámites municipales mediante una plataforma web que mejore la eficiencia, trazabilidad y control de los procesos administrativos.

---

## Funcionalidades Implementadas

### Ciudadano

- Registro de usuarios.
- Inicio de sesión.
- Creación de trámites.
- Consulta de estado de trámites.
- Carga de documentos.

### Empleado Municipal

- Visualización de trámites.
- Validación de solicitudes.
- Aprobación y rechazo de trámites.
- Actualización de estados.

### Administración

- Consulta de reportes por estado de trámite.

---

## Tecnologías Utilizadas

### Frontend

- React
- Bootstrap
- React Router DOM
- Axios

### Backend

- Node.js
- Express.js
- JWT
- Bcrypt
- Multer

### Base de Datos

- MySQL

### Control de Versiones

- Git
- GitHub

### Metodología

- Scrum
- Git Flow

---

## Arquitectura

```text
Frontend (React)
        │
        ▼
Backend (Node.js + Express)
        │
        ▼
Base de Datos (MySQL)
```

---

## Estructura del Proyecto

```text
SGTM-Tramites-Municipales
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── uploads
│   │   └── app.js
│   │
│   └── tests
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── services
│   │   ├── components
│   │   └── App.jsx
│
├── database
│
├── docs
│
└── README.md
```

---

## Instalación

### Clonar repositorio

```bash
git clone https://github.com/JAbraham117/SGTM-Tramites-Municipales.git
```

---

### Backend

```bash
cd backend
npm install
npm run dev
```

Servidor:

```text
http://localhost:3001
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación:

```text
http://localhost:5173
```

---

## Base de Datos

1. Crear base de datos MySQL.
2. Ejecutar el script ubicado en:

```text
database/sgtm_municipalidad.sql
```

3. Configurar las variables de conexión en:

```text
backend/.env
```

Ejemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=sgtm
JWT_SECRET=secretkey
PORT=3001
```

---

## Pruebas

### Ejecutar pruebas unitarias

```bash
cd backend
npm test
```

Módulos cubiertos:

- Autenticación
- Gestión de Trámites
- Gestión de Documentos

---

## Estrategia de Branching

El proyecto utiliza Git Flow.

### Ramas principales

```text
main
develop
```

### Ramas de funcionalidad

```text
feature/auth
feature/tramites
feature/documentos
feature/validacion
feature/reportes
```

---

## Historias de Usuario Implementadas

| ID | Historia |
|----|-----------|
| HU1 | Registro de usuario |
| HU2 | Inicio de sesión |
| HU3 | Crear trámite |
| HU4 | Consultar estado |
| HU5 | Subir documentos |
| HU6 | Validar trámite |
| HU7 | Aprobar/Rechazar trámite |
| HU8 | Reportes |

---
