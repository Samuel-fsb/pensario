import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { api, ApiError } from '../../services/api';
import styles from './AuthForms.module.scss';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Por favor, informe seu nome.');

      return;
    }

    if (!email.trim()) {
      setError('Por favor, informe seu e-mail.');

      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');

      return;
    }

    setIsLoading(true);

    try {
      await api.register({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      // Encaminha para tela de confirmação de e-mail (Tela 04)
      navigate('/verify-email', {
        state: { email: email.trim() },
        replace: true,
      });
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409 || err.code === 'EMAIL_DUPLICADO') {
          setError(
            'Este e-mail já está cadastrado. Tente entrar ou recuperar sua senha.',
          );
        } else if (err.code === 'SENHA_PEQUENA') {
          setError('A senha precisa ter no mínimo 6 caracteres.');
        } else {
          setError(
            err.message ||
              'Ocorreu um erro ao criar sua conta. Tente novamente.',
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
    <AuthLayout quote="Conhecimento começa com uma boa pergunta.">
      <div className={styles.formHeader}>
        <h1 className={styles.formTitle}>Crie sua conta</h1>
        <p className={styles.formSubtitle}>
          Junte-se ao Pensário e explore o mundo da filosofia.
        </p>
      </div>

      {error && (
        <div className={styles.alertError} role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <Input
          label="Nome"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          required
          autoComplete="name"
          disabled={isLoading}
        />

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

        <Input
          label="Senha"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo de 6 caracteres"
          helperText="A senha deve ter no mínimo 6 caracteres"
          required
          isPassword
          autoComplete="new-password"
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          isLoading={isLoading}
          className={styles.submitButton}
        >
          Criar conta
        </Button>

        <p className={styles.switchAuthText}>
          Já tem uma conta?{' '}
          <Link to="/login" className={styles.switchAuthLink}>
            Entrar
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
