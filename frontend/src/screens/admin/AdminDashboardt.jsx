import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../components/Button.jsx";
import { api } from "../../services/api.js";
import { CategoryModal } from "./CategoryModal";

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products"); // "products" | "categories"
  // const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Estados dos modais
  // const [productModalOpen, setProductModalOpen] = useState(false);
  // const [editingProduct, setEditingProduct] = useState(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const rawToken = localStorage.getItem("token");
  const token = rawToken ? JSON.parse(rawToken) : null;

  async function loadData() {
    setLoading(true);
    try {
      const [categoriesData] = await Promise.all([api("GET", "/categories")]);
      // setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function load() {
      loadData();
    }
    load();
  }, []);

  // Handlers de Produto
  // function handleNewProduct() {
  //   setEditingProduct(null);
  //   setProductModalOpen(true);
  // }

  // function handleEditProduct(product) {
  //   setEditingProduct(product);
  //   setProductModalOpen(true);
  // }

  // async function handleDeleteProduct(id, name) {
  //   if (!window.confirm(`Deseja realmente excluir o produto "${name}"?`)) return;

  //   try {
  //     await api(`/products/${id}`, { method: "DELETE" });
  //     setProducts((prev) => prev.filter((item) => item.id !== id));
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }

  // Handlers de Categoria
  function handleNewCategory() {
    setEditingCategory(null);
    setCategoryModalOpen(true);
    loadData();
  }

  function handleEditCategory(category) {
    setEditingCategory(category);
    setCategoryModalOpen(true);
  }

  async function handleDeleteCategory(id, name) {
    if (!window.confirm(`Deseja realmente excluir a categoria "${name}"?`)) {
      return;
    }

    const toastId = toast.loading(`Excluindo categoria "${name}"...`);

    try {
      await api("Delete", `/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories((prev) => prev.filter((item) => item.id !== id));

      toast.update(toastId, {
        render: `Categoria "${name}" excluída com sucesso!`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(toastId, {
        render:
          error.message ||
          "Não foi possível excluir. Verifique se há produtos vinculados.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  }

  // Filtros de busca
  // const filteredProducts = products.filter((p) =>
  //   p.name.toLowerCase().includes(search.toLowerCase())
  // );

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  // const formatPrice = (value) =>
  //   new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Cabeçalho com os 2 botões de alternância */}
      <div className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">
            Painel Administrativo
          </h1>
          <p className="text-sm text-zinc-500">
            Gerencie o catálogo e as categorias da loja
          </p>
        </div>

        <div className="flex gap-2 rounded-lg bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab("products");
              setSearch("");
            }}
            className={`rounded-md px-5 py-2 text-sm font-medium transition ${
              activeTab === "products"
                ? "bg-zinc-900 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Produtos
            {/* Produtos ({products.length}) */}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("categories");
              setSearch("");
            }}
            className={`rounded-md px-5 py-2 text-sm font-medium transition ${
              activeTab === "categories"
                ? "bg-zinc-900 text-white shadow-sm"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Categorias ({categories.length})
          </button>
        </div>
      </div>

      {/* Barra de busca e botão de ação principal */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            activeTab === "products"
              ? "Buscar produto por nome..."
              : "Buscar categoria..."
          }
          className="w-80 rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-zinc-900 focus:outline-none"
        />

        <Button
          type="button"
          onClick={
            activeTab === "products" ? "handleNewProduct" : handleNewCategory
          }
          className="max-w-60"
        >
          {activeTab === "products" ? "+ Novo Produto" : "+ Nova Categoria"}
        </Button>
      </div>

      {/* Conteúdo dinâmico */}
      {loading ? (
        <p className="py-12 text-center text-zinc-500">Carregando dados...</p>
      ) : activeTab === "products" ? (
        /* TABELA DE PRODUTOS */
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-6 py-3.5">Produto</th>
                <th className="px-6 py-3.5">Categoria</th>
                <th className="px-6 py-3.5">Preço</th>
                <th className="px-6 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {/* {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-50">
                  <td className="flex items-center gap-3 px-6 py-4 font-medium text-zinc-900">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-11 w-11 rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-zinc-100 text-xs text-zinc-400">
                        Sem foto
                      </div>
                    )}
                    <span>{product.name}</span>
                  </td>
                  <td className="px-6 py-4 text-zinc-600">
                    {product.category?.name ||
                      categories.find((c) => c.id === product.categoryId)?.name ||
                      "—"}
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-900">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="mr-3 font-medium text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id, product.name)}
                      className="font-medium text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-zinc-500">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      ) : (
        /* GRADE DE CATEGORIAS */
        <div className="grid grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
            >
              <div className="h-36 w-full bg-zinc-100">
                {category.imageUrl ? (
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                    Sem imagem
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-zinc-900">{category.name}</h3>
                <div className="mt-4 flex items-center justify-end gap-3 border-t border-zinc-100 pt-3 text-sm">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteCategory(category.id, category.name)
                    }
                    className="font-medium text-red-600 hover:underline"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modais */}
      {/* {productModalOpen && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          onClose={() => setProductModalOpen(false)}
          onSaved={loadData}
        />
      )} */}

      {categoryModalOpen && (
        <CategoryModal
          category={editingCategory}
          onClose={() => setCategoryModalOpen(false)}
          onSaved={loadData}
        />
      )}
    </div>
  );
}
