'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';

interface DataSourcesDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function DataSourcesDialog({ open, onClose }: DataSourcesDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          margin: isMobile ? 0 : 2,
          maxHeight: isMobile ? '100%' : '90vh',
        }
      }}
    >
      <DialogTitle>Fuentes de Datos</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Esta aplicación utiliza las siguientes fuentes de datos oficiales:
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">🚴 Estaciones EnCicla (AMVA)</Typography>
          <Typography variant="body2">
            Fuente: <Link href="https://www.datos.gov.co/resource/hmuf-kqju.json" target="_blank">
              Portal de Datos Abiertos Colombia - AMVA
            </Link>
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">🛣️ Ciclorrutas Valle de Aburrá</Typography>
          <Typography variant="body2">
            Fuente: Área Metropolitana del Valle de Aburrá (AMVA)
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">🚲 Ciclovías INDER</Typography>
          <Typography variant="body2">
            Fuente: Instituto de Deportes y Recreación (INDER) - Medellín
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">🏊 Escenarios Deportivos INDER</Typography>
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
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
