import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { Philosopher } from '../../types/philosopher';
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
        aria-hidden="true"
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

        <p className={styles.tagline}>{philosopher.shortDescription}</p>

        <p className={styles.bio}>
          {philosopher.whoWas.length > 160
            ? philosopher.whoWas.slice(0, 157) + '…'
            : philosopher.whoWas}
        </p>

        <div className={styles.action}>
          <Link
            to={`/filosofos/${philosopher.slug}`}
            className={styles.ctaLink}
          >
            Ver resumo <ArrowRight size={15} weight="bold" />
          </Link>
        </div>
      </div>
    </article>
  );
};
