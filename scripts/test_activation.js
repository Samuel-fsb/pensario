'use strict';

const assert = require('assert');
const { activateUser } = require('../src/backend/services/auth-services');
const { User } = require('../src/backend/models/user-model');

// Mock User.findOne
const originalFindOne = User.findOne;

async function runTests() {
  console.log('--- Testando lógica de ativação idempotente ---');

  // Test 1: Token inexistente
  try {
    User.findOne = async () => null;
    let failed = false;
    try {
      await activateUser({ token: 'inexistente' });
    } catch (e) {
      assert.strictEqual(e.code, 'TOKEN_INVALIDO');
      failed = true;
    }
    assert.strictEqual(failed, true, 'Deveria lançar erro TOKEN_INVALIDO');
    console.log('✓ Cenário 1: Token inexistente tratado com TOKEN_INVALIDO');
  } catch (err) {
    console.error('✗ Falha no Cenário 1:', err);
    process.exit(1);
  }

  // Test 2: Token expirado para conta inativa
  try {
    User.findOne = async () => ({
      isActive: false,
      isUsed: false,
      expiresAt: new Date(Date.now() - 10000), // Expirou no passado
      update: async () => {},
    });
    let failed = false;
    try {
      await activateUser({ token: 'expirado' });
    } catch (e) {
      assert.strictEqual(e.code, 'TOKEN_EXPIRADO');
      failed = true;
    }
    assert.strictEqual(failed, true, 'Deveria lançar erro TOKEN_EXPIRADO');
    console.log('✓ Cenário 2: Token expirado para conta inativa tratado com TOKEN_EXPIRADO');
  } catch (err) {
    console.error('✗ Falha no Cenário 2:', err);
    process.exit(1);
  }

  // Test 3: Token marcado como usado mas conta inativa
  try {
    User.findOne = async () => ({
      isActive: false,
      isUsed: true,
      expiresAt: new Date(Date.now() + 100000),
      update: async () => {},
    });
    let failed = false;
    try {
      await activateUser({ token: 'usado-mas-inativo' });
    } catch (e) {
      assert.strictEqual(e.code, 'TOKEN_JA_UTILIZADO');
      failed = true;
    }
    assert.strictEqual(failed, true, 'Deveria lançar erro TOKEN_JA_UTILIZADO');
    console.log('✓ Cenário 3: Token usado mas inativo tratado com TOKEN_JA_UTILIZADO');
  } catch (err) {
    console.error('✗ Falha no Cenário 3:', err);
    process.exit(1);
  }

  // Test 4: Primeira ativação de token válido
  try {
    let updatedData = null;
    User.findOne = async () => ({
      isActive: false,
      isUsed: false,
      expiresAt: new Date(Date.now() + 100000),
      update: async (data) => {
        updatedData = data;
        return { ...data, email: 'teste@email.com' };
      },
    });

    const res = await activateUser({ token: 'token-valido' });
    assert.strictEqual(res.alreadyActive, false);
    assert.deepStrictEqual(updatedData, { isActive: true, isUsed: true });
    console.log('✓ Cenário 4: Primeira ativação define isActive=true, isUsed=true e alreadyActive=false');
  } catch (err) {
    console.error('✗ Falha no Cenário 4:', err);
    process.exit(1);
  }

  // Test 5: Segunda chamada com o mesmo token (idempotência - conta já ativada)
  try {
    let updateCalled = false;
    User.findOne = async () => ({
      isActive: true,
      isUsed: true,
      expiresAt: new Date(Date.now() + 100000),
      update: async () => {
        updateCalled = true;
      },
    });

    const res = await activateUser({ token: 'token-valido' });
    assert.strictEqual(res.alreadyActive, true);
    assert.strictEqual(updateCalled, false, 'Não deve chamar update desnecessariamente');
    console.log('✓ Cenário 5: Segunda ativação reconhece conta já ativa sem erro e sem update desnecessário');
  } catch (err) {
    console.error('✗ Falha no Cenário 5:', err);
    process.exit(1);
  }

  // Test 6: Integração no controller com mock de req e res
  const { activateAccount } = require('../src/backend/controller/auth-controller');

  // 6a: 1ª ativação no controller
  User.findOne = async () => ({
    isActive: false,
    isUsed: false,
    expiresAt: new Date(Date.now() + 100000),
    update: async (data) => ({ ...data }),
  });
  let statusSent = null;
  let jsonSent = null;
  const mockReq1 = { params: { token: 'token-novo' } };
  const mockRes1 = {
    status: (s) => {
      statusSent = s;
      return {
        json: (j) => {
          jsonSent = j;
        },
      };
    },
  };
  await activateAccount(mockReq1, mockRes1);
  assert.strictEqual(statusSent, 200);
  assert.strictEqual(jsonSent.alreadyActive, false);
  assert.strictEqual(jsonSent.status, 'sucesso');
  console.log('✓ Cenário 6a: Controller retorna HTTP 200 para primeira ativação');

  // 6b: 2ª ativação no controller (StrictMode ou F5)
  User.findOne = async () => ({
    isActive: true,
    isUsed: true,
    expiresAt: new Date(Date.now() + 100000),
    update: async () => {},
  });
  await activateAccount(mockReq1, mockRes1);
  assert.strictEqual(statusSent, 200);
  assert.strictEqual(jsonSent.alreadyActive, true);
  assert.strictEqual(jsonSent.status, 'sucesso');
  console.log('✓ Cenário 6b: Controller retorna HTTP 200 com alreadyActive=true para reativação');

  // 6c: Token inválido no controller
  User.findOne = async () => null;
  await activateAccount(mockReq1, mockRes1);
  assert.strictEqual(statusSent, 400);
  assert.strictEqual(jsonSent.code, 'TOKEN_INVALIDO');
  console.log('✓ Cenário 6c: Controller retorna HTTP 400 para token inválido');

  // Restaurar findOne
  User.findOne = originalFindOne;

  console.log('\nTodos os 6 cenários de teste foram validados com sucesso!');
}

runTests();

