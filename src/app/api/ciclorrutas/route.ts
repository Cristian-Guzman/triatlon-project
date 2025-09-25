import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'ciclorrutas_va.geojson');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const geojson = JSON.parse(fileContents);
    
    return NextResponse.json(geojson);
  } catch (error) {
    console.error('Error reading ciclorrutas file:', error);
    
    // Return fallback data
    const fallbackGeojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [-75.5812, 6.2518],
              [-75.5798, 6.2501],
              [-75.5785, 6.2485]
            ]
          },
          properties: {
            name: 'Cicloruta Principal',
            type: 'bike',
            provider: 'MEDELLIN'
          }
        }
      ]
    };

    return NextResponse.json(fallbackGeojson);
  }
}