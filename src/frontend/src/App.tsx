import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicOnlyRoute } from './routes/PublicOnlyRoute';

// Pages
import { HomePage } from './pages/Home/HomePage';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { VerifyEmailPage } from './pages/Auth/VerifyEmailPage';
import { PasswordResetPage } from './pages/Auth/PasswordResetPage';
import { PasswordResetConfirmPage } from './pages/Auth/PasswordResetConfirmPage';
import { LibraryPage } from './pages/Library/LibraryPage';
import { PhilosopherDetailPage } from './pages/Library/PhilosopherDetailPage';
import { ProfilePage } from './pages/Profile/ProfilePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <RegisterPage />
              </PublicOnlyRoute>
            }
          />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/activate/:token" element={<VerifyEmailPage />} />
          <Route path="/password-reset" element={<PasswordResetPage />} />
          <Route
            path="/password-reset/:token"
            element={<PasswordResetConfirmPage />}
          />

          {/* Protected routes */}
          <Route
            path="/biblioteca"
            element={
              <ProtectedRoute>
                <LibraryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/filosofos/:slug"
            element={
              <ProtectedRoute>
                <PhilosopherDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
