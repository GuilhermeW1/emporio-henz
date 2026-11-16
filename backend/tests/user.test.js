import { describe, it } from "node:test";
import assert from "node:assert";
import { User, ProfileType } from "../models/User.js";

describe("Teste 1: Modelo de Usuário e Segurança de Senha (Dois Papéis)", () => {
  it("Deve criar um usuário com perfil CLIENT por padrão e gerar hash seguro", () => {
    const user = new User(1, "João Silva", "joao@email.com", undefined, "MinhaSenha123");
    
    assert.strictEqual(user.name, "João Silva");
    assert.strictEqual(user.email, "joao@email.com");
    assert.strictEqual(user.profile, ProfileType.CLIENT);
    assert.notStrictEqual(user.password, "MinhaSenha123", "A senha pura não deve ser armazenada");
    assert.ok(user.password.includes(":"), "O hash deve conter salt e hash separados por :");
  });

  it("Deve autenticar senha correta e rejeitar senha errada", () => {
    const user = new User(2, "Admin Henz", "admin@henz.com", ProfileType.ADMIN, "AdminSecret!99");
    
    assert.strictEqual(user.profile, ProfileType.ADMIN);
    assert.strictEqual(user.verifyPassword("AdminSecret!99"), true, "Deve validar senha correta");
    assert.strictEqual(user.verifyPassword("SenhaErrada"), false, "Deve rejeitar senha incorreta");
  });
});
