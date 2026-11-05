import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SimpleLayout } from '../../components/layout/SimpleLayout';
import { Button } from '../../components/common/Button';
import { api, ApiError } from '../../services/api';
import styles from './SimpleAction.module.scss';

export const VerifyEmailPage: React.FC = () => {
  const { token } = useParams<{ token?: string }>();

  const [status, setStatus] = useState<
    'info' | 'verifying' | 'success' | 'error'
  >(token ? 'verifying' : 'info');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!token) {
      return;
    }

    let isMounted = true;

    const activate = async () => {
      try {
        await api.activate(token);

        if (isMounted) {
          setStatus('success');
        }
      } catch (err) {
        if (isMounted) {
          setStatus('error');

          if (err instanceof ApiError) {
            setErrorMessage(
              err.message || 'O link de ativação é inválido ou expirou.',
            );
          } else {
            setErrorMessage(
              'Não foi possível ativar sua conta. Verifique sua conexão.',
            );
          }
        }
      }
    };

    activate();

    return () => {
      isMounted = false;
    };
  }, [token]);

  if (status === 'verifying') {
    return (
      <SimpleLayout
        title="Ativando sua conta"
        subtitle="Aguarde um momento enquanto confirmamos seu endereço de e-mail..."
      >
        <div className={styles.spinner} />
      </SimpleLayout>
    );
  }

  if (status === 'success') {
    return (
      <SimpleLayout
        title="Conta ativada com sucesso!"
        subtitle="Sua conta foi ativada. Você já pode fazer login e explorar o Pensário."
      >
        <div className={styles.actionGroup}>
          <Link to="/login" className={styles.actionLink}>
            <Button variant="primary" size="md" fullWidth>
              Ir para entrar
            </Button>
          </Link>
          <Link to="/" className={styles.secondaryLink}>
            Voltar ao início
          </Link>
        </div>
      </SimpleLayout>
    );
  }

  if (status === 'error') {
    return (
      <SimpleLayout
        title="Link inválido ou expirado"
        subtitle={
          errorMessage ||
          'O link de ativação é inválido ou expirou. Tente entrar ou solicite novo link.'
        }
      >
        <div className={styles.actionGroup}>
          <Link to="/login" className={styles.actionLink}>
            <Button variant="primary" size="md" fullWidth>
              Ir para entrar
            </Button>
          </Link>
          <Link to="/" className={styles.secondaryLink}>
            Voltar ao início
          </Link>
        </div>
      </SimpleLayout>
    );
  }

  // Default: tela 04 informando que o e-mail de ativação foi enviado
  return (
    <SimpleLayout
      title="Confirme seu e-mail"
      subtitle="Enviamos um link de ativação para o seu e-mail. Clique no link para ativar sua conta."
    >
      <div className={styles.actionGroup}>
        <Link to="/" className={styles.actionLink}>
          <Button variant="primary" size="md" fullWidth>
            Voltar ao início
          </Button>
        </Link>
        <Link to="/login" className={styles.secondaryLink}>
          Ir para entrar
        </Link>
      </div>
    </SimpleLayout>
  );
};
