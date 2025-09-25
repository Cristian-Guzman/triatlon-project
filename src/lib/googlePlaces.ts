// Google Places API integration for Triatlón Medellín
// This will complement the official Colombian government data

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const BASE_URL = 'https://maps.googleapis.com/maps/api/place';

if (!GOOGLE_PLACES_API_KEY) {
  console.warn('GOOGLE_PLACES_API_KEY is not set. Google Places functionality will be disabled.');
}

// Check if Google Places API is available
export const isGooglePlacesAvailable = (): boolean => {
  return !!GOOGLE_PLACES_API_KEY;
};

export interface GooglePlaceResult {
  place_id: string;
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  types: string[];
  rating?: number;
  user_ratings_total?: number;
  vicinity?: string;
  photos?: Array<{
    photo_reference: string;
  }>;
  opening_hours?: {
    open_now?: boolean;
  };
}

export interface GooglePlacesResponse {
  results: GooglePlaceResult[];
  status: string;
  next_page_token?: string;
}

// Medellín area bounds for searches
export const MEDELLIN_BOUNDS = {
  northeast: { lat: 6.35, lng: -75.45 },
  southwest: { lat: 6.15, lng: -75.65 }
};

// Place types for triathlon activities
export const PLACE_TYPES = {
  swimming: [
    'swimming_pool',
    'aquatic_center', 
    'spa'
  ],
  running: [
    'park',
    'stadium',
    'gym',
    'track'
  ],
  cycling: [
    'bicycle_store',
    'park'
  ],
  general_sports: [
    'gym',
    'stadium',
    'sports_complex',
    'health'
  ]
};

// Keywords for more specific searches
export const SEARCH_KEYWORDS = {
  swimming: [
    'piscina',
    'natación',
    'swimming pool',
    'aquatic center',
    'complejo acuático'
  ],
  running: [
    'pista atletismo',
    'track',
    'running track',
    'estadio',
    'athletics'
  ],
  cycling: [
    'ciclorruta',
    'bike path',
    'cycling track',
    'velódromo'
  ],
  gyms: [
    'gimnasio',
    'gym',
    'fitness center',
    'crossfit'
  ]
};

export async function searchGooglePlaces(
  query: string,
  type?: string,
  location = '6.2442,-75.5812', // Medellín center
  radius = 25000 // 25km radius
): Promise<GooglePlacesResponse> {
  if (!GOOGLE_PLACES_API_KEY) {
    throw new Error('Google Places API key is required');
  }

  const params = new URLSearchParams({
    query,
    location,
    radius: radius.toString(),
    key: GOOGLE_PLACES_API_KEY,
    ...(type && { type })
  });

  const response = await fetch(
    `${BASE_URL}/textsearch/json?${params}`
  );

  if (!response.ok) {
    throw new Error(`Google Places API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getNearbyPlaces(
  type: string,
  location = '6.2442,-75.5812',
  radius = 25000
): Promise<GooglePlacesResponse> {
  if (!GOOGLE_PLACES_API_KEY) {
    throw new Error('Google Places API key is required');
  }

  const params = new URLSearchParams({
    location,
    radius: radius.toString(),
    type,
    key: GOOGLE_PLACES_API_KEY
  });

  const response = await fetch(
    `${BASE_URL}/nearbysearch/json?${params}`
  );

  if (!response.ok) {
    throw new Error(`Google Places API error: ${response.statusText}`);
  }

  return response.json();
}