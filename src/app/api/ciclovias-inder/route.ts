import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'ciclovias_inder.geojson');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const geojson = JSON.parse(fileContents);
    
    return NextResponse.json(geojson);
  } catch (error) {
    console.error('Error reading ciclovías INDER file:', error);
    
    // Return fallback data
    const fallbackGeojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [-75.5664, 6.2677],
              [-75.5650, 6.2658],
              [-75.5635, 6.2640]
            ]
          },
          properties: {
            name: 'Ciclovía Dominical',
            type: 'ciclovia',
            provider: 'INDER',
            horario: 'Domingos 7:00 AM - 2:00 PM',
            distancia_km: 2.5
          }
        }
      ]
    };

    return NextResponse.json(fallbackGeojson);
  }
}