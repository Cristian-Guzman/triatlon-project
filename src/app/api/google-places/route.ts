import { NextResponse } from 'next/server';
import { searchGooglePlaces, SEARCH_KEYWORDS, isGooglePlacesAvailable } from '@/lib/googlePlaces';
import { TriFC } from '@/lib/types';

export async function GET() {
  // Check if Google Places API is available
  if (!isGooglePlacesAvailable()) {
    console.warn('Google Places API key not available, returning empty results');
    const fallbackGeojson: TriFC = {
      type: 'FeatureCollection',
      features: [],
    };
    return NextResponse.json(fallbackGeojson);
  }

  try {
    const allVenues: any[] = [];

    // Search for swimming pools
    for (const keyword of SEARCH_KEYWORDS.swimming) {
      try {
        const response = await searchGooglePlaces(`${keyword} Medellín`);
        if (response.results) {
          allVenues.push(...response.results.map(place => ({
            ...place,
            category: 'swimming'
          })));
        }
        // Small delay to respect API rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error searching for ${keyword}:`, error);
      }
    }

    // Search for running/athletics venues
    for (const keyword of SEARCH_KEYWORDS.running) {
      try {
        const response = await searchGooglePlaces(`${keyword} Medellín`);
        if (response.results) {
          allVenues.push(...response.results.map(place => ({
            ...place,
            category: 'running'
          })));
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error searching for ${keyword}:`, error);
      }
    }

    // Search for gyms and fitness centers
    for (const keyword of SEARCH_KEYWORDS.gyms) {
      try {
        const response = await searchGooglePlaces(`${keyword} Medellín`);
        if (response.results) {
          allVenues.push(...response.results.map(place => ({
            ...place,
            category: 'fitness'
          })));
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error searching for ${keyword}:`, error);
      }
    }

    // Remove duplicates based on place_id
    const uniqueVenues = allVenues.reduce((acc: any[], venue) => {
      if (!acc.find(existing => existing.place_id === venue.place_id)) {
        acc.push(venue);
      }
      return acc;
    }, []);

    // Convert to GeoJSON
    const geojson: TriFC = {
      type: 'FeatureCollection',
      features: uniqueVenues.map(venue => {
        let type: 'swim' | 'run' | 'multi';
        
        // Determine type based on category and place types
        if (venue.category === 'swimming' || 
            venue.types?.some((t: string) => ['swimming_pool', 'aquatic_center'].includes(t))) {
          type = 'swim';
        } else if (venue.category === 'running' || 
                   venue.types?.some((t: string) => ['stadium', 'track'].includes(t)) ||
                   /pista|athletics|atletismo|track/i.test(venue.name)) {
          type = 'run';
        } else {
          type = 'multi';
        }

        return {
          type: 'Feature' as const,
          geometry: {
            type: 'Point' as const,
            coordinates: [venue.geometry.location.lng, venue.geometry.location.lat],
          },
          properties: {
            name: venue.name,
            type,
            provider: 'GOOGLE' as const,
            rating: venue.rating,
            user_ratings_total: venue.user_ratings_total,
            vicinity: venue.vicinity,
            place_id: venue.place_id,
            open_now: venue.opening_hours?.open_now,
          },
        };
      }),
    };

    console.log(`Google Places: Found ${geojson.features.length} venues`);
    console.log(`Swimming: ${geojson.features.filter(f => f.properties.type === 'swim').length}`);
    console.log(`Running: ${geojson.features.filter(f => f.properties.type === 'run').length}`);
    console.log(`Multi: ${geojson.features.filter(f => f.properties.type === 'multi').length}`);
    
    return NextResponse.json(geojson);
  } catch (error) {
    console.error('Error fetching Google Places:', error);
    
    // Return empty GeoJSON on error
    const fallbackGeojson: TriFC = {
      type: 'FeatureCollection',
      features: [],
    };

    return NextResponse.json(fallbackGeojson);
  }
}