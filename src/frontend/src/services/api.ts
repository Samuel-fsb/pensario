/**
 * Cliente HTTP centralizado para a API do Pensário
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface RequestOptions extends RequestInit {
  token?: string | null;
}

// Handler de refresh automático para evitar loops
let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

const onRefreshed = (token: string | null) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (cb: (token: string | null) => void) => {
  refreshSubscribers.push(cb);
};

export class ApiError extends Error {
  status: number;
  code?: string;
  data?: unknown;

  constructor(message: string, status: number, code?: string, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

/**
 * Faz requisições HTTP tratando headers, cookies e respostas JSON / vazias
 */
export async function request<T = unknown>(
  endpoint: string,
  options: RequestOptions = {},
  onTokenUpdated?: (newToken: string | null) => void,
): Promise<T> {
  const { token, headers = {}, ...rest } = options;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  };

  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_URL}${endpoint}`;

  let response: Response;

  try {
    response = await fetch(url, {
      ...rest,
      headers: requestHeaders,
      credentials: 'include', // Sempre envia cookie HTTP-only
    });
  } catch (err) {
    throw new ApiError(
      'Não foi possível conectar ao servidor. Verifique sua conexão.',
      0,
    );
  }

  // Se receber 401 e for uma rota protegida (com token), tentar refresh uma vez
  if (
    response.status === 401 &&
    token &&
    endpoint !== '/login' &&
    endpoint !== '/refresh'
  ) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshRes = await fetch(`${API_URL}/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          const newToken = refreshData.accessToken;

          isRefreshing = false;
          onRefreshed(newToken);

          if (onTokenUpdated) {
            onTokenUpdated(newToken);
          }

          // Repete a requisição original com o novo token
          return request<T>(
            endpoint,
            { ...options, token: newToken },
            onTokenUpdated,
          );
        } else {
          isRefreshing = false;
          onRefreshed(null);

          if (onTokenUpdated) {
            onTokenUpdated(null);
          }
        }
      } catch (e) {
        isRefreshing = false;
        onRefreshed(null);

        if (onTokenUpdated) {
          onTokenUpdated(null);
        }
      }
    } else {
      // Aguarda o término do refresh em andamento
      return new Promise((resolve, reject) => {
        addRefreshSubscriber((newToken) => {
          if (newToken) {
            resolve(
              request<T>(
                endpoint,
                { ...options, token: newToken },
                onTokenUpdated,
              ),
            );
          } else {
            reject(new ApiError('Sessão expirada. Faça login novamente.', 401));
          }
        });
      });
    }
  }

  let data: any = null;
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    try {
      const text = await response.text();

      if (text) {
        data = { message: text };
      }
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Erro na requisição (código ${response.status})`;
    const code = data?.code;

    throw new ApiError(message, response.status, code, data);
  }

  return data as T;
}

// Métodos específicos da API
export const api = {
  // Autenticação pública
  register: (body: { name: string; email: string; password: string }) =>
    request<{ name: string; email: string }>('/register', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  activate: (token: string) =>
    request<{ message: string; alreadyActive?: boolean; status?: string }>(
      `/activate/${token}`,
      {
        method: 'GET',
      },
    ),

  login: (body: { email: string; password: string }) =>
    request<{
      accessToken: string;
      user: { id: number; name: string; email: string };
    }>('/login', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  logout: (token: string | null) =>
    request<{ message: string }>('/logout', {
      method: 'POST',
      token,
    }),

  refresh: () =>
    request<{
      accessToken: string;
      user: { id: number; name: string; email: string };
    }>('/refresh', {
      method: 'POST',
    }),

  requestPasswordReset: (email: string) =>
    request<{ message: string }>('/password-reset', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  confirmPasswordReset: (body: {
    token: string;
    password: string;
    confirmation: string;
  }) =>
    request<{ message: string }>('/password-reset/confirm', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  // Usuário / Perfil protegido
  getProfile: (token: string) =>
    request<{ id: number; name: string; email: string }>('/profile', {
      method: 'GET',
      token,
    }),

  updateProfileName: (token: string, name: string) =>
    request<{ id: number; name: string; email: string }>('/profile', {
      method: 'PATCH',
      token,
      body: JSON.stringify({ name }),
    }),

  changePassword: (
    token: string,
    body: {
      currentPassword: string;
      newPassword: string;
      confirmation: string;
    },
  ) =>
    request<{ message: string }>('/profile/password', {
      method: 'PATCH',
      token,
      body: JSON.stringify(body),
    }),
};
