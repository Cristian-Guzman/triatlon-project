'use client';

import { useEffect, useState } from 'react';

// Simple loading component to avoid hydration issues
function LoadingScreen() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '18px', marginBottom: '10px' }}>Cargando mapa...</div>
        <div style={{ fontSize: '14px', color: '#666' }}>Triatlón Medellín</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Dynamically import the map component only on the client side
    import('../components/MapComponent').then((module) => {
      setMapComponent(() => module.default);
    });
  }, []);

  if (!MapComponent) {
    return <LoadingScreen />;
  }

  return <MapComponent />;
}
