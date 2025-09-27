'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  Snackbar,
  Alert,
} from '@mui/material';
import { LayerVisibility } from '@/lib/types';
import {
  useEnciclaStations,
  useCiclorrutas,
  useCicloviasInder,
  useInderVenues,
} from '@/lib/hooks';

// Import Mapbox CSS
import 'mapbox-gl/dist/mapbox-gl.css';

const MEDELLIN_CENTER: [number, number] = [-75.5664, 6.2677];
const INITIAL_ZOOM = 12;

// Prevent SSR issues
if (typeof window !== 'undefined') {
  // Only import on client side
}

export default function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataSourcesOpen, setDataSourcesOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [mapboxTokenError, setMapboxTokenError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [layerVisibility, setLayerVisibility] = useState<LayerVisibility>({
    encicla: true,
    ciclorrutas: true,
    ciclovias: true,
    swimming: true,
  });

 // Ensure component is mounted before doing anything
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch data using TanStack Query
  const { data: enciclaData, isLoading: enciclaLoading } = useEnciclaStations();
  const { data: ciclorrutasData, isLoading: ciclorrutasLoading } = useCiclorrutas();
  const { data: cicloviasData, isLoading: cicloviasLoading } = useCicloviasInder();
  const { data: inderData, isLoading: inderLoading } = useInderVenues();

  // Initialize map
  useEffect(() => {
    if (!isMounted || map.current || !mapContainer.current) return;

    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!mapboxToken || mapboxToken === 'your_mapbox_token_here') {
      console.error('Mapbox token is required');
      setMapboxTokenError(true);
      return;
    }

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: MEDELLIN_CENTER,
        zoom: INITIAL_ZOOM,
      });

      map.current.on('load', () => {
        setMapLoaded(true);
        // Show snackbar after map loads
        setTimeout(() => setSnackbarOpen(true), 1000);
      });

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapboxTokenError(true);
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapboxTokenError(true);
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [isMounted]);

  // Add data sources and layers when data is loaded
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Add EnCicla stations
    if (enciclaData && !enciclaLoading) {
      if (map.current.getSource('encicla')) {
        (map.current.getSource('encicla') as mapboxgl.GeoJSONSource).setData(enciclaData);
      } else {
        map.current.addSource('encicla', {
          type: 'geojson',
          data: enciclaData,
        });

        map.current.addLayer({
          id: 'encicla-points',
          type: 'circle',
          source: 'encicla',
          paint: {
            'circle-radius': 10,
            'circle-color': '#2196F3',
            'circle-stroke-width': 3,
            'circle-stroke-color': '#fff',
            'circle-opacity': 0.9,
          },
        });

        // Add click event for popup
        map.current.on('click', 'encicla-points', (e) => {
          if (e.features && e.features[0]) {
            const feature = e.features[0];
            const coordinates = (feature.geometry as GeoJSON.Point).coordinates as [number, number];
            const properties = feature.properties;

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`
                <div>
                  <h3>${properties?.name}</h3>
                  <p><strong>Tipo:</strong> EnCicla (${properties?.provider})</p>
                </div>
              `)
              .addTo(map.current!);
          }
        });

        map.current.on('mouseenter', 'encicla-points', () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = 'pointer';
          }
        });

        map.current.on('mouseleave', 'encicla-points', () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = '';
          }
        });
      }
    }

    // Add Ciclorrutas
    if (ciclorrutasData && !ciclorrutasLoading) {
      if (map.current.getSource('ciclorrutas')) {
        (map.current.getSource('ciclorrutas') as mapboxgl.GeoJSONSource).setData(ciclorrutasData);
      } else {
        map.current.addSource('ciclorrutas', {
          type: 'geojson',
          data: ciclorrutasData,
        });

        map.current.addLayer({
          id: 'ciclorrutas-lines',
          type: 'line',
          source: 'ciclorrutas',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#4CAF50',
            'line-width': 3,
          },
        });

        map.current.on('click', 'ciclorrutas-lines', (e) => {
          if (e.features && e.features[0]) {
            const feature = e.features[0];
            const properties = feature.properties;

            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`
                <div>
                  <h3>${properties?.name}</h3>
                  <p><strong>Tipo:</strong> Cicloruta (${properties?.provider})</p>
                </div>
              `)
              .addTo(map.current!);
          }
        });
      }
    }

    // Add Ciclovías INDER
    if (cicloviasData && !cicloviasLoading) {
      if (map.current.getSource('ciclovias')) {
        (map.current.getSource('ciclovias') as mapboxgl.GeoJSONSource).setData(cicloviasData);
      } else {
        map.current.addSource('ciclovias', {
          type: 'geojson',
          data: cicloviasData,
        });

        map.current.addLayer({
          id: 'ciclovias-lines',
          type: 'line',
          source: 'ciclovias',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#FF9800',
            'line-width': 4,
            'line-dasharray': [2, 2],
          },
        });

        map.current.on('click', 'ciclovias-lines', (e) => {
          if (e.features && e.features[0]) {
            const feature = e.features[0];
            const properties = feature.properties;

            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`
                <div>
                  <h3>${properties?.name}</h3>
                  <p><strong>Horario:</strong> ${properties?.horario || 'No especificado'}</p>
                  <p><strong>Distancia:</strong> ${properties?.distancia_km || 'N/A'} km</p>
                  <p><strong>Proveedor:</strong> ${properties?.provider}</p>
                </div>
              `)
              .addTo(map.current!);
          }
        });
      }
    }

    // Add INDER venues
    if (inderData && !inderLoading) {
      if (map.current.getSource('inder-venues')) {
        (map.current.getSource('inder-venues') as mapboxgl.GeoJSONSource).setData(inderData);
      } else {
        map.current.addSource('inder-venues', {
          type: 'geojson',
          data: inderData,
        });

        map.current.addLayer({
          id: 'inder-venues-points',
          type: 'circle',
          source: 'inder-venues',
          paint: {
            'circle-radius': 12,
            'circle-color': [
              'case',
              ['==', ['get', 'type'], 'swim'],
              '#00BCD4',
              ['==', ['get', 'type'], 'run'],
              '#8BC34A',
              '#9C27B0'
            ],
            'circle-stroke-width': 3,
            'circle-stroke-color': '#fff',
            'circle-opacity': 0.8,
          },
        });

        map.current.on('click', 'inder-venues-points', (e) => {
          if (e.features && e.features[0]) {
            const feature = e.features[0];
            const coordinates = (feature.geometry as GeoJSON.Point).coordinates as [number, number];
            const properties = feature.properties;

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`
                <div>
                  <h3>${properties?.name}</h3>
                  <p><strong>Tipo:</strong> ${properties?.type === 'swim' ? 'Natación' : properties?.type === 'run' ? 'Atletismo' : 'Multi-deporte'}</p>
                  <p><strong>Proveedor:</strong> ${properties?.provider}</p>
                  ${properties?.url ? `<p><a href="${properties.url}" target="_blank" rel="noopener noreferrer">Más información</a></p>` : ''}
                </div>
              `)
              .addTo(map.current!);
          }
        });

        map.current.on('mouseenter', 'inder-venues-points', () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = 'pointer';
          }
        });

        map.current.on('mouseleave', 'inder-venues-points', () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = '';
          }
        });
      }
    }
  }, [mapLoaded, enciclaData, enciclaLoading, ciclorrutasData, ciclorrutasLoading, cicloviasData, cicloviasLoading, inderData, inderLoading]);

  // Handle layer visibility
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    Object.entries(layerVisibility).forEach(([key, visible]) => {
      const visibility = visible ? 'visible' : 'none';
      
      switch (key) {
        case 'encicla':
          if (map.current!.getLayer('encicla-points')) {
            map.current!.setLayoutProperty('encicla-points', 'visibility', visibility);
          }
          break;
        case 'ciclorrutas':
          if (map.current!.getLayer('ciclorrutas-lines')) {
            map.current!.setLayoutProperty('ciclorrutas-lines', 'visibility', visibility);
          }
          break;
        case 'ciclovias':
          if (map.current!.getLayer('ciclovias-lines')) {
            map.current!.setLayoutProperty('ciclovias-lines', 'visibility', visibility);
          }
          break;
        case 'swimming':
          if (map.current!.getLayer('inder-venues-points')) {
            map.current!.setLayoutProperty('inder-venues-points', 'visibility', visibility);
          }
          break;
      }
    });
  }, [layerVisibility, mapLoaded]);

  const handleLayerToggle = (layer: keyof LayerVisibility) => {
    setLayerVisibility(prev => ({
      ...prev,
      [layer]: !prev[layer],
    }));
  };

  const handleSearch = () => {
    // Simple search implementation - in a real app, you'd implement more sophisticated search
    console.log('Searching for:', searchTerm);
  };

   // Don't render anything until mounted (prevents hydration mismatch)
  if (!isMounted) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>Inicializando...</div>
          <div style={{ fontSize: '14px', color: '#666' }}>Triatlón Medellín</div>
        </div>
      </div>
    );
  }

  // Show error state if Mapbox token is not configured
  if (mapboxTokenError) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Triatlón Medellín
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          p: 4,
          textAlign: 'center'
        }}>
          <Typography variant="h4" color="error" gutterBottom>
            Token de Mapbox Requerido
          </Typography>
          <Typography variant="body1" paragraph>
            Para ver el mapa interactivo, necesitas configurar tu token de Mapbox.
          </Typography>
          <Typography variant="body2" paragraph>
            1. Obtén un token gratuito en{' '}
            <Link href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer">
              mapbox.com
            </Link>
          </Typography>
          <Typography variant="body2" paragraph>
            2. Añádelo a tu archivo <code>.env.local</code>:
          </Typography>
          <Box sx={{ 
            bgcolor: 'grey.100', 
            p: 2, 
            borderRadius: 1, 
            fontFamily: 'monospace',
            mb: 2
          }}>
            NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_aquí
          </Box>
          <Typography variant="body2">
            3. Reinicia el servidor de desarrollo
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Triatlón Medellín
          </Typography>
          <Button color="inherit" onClick={() => setDataSourcesOpen(true)}>
            Fuentes de Datos
          </Button>
        </Toolbar>
      </AppBar>

      {/* Map container with overlay controls */}
      <Box sx={{ position: 'relative', flex: 1 }}>
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
        
        {/* Filter Panel */}
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            p: 2,
            minWidth: 250,
            maxWidth: 300,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Filtros
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar lugar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={layerVisibility.encicla}
                onChange={() => handleLayerToggle('encicla')}
                color="primary"
              />
            }
            label="EnCicla (Bicicletas)"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={layerVisibility.ciclorrutas}
                onChange={() => handleLayerToggle('ciclorrutas')}
                color="primary"
              />
            }
            label="Ciclorrutas"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={layerVisibility.ciclovias}
                onChange={() => handleLayerToggle('ciclovias')}
                color="primary"
              />
            }
            label="Ciclovías INDER"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={layerVisibility.swimming}
                onChange={() => handleLayerToggle('swimming')}
                color="primary"
              />
            }
            label="Escenarios Deportivos"
          />
        </Paper>

        {/* Legend */}
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            p: 2,
            minWidth: 200,
          }}
        >
          <Typography variant="subtitle2" gutterBottom>
            Leyenda
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#2196F3' }} />
              <Typography variant="caption">EnCicla (Bicicletas)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 20, height: 3, bgcolor: '#4CAF50' }} />
              <Typography variant="caption">Ciclorrutas</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 20, height: 3, bgcolor: '#FF9800', borderStyle: 'dashed', borderWidth: 1 }} />
              <Typography variant="caption">Ciclovías</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#00BCD4' }} />
              <Typography variant="caption">Natación</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#8BC34A' }} />
              <Typography variant="caption">Atletismo</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#9C27B0' }} />
              <Typography variant="caption">Multi-deporte</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Data Sources Dialog */}
      <Dialog open={dataSourcesOpen} onClose={() => setDataSourcesOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Fuentes de Datos</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Esta aplicación utiliza las siguientes fuentes de datos oficiales:
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">1. Estaciones EnCicla (AMVA)</Typography>
            <Typography variant="body2">
              Fuente: <Link href="https://www.datos.gov.co/resource/hmuf-kqju.json" target="_blank">
                Portal de Datos Abiertos Colombia - AMVA
              </Link>
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">2. Ciclorrutas Valle de Aburrá</Typography>
            <Typography variant="body2">
              Fuente: Área Metropolitana del Valle de Aburrá (AMVA)
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">3. Ciclovías INDER</Typography>
            <Typography variant="body2">
              Fuente: Instituto de Deportes y Recreación (INDER) - Medellín
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">4. Escenarios Deportivos INDER</Typography>
            <Typography variant="body2">
              Fuente: <Link href="https://www.datos.gov.co/resource/i5z5-qhf8.json" target="_blank">
                Portal de Datos Abiertos Colombia - INDER
              </Link>
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Los datos se actualizan periódicamente desde las fuentes oficiales.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDataSourcesOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Disclaimer Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: '100%' }}>
          Los datos mostrados provienen de fuentes oficiales y pueden no estar completamente actualizados.
        </Alert>
      </Snackbar>
    </Box>
  );
}