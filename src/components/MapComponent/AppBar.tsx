'use client';

import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

interface AppBarProps {
  onDataSourcesClick: () => void;
}

export default function AppBar({ onDataSourcesClick }: AppBarProps) {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Triatlón Medellín
        </Typography>
        <Button color="inherit" onClick={onDataSourcesClick}>
          Fuentes de Datos
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
}