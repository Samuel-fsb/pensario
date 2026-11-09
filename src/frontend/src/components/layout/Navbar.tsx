import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { SignOut, List, X } from '@phosphor-icons/react';
import { PensarioLogo } from '../common/PensarioLogo';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.scss';

interface NavbarProps {
  transparent?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sobreInView, setSobreInView] = useState(false);

  // Track scroll position to change navbar background after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track whether #sobre section is in viewport using IntersectionObserver
  useEffect(() => {
    const sobreEl = document.getElementById('sobre');

    if (!sobreEl) {
      setSobreInView(false);

      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setSobreInView(entry.isIntersecting),
      { threshold: 0.3 },
    );

    observer.observe(sobreEl);

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Smooth scroll to section anchor, handling cross-page navigation
  const handleSectionLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    closeMobileMenu();

    if (location.pathname === '/') {
      const el = document.getElementById(sectionId);

      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const headerClass = [
    styles.header,
    transparent && !scrolled ? styles.transparent : '',
    scrolled ? styles.scrolled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClass}>
      <div className={styles.inner}>
        {/* Brand / Logo */}
        <div className={styles.brand}>
          <PensarioLogo variant="horizontal" theme="light" size="md" to="/" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className={styles.navLinks} aria-label="Navegação principal">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
            end
          >
            Início
          </NavLink>

          <NavLink
            to="/biblioteca"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Biblioteca
          </NavLink>

          {isAuthenticated ? (
            <NavLink
              to="/perfil"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              Perfil
            </NavLink>
          ) : (
            <a
              href="/#sobre"
              onClick={(e) => handleSectionLink(e, 'sobre')}
              className={`${styles.navLink} ${sobreInView ? styles.sectionActive : ''}`}
            >
              Sobre
            </a>
          )}
        </nav>

        {/* Right Action: Entrar (visitor) or Sair (authenticated) */}
        <div className={styles.actions}>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className={styles.logoutButton}
              aria-label="Sair da conta"
            >
              <span>Sair</span>
              <SignOut size={18} weight="bold" />
            </button>
          ) : (
            <Link to="/login" className={styles.loginLink}>
              <Button variant="primary" size="sm">
                Entrar
              </Button>
            </Link>
          )}

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            className={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <nav className={styles.mobileNav}>
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={styles.mobileNavLink}
              end
            >
              Início
            </NavLink>
            <NavLink
              to="/biblioteca"
              onClick={closeMobileMenu}
              className={styles.mobileNavLink}
            >
              Biblioteca
            </NavLink>
            {isAuthenticated ? (
              <NavLink
                to="/perfil"
                onClick={closeMobileMenu}
                className={styles.mobileNavLink}
              >
                Perfil
              </NavLink>
            ) : (
              <a
                href="/#sobre"
                onClick={(e) => handleSectionLink(e, 'sobre')}
                className={styles.mobileNavLink}
              >
                Sobre
              </a>
            )}

            <div className={styles.mobileActionWrapper}>
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    handleLogout();
                  }}
                  className={styles.mobileLogoutButton}
                >
                  <SignOut size={18} weight="bold" />
                  <span>Sair da conta</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className={styles.mobileLoginLink}
                >
                  <Button variant="primary" size="md" fullWidth>
                    Entrar
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
