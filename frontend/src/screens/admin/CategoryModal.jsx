import { useState } from "react";
import { api } from "../../services/api";
export function CategoryModal({ category, onClose, onSaved }) {
  const isEditing = !!category;
  const [name, setName] = useState(category?.name || "");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(category?.imageUrl || null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e) {
    const rawToken = localStorage.getItem("token");
    const token = rawToken ? JSON.parse(rawToken) : null;
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      let finalImageUrl = category?.imageUrl || null;

      if (imageFile) {
        const formData = new FormData();
        formData.append("images", imageFile);

        const uploadResponse = await api("POST", "/upload", {
          body: formData,
        });
        console.log(uploadResponse.urls[0]);
        finalImageUrl = uploadResponse.imageUrl || uploadResponse.urls[0];
      }

      const payload = {
        name,
        imageUrl: finalImageUrl,
      };

      console.log(payload);
      if (isEditing) {
        await api("PUT", `/categories/${category.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: payload,
        });
      } else {
        await api("POST", "/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: payload,
        });
      }

      onSaved();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-bold text-zinc-900">
          {isEditing ? "Editar Categoria" : "Nova Categoria"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Imagem de Capa
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-zinc-600 file:mr-3 file:rounded-md file:border-0 file:bg-zinc-100 file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-zinc-200"
            />
            {preview && (
              <img
                src={preview}
                alt="Pré-visualização"
                className="mt-3 h-32 w-full rounded-lg object-cover"
              />
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
