import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, House } from '@phosphor-icons/react';
import { Navbar } from '../../components/layout/Navbar';
import { Button } from '../../components/common/Button';
import { PHILOSOPHERS } from '../../data/philosophers';
import styles from './PhilosopherDetailPage.module.scss';

export const PhilosopherDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const philosopher = PHILOSOPHERS.find((p) => p.slug === slug);

  if (!philosopher) {
    return (
      <div className={styles.pageContainer}>
        <Navbar />
        <main className={styles.notFoundContainer}>
          <h1 className={styles.notFoundTitle}>Pensador não encontrado</h1>
          <p className={styles.notFoundText}>
            O pensador que você está procurando não foi encontrado em nossa
            biblioteca.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/biblioteca')}
          >
            Voltar à biblioteca
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <div className={styles.navOffset} />

      <main className={styles.mainContent}>
        <article className={styles.detailCard}>
          {/* Top Bar inside Card: Breadcrumb + Back Button */}
          <div className={styles.topBar}>
            <nav
              className={styles.breadcrumb}
              aria-label="Navegação estrutural"
            >
              <Link
                to="/biblioteca"
                className={styles.breadcrumbHome}
                aria-label="Biblioteca"
              >
                <House size={18} weight="bold" />
              </Link>
              <Link to="/biblioteca" className={styles.breadcrumbLink}>
                Biblioteca
              </Link>
              <span className={styles.breadcrumbSeparator}>›</span>
              <span className={styles.breadcrumbCurrent}>
                {philosopher.name}
              </span>
            </nav>

            <Link to="/biblioteca" className={styles.backBtnLink}>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<ArrowLeft size={16} weight="bold" />}
                className={styles.backButton}
              >
                Voltar à biblioteca
              </Button>
            </Link>
          </div>

          {/* Left-aligned Editorial Content */}
          <div className={styles.textContent}>
            <h1 className={styles.philosopherName}>{philosopher.name}</h1>

            <section className={styles.textSection}>
              <h2 className={styles.sectionHeading}>Quem foi</h2>
              <p className={styles.sectionParagraph}>{philosopher.whoWas}</p>
            </section>

            <section className={styles.textSection}>
              <h2 className={styles.sectionHeading}>Principais ideias</h2>
              <p className={styles.sectionParagraph}>{philosopher.mainIdeas}</p>
            </section>

            <section className={styles.textSection}>
              <h2 className={styles.sectionHeading}>Por que ainda importa?</h2>
              <p className={styles.sectionParagraph}>
                {philosopher.whyItMatters}
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
};
