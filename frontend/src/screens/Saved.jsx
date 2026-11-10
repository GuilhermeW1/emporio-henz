import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { createFolder, getFolder } from "../services/createFolder";

export function Saved() {
  const [visibility, setVisibility] = useState(false);
  const navigation = useNavigate();
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      const data = await getFolder();
      if (!ignore) setFolders(data);
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  const handleCreateFolder = useCallback(async (name) => {
    await createFolder(name);
    const data = await getFolder();
    setFolders([...data]);
    setVisibility(false);
  }, []);

  return (
    <div className="pr-4 pl-4 lg:max-w-300  lg:flex lg:flex-col lg:w-full lg:mx-auto ">
      <div className="flex items-center pt-5">
        <button type="button" onClick={() => navigation(-1)}>
          <img src="Back.svg" alt="voltar" className="h-6" />
        </button>
        <span className="text-gray-400 pl-4">Todos os itens salvos</span>
      </div>

      <div className="flex flex-col pt-7 pb-8">
        <span className="font-bold text-2xl">Salvos</span>
        <span>
          Organize seus produtos salvos em pastas para acessar depois.
        </span>
      </div>
      <div className="flex gap-3 flex-wrap">
        {folders.map((item) => {
          console.log(item);
          return (
            <Link
              to="/favoritos"
              key={item.name}
              className="flex gap-5 relative w-full h-35 border rounded-2xl border-gray-200 mb-4 lg:max-w-[380px]"
            >
              <img
                src="treDots.svg"
                alt="..."
                className="absolute top-5 right-2"
              />
              <img src="favoriteImg.png" alt="img" />
              <div className="flex-col">
                <span className="block font-bold text-lg pt-5">
                  {item.name}
                </span>
                {item.name === "Favoritos" ? (
                  <span className="block pt-1">Pasta padrao</span>
                ) : (
                  <></>
                )}

                <span className="block pt-8 text-[#005CA1]">
                  {item.itens.length ? item.itens.length : "0"} itens
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <Button
        imgPath="plus.svg"
        text="Criar pasta"
        className={"mb-12"}
        onClick={() => setVisibility(true)}
      ></Button>

      <CreateFolderModal
        isOpen={visibility}
        onClose={() => setVisibility(false)}
        onCreate={handleCreateFolder}
      />
    </div>
  );
}

function CreateFolderModal({ isOpen, onClose, onCreate }) {
  const [folderName, setFolderName] = useState("Apartamento dos sonhos");
  if (!isOpen) return;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
          aria-label="Fechar"
        >
          <img src="/close.svg" alt="fechar" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Criar uma pasta
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome da pasta
          </label>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#005CA1]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={() => onCreate(folderName)}>Criar pasta</Button>

          <button
            onClick={onClose}
            className="w-full text-gray-700 font-semibold py-2 hover:text-gray-900"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
