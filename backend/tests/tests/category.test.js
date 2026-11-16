import { describe, it } from "node:test";
import assert from "node:assert";
import { Category } from "../models/Category.js";

describe("Teste 3: Validações e Regras de Negócio de Categoria (CRUD)", () => {
  it("Deve criar uma categoria válida com nome correto", () => {
    const category = new Category(1, "Sala de Estar");

    assert.strictEqual(category.id, 1);
    assert.strictEqual(category.name, "Sala de Estar");
  });

  it("Deve permitir atualizar o nome da categoria com valor válido", () => {
    const category = new Category(2, "Cozinhas");
    category.name = "Cozinha Planejada";

    assert.strictEqual(category.name, "Cozinha Planejada");
  });

  it("Deve lançar erro ao tentar criar/atualizar categoria com nome menor que 2 caracteres", () => {
    const category = new Category(3, "Quartos");

    assert.throws(() => {
      category.name = "A";
    });

    assert.throws(() => {
      category.name = "";
    });
  });
});
