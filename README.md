# Triatlón Medellín

Una aplicación web MVP que muestra dónde **correr, andar en bici y nadar** en Medellín y Valle de Aburrá con capas interactivas, filtros y popups.

## Características

- 🗺️ **Mapa interactivo** con Mapbox GL JS
- 🚴‍♂️ **Estaciones EnCicla** (sistema de bicicletas públicas)
- 🛤️ **Ciclorrutas** del Valle de Aburrá  
- 🚴‍♀️ **Ciclovías INDER** con horarios
- 🏊‍♂️ **Piscinas y pistas** de atletismo (INDER)
- 🚇 **Estaciones del Metro** de Medellín
- �️‍♂️ **Google Places** - Gimnasios, piscinas y deportes adicionales
- �🎯 **Filtros en tiempo real** por tipo de actividad
- 📱 **Diseño responsivo** con Material UI

## Tecnologías

- **Next.js 14+** con App Router
- **React 18** y **TypeScript**
- **TanStack Query** para manejo de datos
- **Mapbox GL JS v2+** para mapas interactivos
- **Material UI (MUI)** para la interfaz
- **APIs oficiales** de datos abiertos de Colombia

## Configuración

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repo>
   cd triatlon-project
   ```

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Configura variables de entorno**
   Crea un archivo `.env.local`:
   ```env
   # Requerido - Token de Mapbox
   NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_de_mapbox_aquí
   
   # Opcional - API Key de Google Places (para más venues de fitness)
   GOOGLE_PLACES_API_KEY=tu_google_places_api_key_aquí
   ```
   
   **Obtener tokens:**
   - **Mapbox**: [Crear token gratuito](https://account.mapbox.com/access-tokens/)
   - **Google Places**: [Console de Google Cloud](https://console.cloud.google.com/), habilitar Places API

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre** [http://localhost:3000](http://localhost:3000) en tu navegador

## Fuentes de Datos

La aplicación utiliza las siguientes fuentes oficiales de datos abiertos:

1. **Estaciones EnCicla** - AMVA (Socrata API)
2. **Ciclorrutas Valle de Aburrá** - AMVA  
3. **Ciclovías INDER** - Instituto de Deportes y Recreación
4. **Escenarios Deportivos** - INDER (Socrata API)
5. **Estaciones Metro** - Metro de Medellín
6. **Google Places API** - Gimnasios, piscinas, pistas de atletismo adicionales *(opcional)*

## Estructura del Proyecto

```
src/
├── app/
│   ├── api/           # API routes (App Router)
│   │   ├── encicla/
│   │   ├── ciclorrutas/
│   │   ├── ciclovias-inder/
│   │   ├── inder-venues/
│   │   ├── metro-stations/
│   │   └── google-places/    # Google Places API
│   ├── layout.tsx     # Layout principal con providers
│   └── page.tsx       # Página principal
├── components/
│   ├── MapComponent.tsx   # Componente principal del mapa
│   └── Providers.tsx      # React Query + MUI providers
├── lib/
│   ├── types.ts       # Tipos TypeScript
│   ├── api.ts         # Funciones API
│   ├── hooks.ts       # Hooks de TanStack Query
│   └── googlePlaces.ts    # Utilidades Google Places
└── public/data/       # Archivos GeoJSON estáticos
```

## Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run start    # Servidor de producción
npm run lint     # Linter ESLint
```

## Características Implementadas

✅ **Mapa con 6 capas toggleables**  
✅ **Datos normalizados a GeoJSON**  
✅ **TanStack Query con cache inteligente**  
✅ **Popups informativos en el mapa**  
✅ **Panel de filtros flotante**  
✅ **Leyenda del mapa completa**  
✅ **Modal de fuentes de datos**  
✅ **Diseño responsivo**  
✅ **TypeScript completo**  
✅ **Google Places API opcional** con ratings y horarios

## Próximas Características

🔄 **Parámetros URL** para filtros preestablecidos  
🔄 **Búsqueda geográfica** avanzada  
🔄 **"¿Qué está abierto ahora?"** basado en horarios  
🔄 **Filtro por bbox** para optimización  
🔄 **Integración Strava** para rutas populares  

## Licencia

MIT

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir cambios importantes.
