import { describe, it } from "node:test";
import assert from "node:assert";
import { Product } from "../models/Product.js";

describe("Teste 2: Regras de Negócio e Validações do CRUD de Produto", () => {
  it("Deve instanciar um produto válido com dados corretos", () => {
    const product = new Product(
      1,
      "Sofá Retrátil 3 Lugares",
      [1, 2],
      0,
      "Sofá confortável para sala de estar",
      2499.90,
      []
    );

    assert.strictEqual(product.name, "Sofá Retrátil 3 Lugares");
    assert.deepStrictEqual(product.categoryIds, [1, 2]);
    assert.strictEqual(product.price, 2499.90);
    assert.strictEqual(product.viewCount, 0);

    product.incrementViewCount();
    assert.strictEqual(product.viewCount, 1);
  });

  it("Deve lançar erro ao tentar definir nome com menos de 2 caracteres", () => {
    const product = new Product(1, "Válido", [1], 0, "Desc", 100, []);

    assert.throws(() => {
      product.name = "A";
    }, /O nome do produto é obrigatório e deve ter no minimo 2 caracteres/);
  });

  it("Deve lançar erro ao tentar definir preço menor ou igual a zero", () => {
    const product = new Product(1, "Válido", [1], 0, "Desc", 100, []);

    assert.throws(() => {
      product.price = 0;
    }, /O preço do produto deve ser um valor maior que 0/);

    assert.throws(() => {
      product.price = -50;
    }, /O preço do produto deve ser um valor maior que 0/);
  });

  it("Deve lançar erro se o produto não possuir nenhuma categoria associada", () => {
    const product = new Product(1, "Válido", [1], 0, "Desc", 100, []);

    assert.throws(() => {
      product.categoryIds = [];
    }, /O produto deve ser associado a pelo menos uma categoria/);
  });
});
