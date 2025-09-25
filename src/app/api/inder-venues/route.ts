import { NextResponse } from 'next/server';

interface InderVenue {
  escenario?: string;
  nombre?: string;
  latitud: string | number;
  longitud: string | number;
  enlace?: string;
}

export async function GET() {
  try {
    // Fetch from INDER Socrata API - get all venues first
    const response = await fetch(
      'https://www.datos.gov.co/resource/i5z5-qhf8.json?$limit=1000',
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch INDER venues');
    }

    const data: any[] = await response.json();

    // Convert to GeoJSON
    const geojson = {
      type: 'FeatureCollection',
      features: data
        .filter(venue => venue.latitud && venue.longitud)
        .map(venue => {
          const name = venue.nombre_escenario || 'Escenario Deportivo';
          const direccion = venue.direccion || '';
          const barrio = venue.barrio || '';
          
          // Classify venue type based on name - improved detection
          const isPiscina = /piscin|nataci[oó]n|acu[aá]tico|agua|swim/i.test(name);
          const isPista = /pista|atletismo|running|trotar|track|carrera|velocidad|salto|lanzamiento/i.test(name);
          const isCancha = /cancha|f[uú]tbol|baloncesto|voleibol|tenis|squash|futsal/i.test(name);
          const isGimnasio = /gimnasio|gym|fitness|pesas|aerobicos/i.test(name);
          
          let type: 'swim' | 'run' | 'multi';
          if (isPiscina) type = 'swim';
          else if (isPista) type = 'run';
          else if (isCancha || isGimnasio) type = 'multi';
          else type = 'multi';
          
          return {
            type: 'Feature' as const,
            geometry: {
              type: 'Point' as const,
              coordinates: [parseFloat(venue.longitud), parseFloat(venue.latitud)],
            },
            properties: {
              name,
              type,
              provider: 'INDER' as const,
              direccion,
              barrio,
            },
          };
        }),
    };

    console.log(`INDER: Found ${geojson.features.length} venues`);
    console.log(`Swimming: ${geojson.features.filter(f => f.properties.type === 'swim').length}`);
    console.log(`Running: ${geojson.features.filter(f => f.properties.type === 'run').length}`);
    console.log(`Multi: ${geojson.features.filter(f => f.properties.type === 'multi').length}`);
    
    return NextResponse.json(geojson);
  } catch (error) {
    console.error('Error fetching INDER venues:', error);
    
    // Return fallback data
    const fallbackGeojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-75.5812, 6.2518],
          },
          properties: {
            name: 'Piscina Olímpica',
            type: 'swim',
            provider: 'INDER',
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-75.5650, 6.2442],
          },
          properties: {
            name: 'Pista de Atletismo',
            type: 'run',
            provider: 'INDER',
          },
        },
      ],
    };

    return NextResponse.json(fallbackGeojson);
  }
}