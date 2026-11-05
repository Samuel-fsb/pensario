import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { api, ApiError } from '../../services/api';
import styles from './AuthForms.module.scss';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Por favor, preencha o e-mail e a senha.');

      return;
    }

    setIsLoading(true);

    try {
      const response = await api.login({ email: email.trim(), password });

      login(response.accessToken, response.user);

      // Redireciona para onde o usuário tentou ir ou para a biblioteca
      const from = (location.state as any)?.from?.pathname || '/biblioteca';

      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === 'CONTA_NAO_ATIVADA') {
          setError(
            'Sua conta ainda não foi ativada. Verifique seu e-mail para ativá-la.',
          );
        } else if (err.status === 401) {
          setError('E-mail ou senha incorretos. Tente novamente.');
        } else {
          setError(
            err.message || 'Ocorreu um erro ao entrar. Tente novamente.',
          );
        }
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
    <AuthLayout quote="A filosofia nos convida a pensar melhor sobre o mundo e sobre nós mesmos.">
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Bem-vindo de volta</h1>
        <p className={styles.formSubtitle}>
          Acesse sua conta para continuar sua jornada.
        </p>
      </div>

      {error && (
        <div className={styles.alertError} role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <Input
          label="E-mail"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          autoComplete="email"
          disabled={isLoading}
        />

        <div className={styles.passwordFieldWrapper}>
          <Input
            label="Senha"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
            isPassword
            autoComplete="current-password"
            disabled={isLoading}
          />
          <div className={styles.forgotPasswordWrapper}>
            <Link to="/password-reset" className={styles.forgotPasswordLink}>
              Esqueceu sua senha?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          isLoading={isLoading}
          className={styles.submitButton}
        >
          Entrar
        </Button>

        <p className={styles.switchAuthText}>
          Não tem uma conta?{' '}
          <Link to="/register" className={styles.switchAuthLink}>
            Criar conta
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
