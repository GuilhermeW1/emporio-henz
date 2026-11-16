import { describe, it } from "node:test";
import assert from "node:assert";
import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";
import { User, ProfileType } from "../models/User.js";

describe("Teste 4 (Resiliência): Testes de Quebra com Entradas Inválidas e Corrompidas", () => {
  describe("1. Tentativas de quebrar o Produto com tipos corrompidos", () => {
    it("Deve rejeitar texto, booleano e preços negativos", () => {
      const product = new Product(1, "Mesa de Jantar", [1], 0, "Mesa de madeira", 1500, []);

      // Injetando texto no lugar de número
      assert.throws(() => {
        product.price = "mil e quinhentos";
      }, /O preço do produto deve ser um valor maior que 0/);

      // Injetando booleano
      assert.throws(() => {
        product.price = true;
      }, /O preço do produto deve ser um valor maior que 0/);

      // Injetando preço negativo
      assert.throws(() => {
        product.price = -999.99;
      }, /O preço do produto deve ser um valor maior que 0/);
    });

    it("Deve rejeitar injeção de tipos inválidos em categorias (strings, objetos, IDs negativos)", () => {
      const product = new Product(1, "Cadeira", [1], 0, "Cadeira", 200, []);

      // Injetando string no lugar do array
      assert.throws(() => {
        product.categoryIds = "categoria-invalida";
      }, /O produto deve ser associado a pelo menos uma categoria/);

      // Injetando array com strings
      assert.throws(() => {
        product.categoryIds = ["um", "dois"];
      }, /Os Ids das categorias devem ser numeros validos/);

      // Injetando IDs negativos e zero
      assert.throws(() => {
        product.categoryIds = [-10, 0];
      }, /Os Ids das categorias devem ser numeros validos/);
    });

    it("Deve rejeitar injeção de strings compostas apenas por espaços em branco", () => {
      const product = new Product(1, "Guarda Roupa", [1], 0, "Desc", 1200, []);

      // Injetando apenas espaços no nome
      assert.throws(() => {
        product.name = "       ";
      }, /O nome do produto é obrigatório e deve ter no minimo 2 caracteres/);

      // Injetando apenas espaços na descrição
      assert.throws(() => {
        product.description = "   ";
      }, /A descricao do produto é obrigatoria/);
    });
  });

  describe("2. Tentativas de quebrar a Categoria com dados nulos ou tipos errados", () => {
    it("Deve rejeitar números, null e undefined no nome da categoria", () => {
      const category = new Category(1, "Banheiro");

      // Injetando número no nome
      assert.throws(() => {
        category.name = 99999;
      });

      // Injetando null
      assert.throws(() => {
        category.name = null;
      });

      // Injetando undefined
      assert.throws(() => {
        category.name = undefined;
      });

      // Injetando apenas espaços
      assert.throws(() => {
        category.name = "  ";
      });
    });
  });

  describe("3. Tentativas de quebrar o Usuário e a Autenticação", () => {
    it("Deve recusar autenticação se a senha enviada for vazia ou incorreta", () => {
      const user = new User(1, "Admin", "admin@teste.com", ProfileType.ADMIN, "SenhaSecreta!123");

      // Tentando autenticar com senha vazia
      assert.strictEqual(user.verifyPassword(""), false, "Senha vazia não pode autenticar");

      // Tentando autenticar com senhas erradas
      assert.strictEqual(user.verifyPassword("123456"), false, "Senha errada não pode autenticar");
      assert.strictEqual(user.verifyPassword("admin"), false, "Tentativa de brute-force deve ser recusada");
    });

    it("Não deve autenticar se o usuário no banco estiver sem senha configurada", () => {
      const userWithoutPassword = new User(2, "Sem Senha", "sem@teste.com", ProfileType.CLIENT, null);

      assert.strictEqual(userWithoutPassword.password, null);
      assert.strictEqual(userWithoutPassword.verifyPassword("qualquerCoisa"), false);
    });
  });
});
