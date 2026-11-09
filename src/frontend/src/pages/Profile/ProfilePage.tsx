import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  SignOut,
  Check,
  PencilSimple,
} from '@phosphor-icons/react';
import { Navbar } from '../../components/layout/Navbar';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { api, ApiError } from '../../services/api';
import styles from './ProfilePage.module.scss';

export const ProfilePage: React.FC = () => {
  const { user, accessToken, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  // Name editing state
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');
  const [nameLoading, setNameLoading] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [nameSuccess, setNameSuccess] = useState<string | null>(null);

  // Password changing state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (user?.name) {
      setNameInput(user.name);
    }
  }, [user?.name]);

  // Carrega os dados mais recentes do perfil ao montar
  useEffect(() => {
    if (!accessToken) {
      return;
    }

    let isMounted = true;

    api
      .getProfile(accessToken)
      .then((profile) => {
        if (isMounted) {
          updateUser(profile);
          setNameInput(profile.name);
        }
      })
      .catch((err) => {
        console.warn('Erro ao atualizar perfil inicial:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [accessToken, updateUser]);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError(null);
    setNameSuccess(null);

    const trimmed = nameInput.trim();

    if (!trimmed) {
      setNameError('O nome não pode estar em branco.');

      return;
    }

    if (!accessToken) {
      setNameError('Sessão expirada. Faça login novamente.');

      return;
    }

    setNameLoading(true);

    try {
      const updated = await api.updateProfileName(accessToken, trimmed);

      updateUser({ name: updated.name });
      setNameSuccess('Nome atualizado com sucesso!');
      setIsEditingName(false);
    } catch (err) {
      if (err instanceof ApiError) {
        setNameError(err.message || 'Erro ao atualizar o nome.');
      } else {
        setNameError('Não foi possível conectar ao servidor.');
      }
    } finally {
      setNameLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!currentPassword || !newPassword || !confirmation) {
      setPasswordError('Preencha a senha atual, a nova senha e a confirmação.');

      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('A nova senha deve ter no mínimo 6 caracteres.');

      return;
    }

    if (newPassword !== confirmation) {
      setPasswordError('A nova senha e a confirmação não coincidem.');

      return;
    }

    if (!accessToken) {
      setPasswordError('Sessão expirada. Faça login novamente.');

      return;
    }

    setPasswordLoading(true);

    try {
      const res = await api.changePassword(accessToken, {
        currentPassword,
        newPassword,
        confirmation,
      });

      setPasswordSuccess(res.message || 'Senha atualizada com sucesso!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmation('');
    } catch (err) {
      if (err instanceof ApiError) {
        setPasswordError(err.message || 'Erro ao atualizar a senha.');
      } else {
        setPasswordError('Não foi possível conectar ao servidor.');
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className={styles.profilePage}>
      <Navbar />

      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Meu perfil</h1>

          <div className={styles.profileCard}>
            {/* Top User Info Section */}
            <div className={styles.userInfoRow}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>
                  <UserIcon
                    size={44}
                    weight="fill"
                    className={styles.avatarIcon}
                  />
                </div>
              </div>

              <div className={styles.userDetails}>
                {isEditingName ? (
                  <form
                    onSubmit={handleUpdateName}
                    className={styles.inlineNameForm}
                  >
                    <Input
                      label="Nome"
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      disabled={nameLoading}
                      autoFocus
                    />
                    <div className={styles.nameFormActions}>
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        isLoading={nameLoading}
                        leftIcon={<Check size={16} weight="bold" />}
                      >
                        Salvar
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setNameInput(user?.name || '');
                          setIsEditingName(false);
                          setNameError(null);
                        }}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className={styles.infoField}>
                      <span className={styles.infoLabel}>Nome</span>
                      <span className={styles.infoValue}>
                        {user?.name || '—'}
                      </span>
                    </div>

                    <div className={styles.infoField}>
                      <span className={styles.infoLabel}>E-mail</span>
                      <span className={styles.infoValue}>
                        {user?.email || '—'}
                      </span>
                    </div>
                  </>
                )}

                {nameSuccess && (
                  <p className={styles.nameSuccess}>{nameSuccess}</p>
                )}
                {nameError && <p className={styles.nameError}>{nameError}</p>}
              </div>

              {!isEditingName && (
                <div className={styles.editAction}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsEditingName(true);
                      setNameSuccess(null);
                      setNameError(null);
                    }}
                    leftIcon={<PencilSimple size={16} />}
                  >
                    Editar nome
                  </Button>
                </div>
              )}
            </div>

            <hr className={styles.divider} />

            {/* Change Password Section */}
            <section className={styles.passwordSection}>
              <h2 className={styles.sectionTitle}>Alterar senha</h2>

              {passwordSuccess && (
                <div className={styles.alertSuccess} role="status">
                  {passwordSuccess}
                </div>
              )}

              {passwordError && (
                <div className={styles.alertError} role="alert">
                  {passwordError}
                </div>
              )}

              <form
                onSubmit={handleChangePassword}
                className={styles.passwordForm}
              >
                <div className={styles.formRow}>
                  <Input
                    label="Senha atual"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Digite a senha atual"
                    isPassword
                    required
                    disabled={passwordLoading}
                  />
                </div>

                <div className={styles.formGrid}>
                  <Input
                    label="Nova senha"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Digite a nova senha"
                    helperText="Mínimo de 6 caracteres"
                    isPassword
                    required
                    disabled={passwordLoading}
                  />

                  <Input
                    label="Confirmar nova senha"
                    type="password"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    placeholder="Confirme a nova senha"
                    isPassword
                    required
                    disabled={passwordLoading}
                  />
                </div>

                <div className={styles.formSubmitRow}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={passwordLoading}
                    className={styles.savePasswordBtn}
                  >
                    Salvar alterações
                  </Button>
                </div>
              </form>
            </section>

            <hr className={styles.divider} />

            {/* Bottom Logout Action */}
            <div className={styles.logoutRow}>
              <button
                type="button"
                onClick={handleLogout}
                className={styles.signOutButton}
              >
                <SignOut size={20} weight="bold" />
                <span>Sair da conta</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
