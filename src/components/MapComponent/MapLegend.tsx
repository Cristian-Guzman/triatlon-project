'use client';

import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  IconButton, 
  Collapse,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Info as InfoIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';

export default function MapLegend() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        bottom: isMobile ? 40 : 16, // More space on mobile for attribution
        left: isMobile ? 8 : 16,
        right: isMobile ? 8 : 'auto',
        p: isMobile ? 0.75 : 2,
        minWidth: isMobile ? 'auto' : 180,
        maxWidth: isMobile ? 'auto' : 260,
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
          variant={isMobile ? 'caption' : 'subtitle2'}
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <InfoIcon fontSize={isMobile ? 'small' : 'medium'} />
          Datos del Mapa
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
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: isMobile ? 0.3 : 0.75,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
            <Box sx={{ width: isMobile ? 8 : 12, height: isMobile ? 8 : 12, borderRadius: '50%', bgcolor: '#2196F3' }} />
            <Typography variant="caption" sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}>EnCicla (Bicicletas)</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
            <Box sx={{ width: isMobile ? 16 : 20, height: isMobile ? 2 : 3, bgcolor: '#4CAF50' }} />
            <Typography variant="caption" sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}>Ciclorrutas</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
            <Box sx={{ width: isMobile ? 16 : 20, height: isMobile ? 2 : 3, bgcolor: '#FF9800', borderStyle: 'dashed', borderWidth: 1 }} />
            <Typography variant="caption" sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}>Ciclovías</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
            <Box sx={{ width: isMobile ? 8 : 12, height: isMobile ? 8 : 12, borderRadius: '50%', bgcolor: '#00BCD4' }} />
            <Typography variant="caption" sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}>Natación</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
            <Box sx={{ width: isMobile ? 8 : 12, height: isMobile ? 8 : 12, borderRadius: '50%', bgcolor: '#8BC34A' }} />
            <Typography variant="caption" sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}>Atletismo</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 0.5 : 1 }}>
            <Box sx={{ width: isMobile ? 8 : 12, height: isMobile ? 8 : 12, borderRadius: '50%', bgcolor: '#9C27B0' }} />
            <Typography variant="caption" sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}>Multi-deporte</Typography>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
}