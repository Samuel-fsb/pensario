import React from 'react';
import { Navbar } from './Navbar';
import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  quote: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ quote, children }) => {
  return (
    <div className={styles.authContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        <div className={styles.cardWrapper}>
          {/* Left: Illustrated Landscape with Quote */}
          <div className={styles.landscapeSide}>
            <div className={styles.landscapeImage} />
            <div className={styles.overlay} />
            <div className={styles.quoteWrapper}>
              <blockquote className={styles.quote}>“{quote}”</blockquote>
              <div className={styles.accentLine} />
            </div>
          </div>

          {/* Right: Cream Panel Form */}
          <div className={styles.formSide}>{children}</div>
        </div>
      </main>
    </div>
  );
};
