import { useQuery } from '@tanstack/react-query';
import {
  fetchEnciclaStations,
  fetchCiclorrutas,
  fetchCicloviasInder,
  fetchInderVenues,
  fetchMetroStations,
  fetchGooglePlaces,
} from './api';

export function useEnciclaStations() {
  return useQuery({
    queryKey: ['encicla-stations'],
    queryFn: fetchEnciclaStations,
    staleTime: 1000 * 60 * 60 * 3, // 3 hours
    retry: 3,
  });
}

export function useCiclorrutas() {
  return useQuery({
    queryKey: ['ciclorrutas'],
    queryFn: fetchCiclorrutas,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 3,
  });
}

export function useCicloviasInder() {
  return useQuery({
    queryKey: ['ciclovias-inder'],
    queryFn: fetchCicloviasInder,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 3,
  });
}

export function useInderVenues() {
  return useQuery({
    queryKey: ['inder-venues'],
    queryFn: fetchInderVenues,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 3,
  });
}

export function useMetroStations() {
  return useQuery({
    queryKey: ['metro-stations'],
    queryFn: fetchMetroStations,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 3,
  });
}

export function useGooglePlaces() {
  return useQuery({
    queryKey: ['google-places'],
    queryFn: fetchGooglePlaces,
    staleTime: 1000 * 60 * 60 * 2, // 2 hours (shorter because it's more dynamic)
    retry: 2,
    enabled: process.env.NODE_ENV === 'production' || !!process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY, // Only run if API key is available
  });
}