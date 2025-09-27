export type VenueType = 'run' | 'bike' | 'swim' | 'ciclovia' | 'metro' | 'multi';

export interface TriProps {
  id?: string;
  name: string;
  type: VenueType;
  provider: 'AMVA' | 'INDER' | 'METRO' | 'MEDELLIN' | 'GOOGLE';
  horario?: string;
  distancia_km?: number;
  url?: string;
}

export type TriFeature = GeoJSON.Feature<GeoJSON.Point | GeoJSON.LineString, TriProps>;
export type TriFC = GeoJSON.FeatureCollection<GeoJSON.Geometry, TriProps>;

export interface LayerVisibility {
  encicla: boolean;
  ciclorrutas: boolean;
  ciclovias: boolean;
  swimming: boolean;
}

export interface EnCiclaStation {
  nombre_estacion: string;
  latitud: number;
  longitud: number;
}

export interface InderVenue {
  escenario?: string;
  nombre?: string;
  latitud: number;
  longitud: number;
  enlace?: string;
}
