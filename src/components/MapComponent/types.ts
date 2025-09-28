import { LayerVisibility } from '@/lib/types';

// Component prop interfaces
export interface AppBarProps {
  onDataSourcesClick: () => void;
}

export interface MapControlsProps {
  layerVisibility: LayerVisibility;
  onLayerToggle: (layer: keyof LayerVisibility) => void;
}

export interface DataSourcesDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface DisclaimerSnackbarProps {
  open: boolean;
  onClose: () => void;
}

// Map-specific types
export interface MapComponentState {
  mapLoaded: boolean;
  dataSourcesOpen: boolean;
  snackbarOpen: boolean;
  mapboxTokenError: boolean;
  isMounted: boolean;
  layerVisibility: LayerVisibility;
}

// Mapbox-related types
export interface MapboxInitConfig {
  token: string;
  center: [number, number];
  zoom: number;
  style: string;
}