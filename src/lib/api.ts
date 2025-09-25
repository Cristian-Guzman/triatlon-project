import { TriFC } from './types';

const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

export async function fetchEnciclaStations(): Promise<TriFC> {
  const response = await fetch(`${API_BASE}/api/encicla`);
  if (!response.ok) {
    throw new Error('Failed to fetch EnCicla stations');
  }
  return response.json();
}

export async function fetchCiclorrutas(): Promise<TriFC> {
  const response = await fetch(`${API_BASE}/api/ciclorrutas`);
  if (!response.ok) {
    console.error('Failed to fetch bike routes');
    return {
      type: 'FeatureCollection',
      features: [],
    };
  }
  return response.json();
}

export async function fetchCicloviasInder(): Promise<TriFC> {
  const response = await fetch(`${API_BASE}/api/ciclovias-inder`);
  if (!response.ok) {
    console.error('Failed to fetch INDER cycling paths');
    return {
      type: 'FeatureCollection', 
      features: [],
    };
  }
  return response.json();
}

export async function fetchInderVenues(): Promise<TriFC> {
  const response = await fetch(`${API_BASE}/api/inder-venues`);
  if (!response.ok) {
    throw new Error('Failed to fetch INDER venues');
  }
  return response.json();
}

export async function fetchMetroStations(): Promise<TriFC> {
  const response = await fetch(`${API_BASE}/api/metro-stations`);
  if (!response.ok) {
    throw new Error('Failed to fetch Metro stations');
  }
  return response.json();
}

export async function fetchGooglePlaces(): Promise<TriFC> {
  const response = await fetch(`${API_BASE}/api/google-places`);
  if (!response.ok) {
    console.error('Failed to fetch Google Places data');
    return {
      type: 'FeatureCollection',
      features: [],
    };
  }
  return response.json();
}