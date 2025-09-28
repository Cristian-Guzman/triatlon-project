'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import AppBar from './AppBar';

export default function MapboxTokenError() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar onDataSourcesClick={() => {}} />
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
          <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer">
            mapbox.com
          </a>
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