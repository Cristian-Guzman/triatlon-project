'use client';

import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Info as InfoIcon,
} from '@mui/icons-material';

interface AppBarProps {
  onDataSourcesClick: () => void;
}

export default function AppBar({ onDataSourcesClick }: AppBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiAppBar position="static">
      <Toolbar variant={isMobile ? 'dense' : 'regular'}>
        <Typography 
          variant={isMobile ? 'subtitle1' : 'h6'} 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontSize: isMobile ? '1.1rem' : '1.25rem',
          }}
        >
          Triatlón Medellín
        </Typography>
        
        {isMobile ? (
          <IconButton 
            color="inherit" 
            onClick={onDataSourcesClick}
            size="small"
          >
            <InfoIcon />
          </IconButton>
        ) : (
          <Button color="inherit" onClick={onDataSourcesClick}>
            Fuentes de Datos
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}