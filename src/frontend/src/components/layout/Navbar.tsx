import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`${styles.header} ${transparent ? styles.transparent : ''}`}
    >
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
            <a href="/#sobre" className={styles.navLink}>
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
                onClick={closeMobileMenu}
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
