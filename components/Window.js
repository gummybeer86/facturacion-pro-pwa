import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Window.module.css';

export default function Window({ children }) {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <motion.div
      className={`${styles.window} ${isMaximized ? styles.maximized : ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.titleBar}>
        <div className={styles.controls}>
          <button className={styles.close} onClick={() => window.close()} />
          <button className={styles.minimize} onClick={() => window.minimize()} />
          <button 
            className={styles.maximize} 
            onClick={() => setIsMaximized(!isMaximized)} 
          />
        </div>
        <div className={styles.title}>ChapaMarket</div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </motion.div>
  );
} 