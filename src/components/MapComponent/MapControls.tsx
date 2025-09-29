'use client';

import React, { useState } from 'react';
import {
  Paper,
  Typography,
  FormControlLabel,
  Switch,
  IconButton,
  Collapse,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { LayerVisibility } from '@/lib/types';

interface MapControlsProps {
  layerVisibility: LayerVisibility;
  onLayerToggle: (layer: keyof LayerVisibility) => void;
}

export default function MapControls({
  layerVisibility,
  onLayerToggle,
}: MapControlsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        top: isMobile ? 8 : 16,
        left: isMobile ? 8 : 16,
        right: isMobile ? 60 : 'auto', // Leave space for zoom controls on mobile
        p: isMobile ? (isExpanded ? 1 : 0.5) : 2, // Less padding when collapsed on mobile
        minWidth: isMobile ? 'auto' : 250,
        maxWidth: isMobile ? 'auto' : 300,
        width: isMobile ? 'auto' : 'auto',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: isExpanded ? 1 : 0,
        }}
      >
        <Typography 
          variant={isMobile ? 'subtitle1' : 'h6'} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1,
          }}
        >
          <FilterListIcon fontSize={isMobile ? 'small' : 'medium'} />
          Filtros
        </Typography>
        
        {isMobile && (
          <IconButton
            size="small"
            onClick={toggleExpanded}
            sx={{ p: 0.5 }}
          >
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </Box>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'column',
            gap: isMobile ? 0.5 : 1,
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={layerVisibility.encicla}
                onChange={() => onLayerToggle('encicla')}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
              />
            }
            label="EnCicla (Bicicletas)"
            sx={{
              fontSize: isMobile ? '0.875rem' : '1rem',
              '& .MuiFormControlLabel-label': {
                fontSize: isMobile ? '0.875rem' : '1rem',
              },
            }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={layerVisibility.ciclorrutas}
                onChange={() => onLayerToggle('ciclorrutas')}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
              />
            }
            label="Ciclorrutas"
            sx={{
              fontSize: isMobile ? '0.875rem' : '1rem',
              '& .MuiFormControlLabel-label': {
                fontSize: isMobile ? '0.875rem' : '1rem',
              },
            }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={layerVisibility.ciclovias}
                onChange={() => onLayerToggle('ciclovias')}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
              />
            }
            label="Ciclovías INDER"
            sx={{
              fontSize: isMobile ? '0.875rem' : '1rem',
              '& .MuiFormControlLabel-label': {
                fontSize: isMobile ? '0.875rem' : '1rem',
              },
            }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={layerVisibility.swimming}
                onChange={() => onLayerToggle('swimming')}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
              />
            }
            label="Escenarios Deportivos"
            sx={{
              fontSize: isMobile ? '0.875rem' : '1rem',
              '& .MuiFormControlLabel-label': {
                fontSize: isMobile ? '0.875rem' : '1rem',
              },
            }}
          />
        </Box>
      </Collapse>
    </Paper>
  );
}