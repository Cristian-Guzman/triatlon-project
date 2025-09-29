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
        right: isMobile && !isExpanded ? 'auto' : (isMobile ? 60 : 'auto'), // Dynamic right margin
        p: isMobile ? (isExpanded ? 0.75 : 0.5) : 2,
        minWidth: isMobile ? (isExpanded ? 'auto' : 'fit-content') : 200, // Minimal width when collapsed
        maxWidth: isMobile ? (isExpanded ? 'calc(100vw - 120px)' : 'fit-content') : 280, // Responsive max width
        width: isMobile ? (isExpanded ? 'auto' : 'fit-content') : 'auto', // Fit content when collapsed
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile && !isExpanded ? 'center' : 'space-between',
          mb: isExpanded ? 0.5 : 0,
          gap: isMobile && !isExpanded ? 0.5 : 1, // Tight spacing when collapsed
        }}
      >
        <Typography 
          variant={isMobile ? 'subtitle1' : 'h6'} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1,
            fontWeight: 600,
          }}
        >
          <FilterListIcon fontSize={isMobile ? 'small' : 'medium'} />
          {(!isMobile || isExpanded) && 'Capas del Mapa'}
        </Typography>
        
        {isMobile && (
          <IconButton
            size="medium"
            onClick={toggleExpanded}
            sx={{ 
              p: 1,
              minWidth: 44,
              minHeight: 44, // Minimum touch target size
            }}
          >
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </Box>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 0.75 : 1.2 }}>
          
          {/* Cycling Infrastructure Category */}
          <Box>
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: 600, 
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: 0.3,
                mb: 0.25,
                display: 'block',
                fontSize: isMobile ? '0.65rem' : '0.75rem'
              }}
            >
              Infraestructura Ciclística
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 0.1 : 0.25 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={layerVisibility.encicla}
                    onChange={() => onLayerToggle('encicla')}
                    color="primary"
                    size="small"
                    sx={{ transform: isMobile ? 'scale(0.85)' : 'none' }}
                  />
                }
                label="EnCicla (Estaciones)"
                sx={{
                  ml: 0,
                  mr: 0,
                  minHeight: isMobile ? 40 : 'auto', // Better touch target
                  '& .MuiFormControlLabel-label': {
                    fontSize: isMobile ? '0.75rem' : '0.8rem',
                    fontWeight: 400,
                    lineHeight: 1.2,
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={layerVisibility.ciclorrutas}
                    onChange={() => onLayerToggle('ciclorrutas')}
                    color="primary"
                    size="small"
                    sx={{ transform: isMobile ? 'scale(0.85)' : 'none' }}
                  />
                }
                label="Ciclorrutas"
                sx={{
                  ml: 0,
                  mr: 0,
                  minHeight: isMobile ? 40 : 'auto', // Better touch target
                  '& .MuiFormControlLabel-label': {
                    fontSize: isMobile ? '0.75rem' : '0.8rem',
                    fontWeight: 400,
                    lineHeight: 1.2,
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={layerVisibility.ciclovias}
                    onChange={() => onLayerToggle('ciclovias')}
                    color="primary"
                    size="small"
                    sx={{ transform: isMobile ? 'scale(0.85)' : 'none' }}
                  />
                }
                label="Ciclovías Recreativas"
                sx={{
                  ml: 0,
                  mr: 0,
                  minHeight: isMobile ? 40 : 'auto', // Better touch target
                  '& .MuiFormControlLabel-label': {
                    fontSize: isMobile ? '0.75rem' : '0.8rem',
                    fontWeight: 400,
                    lineHeight: 1.2,
                  },
                }}
              />
            </Box>
          </Box>

          {/* Sports Facilities Category */}
          <Box>
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: 600, 
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: 0.3,
                mb: 0.25,
                display: 'block',
                fontSize: isMobile ? '0.65rem' : '0.75rem'
              }}
            >
              Deportes
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 0.1 : 0.25 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={layerVisibility.swimming}
                    onChange={() => onLayerToggle('swimming')}
                    color="primary"
                    size="small"
                    sx={{ transform: isMobile ? 'scale(0.85)' : 'none' }}
                  />
                }
                label="Instalaciones Deportivas"
                sx={{
                  ml: 0,
                  mr: 0,
                  minHeight: isMobile ? 40 : 'auto', // Better touch target
                  '& .MuiFormControlLabel-label': {
                    fontSize: isMobile ? '0.75rem' : '0.8rem',
                    fontWeight: 400,
                    lineHeight: 1.2,
                  },
                }}
              />
            </Box>
          </Box>

        </Box>
      </Collapse>
    </Paper>
  );
}