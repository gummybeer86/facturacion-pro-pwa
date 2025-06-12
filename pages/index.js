import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Window from '../components/Window';
import styles from '../styles/Intro.module.css';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Después de 7 segundos, ocultar el video y mostrar el logo
    const timer = setTimeout(() => {
      setShowVideo(false);
      setShowLogo(true);
    }, 7000);

    // Después de 2 segundos más, ocultar el intro completo
    const finalTimer = setTimeout(() => {
      setShowIntro(false);
    }, 9000);

    return () => {
      clearTimeout(timer);
      clearTimeout(finalTimer);
    };
  }, []);

  if (showIntro) {
    return (
      <div className={styles.container}>
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.videoContainer}
            >
              <video
                autoPlay
                muted
                className={styles.video}
              >
                <source src="/intro/video.mp4" type="video/mp4" />
              </video>
            </motion.div>
          )}

          {showLogo && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: "easeOut"
              }}
              className={styles.logoContainer}
            >
              <img
                src="/intro/logo.png"
                alt="ChapaMarket Logo"
                className={styles.logo}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Window>
      {/* Aquí va el contenido principal de tu aplicación */}
      <div className={styles.mainContent}>
        <h1>Bienvenido a ChapaMarket</h1>
        {/* Resto del contenido */}
      </div>
    </Window>
  );
} 