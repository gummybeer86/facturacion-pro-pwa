import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect } from 'react';
import '../styles/window.css';

// Tema oscuro
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

// Tema claro
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function MyApp({ Component, pageProps }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
          console.log('ServiceWorker registrado con éxito:', registration.scope);
        }).catch(error => {
          console.log('Error al registrar el ServiceWorker:', error);
        });
      });
    }
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={`app-window ${isMaximized ? 'maximized' : ''}`}>
        <div className="window-controls">
          <button className="close" onClick={() => window.close()} />
          <button className="minimize" onClick={() => window.minimize()} />
          <button className="maximize" onClick={handleMaximize} />
        </div>
        <div className="app-content">
          <Component {...pageProps} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MyApp; 