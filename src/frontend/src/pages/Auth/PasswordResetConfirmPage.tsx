import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SimpleLayout } from '../../components/layout/SimpleLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { api, ApiError } from '../../services/api';
import styles from './SimpleAction.module.scss';

export const PasswordResetConfirmPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError('Token de recuperação não encontrado.');

      return;
    }

    if (!password || !confirmation) {
      setError('Por favor, preencha a nova senha e a confirmação.');

      return;
    }

    if (password.length < 6) {
      setError('A nova senha deve ter no mínimo 6 caracteres.');

      return;
    }

    if (password !== confirmation) {
      setError('A nova senha e a confirmação não coincidem.');

      return;
    }

    setIsLoading(true);

    try {
      await api.confirmPasswordReset({
        token,
        password,
        confirmation,
      });

      setIsSuccess(true);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === 'SENHA_INCORRETA') {
          setError('A confirmação não confere com a nova senha.');
        } else if (err.code === 'SENHA_CURTA') {
          setError('A senha deve ter no mínimo 6 caracteres.');
        } else if (
          err.code === 'TOKEN_INVALIDO_OU_AUSENTE' ||
          err.status === 400
        ) {
          setError(
            'O link de recuperação é inválido ou expirou. Solicite um novo link.',
          );
        } else {
          setError(err.message || 'Ocorreu um erro ao redefinir sua senha.');
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
    <SimpleLayout
      title="Crie uma nova senha"
      subtitle="Digite sua nova senha para continuar."
    >
      {isSuccess ? (
        <div className={styles.successCard}>
          <div className={styles.alertSuccess} role="status">
            Sua senha foi alterada com sucesso!
          </div>
          <p className={styles.checkEmailNotice}>
            Você já pode acessar sua conta utilizando sua nova credencial.
          </p>
          <div className={styles.actionGroup}>
            <Link to="/login" className={styles.actionLink}>
              <Button variant="primary" size="md" fullWidth>
                Ir para o login
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
            label="Nova senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo de 6 caracteres"
            helperText="A senha deve ter pelo menos 6 caracteres"
            required
            isPassword
            autoComplete="new-password"
            disabled={isLoading}
          />

          <Input
            label="Confirmar nova senha"
            type="password"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder="Confirme sua senha"
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
            className={styles.submitBtn}
          >
            Salvar nova senha
          </Button>

          <Link to="/login" className={styles.secondaryLink}>
            Voltar ao login
          </Link>
        </form>
      )}
    </SimpleLayout>
  );
};
