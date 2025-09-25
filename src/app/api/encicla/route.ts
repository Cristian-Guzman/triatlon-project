import { NextResponse } from 'next/server';
import { TriFC, EnCiclaStation } from '@/lib/types';

export async function GET() {
  try {
    // Fetch from AMVA Socrata API
    const response = await fetch(
      'https://www.datos.gov.co/resource/hmuf-kqju.json?$limit=500',
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch EnCicla data');
    }

    const data: any[] = await response.json();

    // Convert to GeoJSON
    const geojson: TriFC = {
      type: 'FeatureCollection',
      features: data
        .filter(station => station.georeferenciaci_n)
        .map(station => {
          // Parse coordinates from "lat;lng" format
          const coords = station.georeferenciaci_n.split(';');
          if (coords.length !== 2) return null;
          
          const lat = parseFloat(coords[0].replace(',', '.'));
          const lng = parseFloat(coords[1].replace(',', '.'));
          
          if (isNaN(lat) || isNaN(lng)) return null;
          
          return {
            type: 'Feature' as const,
            geometry: {
              type: 'Point' as const,
              coordinates: [lng, lat],
            },
            properties: {
              name: station.nombre_estacion || 'Estación EnCicla',
              type: 'bike' as const,
              provider: 'AMVA' as const,
              id: station._ || undefined,
              direccion: station.direccion || undefined,
              total_anclajes: station.total_anclajes || undefined,
            },
          };
        })
        .filter((feature): feature is NonNullable<typeof feature> => feature !== null),
    };

    console.log(`EnCicla: Found ${geojson.features.length} stations`);
    return NextResponse.json(geojson);
  } catch (error) {
    console.error('Error fetching EnCicla stations:', error);
    
    // Return fallback data
    const fallbackGeojson: TriFC = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-75.5812, 6.2518],
          },
          properties: {
            name: 'Estación EnCicla Poblado',
            type: 'bike',
            provider: 'AMVA',
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-75.5650, 6.2442],
          },
          properties: {
            name: 'Estación EnCicla Centro',
            type: 'bike',
            provider: 'AMVA',
          },
        },
      ],
    };

    return NextResponse.json(fallbackGeojson);
  }
}