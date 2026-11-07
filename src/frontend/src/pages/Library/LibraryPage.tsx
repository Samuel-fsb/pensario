import React, { useState, useMemo } from 'react';
import { MagnifyingGlass, XCircle } from '@phosphor-icons/react';
import { Navbar } from '../../components/layout/Navbar';
import { PhilosopherCard } from '../../components/library/PhilosopherCard';
import { PHILOSOPHERS } from '../../data/philosophers';
import { Button } from '../../components/common/Button';
import styles from './LibraryPage.module.scss';

export const LibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPhilosophers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return PHILOSOPHERS;
    }

    return PHILOSOPHERS.filter((philosopher) => {
      const matchName = philosopher.name.toLowerCase().includes(term);
      const matchDesc = philosopher.shortDescription
        .toLowerCase()
        .includes(term);
      const matchWho = philosopher.whoWas.toLowerCase().includes(term);
      const matchIdeas = philosopher.mainIdeas.toLowerCase().includes(term);
      const matchTags = philosopher.tags?.some((tag) => {
        return tag.toLowerCase().includes(term);
      });

      return matchName || matchDesc || matchWho || matchIdeas || matchTags;
    });
  }, [searchTerm]);

  return (
    <div className={styles.libraryContainer}>
      <Navbar />

      {/* Fixed navbar offset */}
      <div className={styles.navOffset} />

      {/* Hero banner with landscape background */}
      <div className={styles.heroBanner}>
        <div className={styles.heroBannerBg} />
        <div className={styles.heroBannerOverlay} />
        <div className={styles.heroBannerContent}>
          <h1 className={styles.title}>Sua biblioteca de ideias</h1>
          <p className={styles.subtitle}>
            Escolha um pensador para começar a explorar.
          </p>
        </div>
      </div>

      <main className={styles.mainContent}>
        <div className={styles.contentHeader}>
          {/* Search bar */}
          <div className={styles.searchWrapper}>
            <label htmlFor="search-input" className={styles.srOnly}>
              Buscar filósofos ou conceitos
            </label>
            <MagnifyingGlass size={20} className={styles.searchIcon} />
            <input
              id="search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar filósofos ou conceitos"
              className={styles.searchInput}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className={styles.clearSearchBtn}
                aria-label="Limpar busca"
              >
                <XCircle size={18} weight="fill" />
              </button>
            )}
          </div>
        </div>

        {/* Philosophers Grid */}
        <div className={styles.gridContainer}>
          {filteredPhilosophers.length > 0 ? (
            <div className={styles.philosophersGrid}>
              {filteredPhilosophers.map((philosopher) => (
                <PhilosopherCard
                  key={philosopher.slug}
                  philosopher={philosopher}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>
                Nenhum pensador ou conceito encontrado para "
                <strong>{searchTerm}</strong>".
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchTerm('')}
              >
                Limpar busca
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
