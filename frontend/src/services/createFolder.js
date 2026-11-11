const STORAGE_KEY = "minhas_pastas";

export async function seed() {
  const folders = await getFolder();
  const favorite = folders.find((item) => item.name == "Favoritos");
  if (!favorite) {
    await createFolder("Favoritos");
  }
}

export async function getFolder() {
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}

export async function createFolder(nome) {
  const pastas = await getFolder();

  const novaPasta = {
    id: Date.now().toString(),
    name: nome,
    imgPath: "/",
    itens: [],
  };

  const listaAtualizada = [...pastas, novaPasta];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listaAtualizada));

  return listaAtualizada;
}

export async function addItem(pastaId, item) {
  const pastas = await getFolder();

  const listaAtualizada = pastas.map((pasta) => {
    if (pasta.id === pastaId) {
      return {
        ...pasta,
        itens: [...pasta.itens, item],
      };
    }
    return pasta;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(listaAtualizada));
  return listaAtualizada;
}

export async function eliminarPasta(pastaId) {
  const pastas = getFolder();
  const listaAtualizada = pastas.filter((pasta) => pasta.id !== pastaId);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(listaAtualizada));
  return listaAtualizada;
}
