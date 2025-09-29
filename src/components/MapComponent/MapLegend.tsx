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
        bottom: isMobile ? 40 : 16,
        left: isMobile ? 8 : 16,
        right: isMobile && !isExpanded ? 'auto' : (isMobile ? 8 : 'auto'),
        p: isMobile ? (isExpanded ? 0.75 : 0.5) : 2, // More padding when expanded
        width: isMobile ? (isExpanded ? 'calc(100vw - 16px)' : '56px') : 'auto', // Same width as controls
        minWidth: isMobile ? (isExpanded ? 'auto' : '56px') : 180,
        maxWidth: isMobile ? (isExpanded ? 'calc(100vw - 16px)' : '56px') : 260,
        zIndex: 1000,
      }}
    >
      <Box
        onClick={isMobile ? toggleExpanded : undefined}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start', // Always flex-start to keep icon position consistent
          pl: isExpanded ? 1 : 1.75, // Adjust padding to center icon when collapsed
          mb: isExpanded ? 0.5 : 0,
          cursor: isMobile ? 'pointer' : 'default',
          borderRadius: isMobile ? 1 : 0,
          height: 40,
          '&:hover': isMobile ? { 
            bgcolor: 'action.hover',
          } : {},
        }}
      >
        {/* Info icon always in same position with consistent styling */}
        <InfoIcon 
          fontSize="small" 
          sx={{ 
            color: 'text.primary',
            // Same styling whether collapsed or expanded
          }} 
        />
        
        {/* Text only shows when expanded */}
        {isExpanded && (
          <Typography 
            variant={isMobile ? 'caption' : 'subtitle2'}
            sx={{ 
              fontWeight: 600,
              ml: 0.5, // Consistent spacing from icon
            }}
          >
            Datos del Mapa
          </Typography>
        )}
        
        {/* Show expand/collapse arrow only when expanded */}
        {isMobile && isExpanded && (
          <IconButton
            size="small"
            onClick={toggleExpanded}
            sx={{ 
              ml: 'auto',
              p: 0.5,
            }}
          >
            <ExpandLess />
          </IconButton>
        )}
      </Box>

      {/* Simple show/hide */}
      {isExpanded && (
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
      )}
    </Paper>
  );
}