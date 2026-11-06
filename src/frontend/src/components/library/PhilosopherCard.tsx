import React from 'react';
import { Link } from 'react-router-dom';
import { Philosopher } from '../../types/philosopher';
import { Button } from '../common/Button';
import styles from './PhilosopherCard.module.scss';

interface PhilosopherCardProps {
  philosopher: Philosopher;
}

export const PhilosopherCard: React.FC<PhilosopherCardProps> = ({
  philosopher,
}) => {
  return (
    <article className={styles.card}>
      <Link
        to={`/filosofos/${philosopher.slug}`}
        className={styles.imageLink}
        tabIndex={-1}
      >
        <div className={styles.portraitWrapper}>
          <img
            src={philosopher.portrait}
            alt={`Retrato ilustrado de ${philosopher.name}`}
            className={styles.portrait}
            loading="lazy"
          />
        </div>
      </Link>

      <div className={styles.content}>
        <h3 className={styles.name}>
          <Link
            to={`/filosofos/${philosopher.slug}`}
            className={styles.nameLink}
          >
            {philosopher.name}
          </Link>
        </h3>

        <p className={styles.shortDescription}>
          {philosopher.shortDescription}
        </p>

        <div className={styles.action}>
          <Link
            to={`/filosofos/${philosopher.slug}`}
            className={styles.buttonLink}
          >
            <Button variant="outline" size="sm" fullWidth>
              Ver resumo →
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};
