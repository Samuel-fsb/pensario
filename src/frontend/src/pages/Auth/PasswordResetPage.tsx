import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SimpleLayout } from '../../components/layout/SimpleLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { api, ApiError } from '../../services/api';
import styles from './SimpleAction.module.scss';

export const PasswordResetPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Por favor, informe seu e-mail.');

      return;
    }

    setIsLoading(true);

    try {
      const response = await api.requestPasswordReset(email.trim());

      setSuccessMessage(
        response.message ||
          'Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.',
      );
    } catch (err) {
      if (err instanceof ApiError) {
        setError(
          err.message || 'Ocorreu um erro ao solicitar a redefinição de senha.',
        );
      } else {
        setError(
          'Não foi possível conectar ao servidor. Tente novamente mais tarde.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SimpleLayout
      title="Recuperar senha"
      subtitle="Informe seu e-mail para receber as instruções de redefinição de senha."
    >
      {successMessage ? (
        <div className={styles.successCard}>
          <div className={styles.alertSuccess} role="status">
            {successMessage}
          </div>
          <p className={styles.checkEmailNotice}>
            Verifique sua caixa de entrada e pasta de spam. O link permanecerá
            ativo por tempo limitado.
          </p>
          <div className={styles.actionGroup}>
            <Link to="/login" className={styles.actionLink}>
              <Button variant="primary" size="md" fullWidth>
                Voltar ao login
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.actionForm} noValidate>
          {error && (
            <div className={styles.alertError} role="alert">
              {error}
            </div>
          )}

          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            autoComplete="email"
            disabled={isLoading}
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={isLoading}
            className={styles.submitBtn}
          >
            Enviar instruções
          </Button>

          <Link to="/login" className={styles.secondaryLink}>
            Voltar ao login
          </Link>
        </form>
      )}
    </SimpleLayout>
  );
};
