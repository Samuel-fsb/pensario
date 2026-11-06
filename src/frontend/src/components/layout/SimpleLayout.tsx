import React from 'react';
import { Navbar } from './Navbar';
import { PensarioLogo } from '../common/PensarioLogo';
import styles from './SimpleLayout.module.scss';

interface SimpleLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showIcon?: boolean;
}

export const SimpleLayout: React.FC<SimpleLayoutProps> = ({
  title,
  subtitle,
  children,
  showIcon = true,
}) => {
  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        <div className={styles.card}>
          {showIcon && (
            <div className={styles.iconWrapper}>
              <PensarioLogo variant="icon-only" theme="dark" size="lg" to="" />
            </div>
          )}

          <h1 className={styles.title}>{title}</h1>

          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

          <div className={styles.bodyContent}>{children}</div>
        </div>
      </main>

      {/* Bottom Mountain & Pine Tree Landscape Decoration */}
      <div className={styles.bottomLandscape} aria-hidden="true" />
    </div>
  );
};
