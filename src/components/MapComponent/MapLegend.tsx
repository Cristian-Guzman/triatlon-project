'use client';

import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

export default function MapLegend() {
  return (
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
  );
}