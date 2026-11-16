# Tienda de Libros

Aplicación web desarrollada con **React** para la exploración y compra simulada de libros, con navegación por categorías, catálogo completo, vista detallada de productos y gestión de información mediante servicios mock.

---

## Características

- **Página de Inicio (`HomePage`)**: Presentación destacada de novedades, categorías populares y libros recomendados.
- **Catálogo de Libros (`CatalogPage`)**: Listado completo de libros con filtrado por categorías, búsqueda por título/autor y ordenamiento por precio o calificación.
- **Explorador de Categorías (`CategoriesPage` y `CategoryDetailPage`)**: Vista agrupada por temáticas y navegación a los libros pertenecientes a cada categoría.
- **Detalle de Libro (`BookDetailPage`)**: Ficha técnica, sinopsis, disponibilidad de stock, selector de cantidad y simulación de compra.
- **Diseño Centralizado y Responsivo**: Interfaz adaptable a dispositivos móviles y escritorio, con estilos unificados en `src/App.css` y variables de diseño en `src/styles/`.
- **Arquitectura Limpia**: Componentes modulares y reutilizables sin archivos CSS dispersos e innecesarios.

---

## Tecnologías Utilizadas

- **React 19**
- **React Router 8** (enrutamiento declarativo del lado del cliente)
- **Testing Library & Jest** (pruebas unitarias y de integración)
- **CSS3** (diseño flexible con CSS Grid, Flexbox y Variables CSS personalizadas)

---

## Estructura del Proyecto

```text
tiendalibros/
├── public/                 # Archivos públicos y plantilla HTML
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── BookCard/       # Tarjeta de presentación de libro
│   │   ├── CategoryCard/   # Tarjeta de categoría
│   │   ├── ErrorMessage/   # Mensaje de error con opción de reintentar
│   │   ├── Footer/         # Pie de página
│   │   ├── LoadingSpinner/ # Indicador de carga
│   │   └── Navbar/         # Barra de navegación principal
│   ├── data/               # Datos simulados (mockData.js)
│   ├── pages/              # Vistas principales de la aplicación
│   │   ├── AboutPage/      # Información sobre la tienda
│   │   ├── BookDetailPage/ # Ficha del libro
│   │   ├── CatalogPage/    # Catálogo con filtros y ordenamiento
│   │   ├── CategoriesPage/ # Listado de categorías
│   │   ├── CategoryDetailPage/ # Libros de una categoría
│   │   ├── HomePage/       # Página principal
│   │   └── NotFoundPage/   # Página 404
│   ├── services/           # Capa de datos y API simulada (api.js)
│   ├── styles/             # Variables y reglas globales
│   │   ├── global.css      # Reset, estilos base y clases utilitarias
│   │   └── variables.css   # Paleta de colores, sombras y tipografías
│   ├── App.css             # Estilos unificados de componentes y vistas
│   ├── App.js              # Enrutador y estructura base
│   ├── App.test.js         # Suite de pruebas automatizadas
│   ├── index.css           # Estilos base del documento
│   └── index.js            # Punto de entrada de React
├── package.json
└── README.md
```

---

## Scripts Disponibles

En el directorio del proyecto puedes ejecutar:

### `npm start`

Inicia la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

La página se recargará automáticamente si realizas cambios en el código.\
Cualquier error de compilación o advertencia de ESLint se mostrará en la consola.

### `npm test`

Lanza el ejecutador de pruebas en modo interactivo con observación de cambios.\
Para ejecutar las pruebas una sola vez:

```bash
npm test -- --watchAll=false
```

### `npm run build`

Compila la aplicación optimizada para producción en la carpeta `build`.\
Empaqueta y minifica React de manera eficiente para lograr el mejor rendimiento.

### `npm run eject`

> [!WARNING]
> Esta operación es unidireccional. Una vez ejecutado `eject`, no se puede revertir.

Si deseas personalizar completamente las herramientas de compilación (Webpack, Babel, ESLint, etc.), este comando copia todos los archivos de configuración a tu proyecto.

---

## Licencia

Proyecto desarrollado con fines académicos y de demostración.
