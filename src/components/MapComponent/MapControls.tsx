'use client';

import React from 'react';
import {
  Paper,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { LayerVisibility } from '@/lib/types';

interface MapControlsProps {
  layerVisibility: LayerVisibility;
  onLayerToggle: (layer: keyof LayerVisibility) => void;
}

export default function MapControls({
  layerVisibility,
  onLayerToggle,
}: MapControlsProps) {
  return (
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

      <FormControlLabel
        control={
          <Switch
            checked={layerVisibility.encicla}
            onChange={() => onLayerToggle('encicla')}
            color="primary"
          />
        }
        label="EnCicla (Bicicletas)"
      />

      <FormControlLabel
        control={
          <Switch
            checked={layerVisibility.ciclorrutas}
            onChange={() => onLayerToggle('ciclorrutas')}
            color="primary"
          />
        }
        label="Ciclorrutas"
      />

      <FormControlLabel
        control={
          <Switch
            checked={layerVisibility.ciclovias}
            onChange={() => onLayerToggle('ciclovias')}
            color="primary"
          />
        }
        label="Ciclovías INDER"
      />

      <FormControlLabel
        control={
          <Switch
            checked={layerVisibility.swimming}
            onChange={() => onLayerToggle('swimming')}
            color="primary"
          />
        }
        label="Escenarios Deportivos"
      />
    </Paper>
  );
}