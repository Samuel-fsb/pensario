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

  // Se for Sócrates, podemos usar a imagem ampliada de alta fidelidade
  const portraitSrc =
    philosopher.slug === 'socrates'
      ? '/assets/philosophers/socrates-large.png'
      : philosopher.portrait;

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        {/* Top Header Bar: Breadcrumb + Back Button */}
        <div className={styles.topBar}>
          <nav className={styles.breadcrumb} aria-label="Navegação estrutural">
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
            <span className={styles.breadcrumbCurrent}>{philosopher.name}</span>
          </nav>

          <Link to="/biblioteca" className={styles.backBtnLink}>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ArrowLeft size={16} weight="bold" />}
            >
              Voltar à biblioteca
            </Button>
          </Link>
        </div>

        {/* Two-column Detail Content */}
        <article className={styles.detailCard}>
          {/* Left Column: Portrait */}
          <div className={styles.portraitColumn}>
            <div className={styles.portraitWrapper}>
              <img
                src={portraitSrc}
                alt={`Retrato em busto de ${philosopher.name}`}
                className={styles.portraitImage}
              />
            </div>
          </div>

          {/* Right Column: Editorial Text */}
          <div className={styles.textColumn}>
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

            {philosopher.tags && (
              <div className={styles.tagsWrapper}>
                {philosopher.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </main>
    </div>
  );
};
