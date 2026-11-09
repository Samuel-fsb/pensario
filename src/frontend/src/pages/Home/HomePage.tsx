import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import { Navbar } from '../../components/layout/Navbar';
import { Button } from '../../components/common/Button';
import { PensarioLogo } from '../../components/common/PensarioLogo';
import { useAuth } from '../../context/AuthContext';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleExplore = () => {
    if (isAuthenticated) {
      navigate('/biblioteca');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={styles.homeContainer}>
      <Navbar transparent />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground} />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Grandes ideias.
            <br />
            Novas perspectivas.
          </h1>

          <p className={styles.heroSubtitle}>
            Explore a filosofia através de resumos claros e histórias de grandes
            pensadores.
          </p>

          <div className={styles.ctaGroup}>
            <Button
              variant="primary"
              size="lg"
              onClick={handleExplore}
              rightIcon={<ArrowRight size={20} weight="bold" />}
              className={styles.heroPrimaryBtn}
            >
              Explorar biblioteca
            </Button>

            {!isAuthenticated && (
              <Link to="/login" className={styles.secondaryCtaLink}>
                <Button
                  variant="outline"
                  size="lg"
                  className={styles.heroSecondaryBtn}
                >
                  Entrar
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Seção Sobre (PRD 5.1 / 5.2) */}
      <section id="sobre" className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutHeader}>
            <h2 className={styles.aboutTitle}>
              Uma pausa contemplativa para o pensamento
            </h2>
            <p className={styles.aboutText}>
              O Pensário nasceu para tornar os conceitos fundamentais da
              filosofia ocidental acessíveis, acolhedores e inspiradores. Em um
              mundo agitado, oferecemos um refúgio de clareza, conectando
              sabedorias milenares aos dilemas do nosso tempo.
            </p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Resumos Essenciais</h3>
              <p className={styles.featureDesc}>
                Textos concisos e contextualizados que explicam quem foram os
                pensadores, suas teses centrais e a relevância duradoura de suas
                ideias.
              </p>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Jornada Autêntica</h3>
              <p className={styles.featureDesc}>
                Navegação sem ruídos ou algoritmos opacos: explore livremente os
                caminhos da ética, do conhecimento, da metafísica e da virtude.
              </p>
            </div>

            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Experiência Editorial</h3>
              <p className={styles.featureDesc}>
                Design refinado e atmosfera contemplativa, concebido para uma
                leitura tranquila e agradável em qualquer tela.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <PensarioLogo variant="horizontal" theme="light" size="sm" to="/" />
            <p className={styles.footerTagline}>
              Pensário digital de filosofia e reflexão.
            </p>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Pensário. Todos os direitos
              reservados.
            </p>
          </div>

          <div className={styles.footerRight}>
            <a
              href="https://portfolio-samuel-bezerra.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.portfolioLink}
            >
              <span>Site desenvolvido por Samuel Bezerra</span>
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
