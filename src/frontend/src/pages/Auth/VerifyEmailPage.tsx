import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SimpleLayout } from '../../components/layout/SimpleLayout';
import { Button } from '../../components/common/Button';
import { api, ApiError } from '../../services/api';
import styles from './SimpleAction.module.scss';

// Cache para reaproveitar requisições em voo com o mesmo token (ex: React 18 StrictMode)
const inFlightActivations = new Map<
  string,
  Promise<{ message: string; alreadyActive?: boolean; status?: string }>
>();

export const VerifyEmailPage: React.FC = () => {
  const { token } = useParams<{ token?: string }>();

  const [status, setStatus] = useState<
    'info' | 'verifying' | 'success' | 'error'
  >(token ? 'verifying' : 'info');

  const [successTitle, setSuccessTitle] = useState(
    'Conta ativada com sucesso!',
  );
  const [successDescription, setSuccessDescription] = useState(
    'Seu endereço de e-mail foi confirmado e sua conta está ativa. Agora você já pode entrar no Pensário.',
  );

  const [errorTitle, setErrorTitle] = useState('Link inválido ou expirado');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!token) {
      return;
    }

    let isMounted = true;

    const activate = async () => {
      try {
        let promise = inFlightActivations.get(token);

        if (!promise) {
          promise = api.activate(token);
          inFlightActivations.set(token, promise);
        }

        const response = await promise;

        if (isMounted) {
          if (response.alreadyActive) {
            setSuccessTitle('Conta ativada!');

            setSuccessDescription(
              'Esta conta já estava ativada. Você já pode entrar no Pensário.',
            );
          } else {
            setSuccessTitle('Conta ativada com sucesso!');

            setSuccessDescription(
              'Seu endereço de e-mail foi confirmado e sua conta está ativa. Agora você já pode entrar no Pensário.',
            );
          }
          setStatus('success');
        }
      } catch (err) {
        if (isMounted) {
          setStatus('error');

          if (err instanceof ApiError) {
            if (err.status === 0) {
              setErrorTitle('Erro de conexão');

              setErrorMessage(
                'Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.',
              );
            } else if (err.code === 'TOKEN_EXPIRADO') {
              setErrorTitle('Link expirado');

              setErrorMessage(
                'O link de ativação expirou. Solicite um novo link para ativar sua conta.',
              );
            } else if (err.code === 'TOKEN_INVALIDO') {
              setErrorTitle('Link inválido');

              setErrorMessage(
                'O link de ativação é inválido ou não foi encontrado.',
              );
            } else if (err.code === 'TOKEN_JA_UTILIZADO') {
              setErrorTitle('Link indisponível');

              setErrorMessage(
                'O token de ativação informado já foi utilizado ou é inconsistente.',
              );
            } else {
              setErrorTitle('Link inválido ou expirado');

              setErrorMessage(
                err.message || 'O link de ativação é inválido ou expirou.',
              );
            }
          } else {
            setErrorTitle('Erro de conexão');

            setErrorMessage(
              'Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.',
            );
          }
        }
      } finally {
        setTimeout(() => {
          inFlightActivations.delete(token);
        }, 500);
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
      <SimpleLayout title={successTitle} subtitle={successDescription}>
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
        title={errorTitle}
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
