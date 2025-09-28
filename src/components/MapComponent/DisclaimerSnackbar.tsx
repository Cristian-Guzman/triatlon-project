'use client';

import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface DisclaimerSnackbarProps {
  open: boolean;
  onClose: () => void;
}

export default function DisclaimerSnackbar({ open, onClose }: DisclaimerSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="info" sx={{ width: '100%' }}>
        Los datos mostrados provienen de fuentes oficiales y pueden no estar completamente actualizados.
      </Alert>
    </Snackbar>
  );
}