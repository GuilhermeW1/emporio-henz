import { useNavigate } from "react-router-dom";
import { RecentViewCard } from "../components/RecentViewCart";

const product = {
  id: 1,
  name: "Roupeiro Roma",
  price: 4850.3,
  colors: ["Itauba Ambar", "Carvalho mel"],
  description:
    "O Roupeiro Roma da Linha Itália une sofisticação e versatilidade. Produzido 100% em MDF de 15 mm, seu grande diferencial é o layout interno personalizável, permitindo adaptar prateleiras e nichos durante a montagem. Conta com 6 portas (com detalhes em vidro fumê) e 3 gavetas. Para um acabamento premium e maior durabilidade, possui portas com amortecimento, corrediças telescópicas, puxadores em alumínio e laterais com moldura em chanfro de 45º.",
  characteristics: [
    "Altura: 2300 mm",
    "Largura: 2430 mm",
    "Profundidade: 565 mm",
    "Marca: Primavera",
    "6 portas e 3 gavetas",
    "Portas em vidro Fume",
  ],
  productSpecs: [
    { label: "Marca", value: "Primavera" },
    { label: "Linha", value: "Itália" },
    { label: "Material da estrutura", value: "100% MDF (15 mm)" },
    { label: "Acabamento", value: "Itaúba âmbar/carvalho mel" },
    { label: "Dimensões (A x L x P)", value: "2300 x 2430 x 565 mm" },
    { label: "Composição", value: "6 portas e 3 gavetas" },
    { label: "Material das Portas", value: "MDF e Vidro Fumê" },
    {
      label: "Ferragens",
      value: "Corrediças telescópicas e dobradiças com amortecimento",
    },
    { label: "Material dos puxadores", value: "Alumínio" },
  ],
  images: ["/product/product-image.png"],
};

export function Product() {
  const navigate = useNavigate();
  const [int, cents] = product.price.toFixed(2).split(".");
  return (
    <div className="relative">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate(-1)}
          className="h-11 w-11 bg-white rounded flex items-center justify-center "
        >
          <img src="/Back.svg" alt="voltar" className="w-5 h-5 " />
        </button>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => navigate(-1)}
          className="h-11 w-11 bg-white rounded flex items-center justify-center "
        >
          <img src="/Salvar.svg" alt="voltar" className="w-5 h-5 " />
        </button>
      </div>

      <div className="relative">
        <img src="/product/product-image.png" alt="productimage" />
      </div>

      <div className="pr-4 pl-4 mt-4">
        <span>{product.name}</span>

        <div className="flex gap-1 mt-2">
          <span className="text-sm bg bg-[#007CD840] p-1 rounded-sm">
            Fabricação: <span className="font-bold">20 dias uteis</span>
          </span>
          <span className="text-sm bg bg-[#007CD840] p-1 rounded-sm">
            Com entrega e montagem
          </span>
        </div>

        <div className="mt-6">
          <span>
            Acabamento:{" "}
            <span className="font-bold">{product.colors[0] ?? "na"}</span>
          </span>

          <div className="flex gap-4 mt-3">
            <div className="h-12 w-12 rounded-full bg-[#A58D5F] ring ring-offset-2 ring-[#A58D5F]"></div>

            <div className="h-12 w-12 rounded-full bg-[#4A3023] ring ring-offset-2 ring-[#4A3023]"></div>
          </div>
        </div>

        <div className="text-[#005CA1] mt-5 mb-2">
          <span an className="text-lg mr-1">
            R$
          </span>
          <span className="text-4xl font-bold">{int}</span>
          <span className="align-super">{"," + cents}</span>
        </div>

        <button className="flex items-center justify-center bg-[#005CA1] text-white w-full h-13 rounded-lg">
          <img
            src="/whatsapp-icon.svg"
            alt="whatsapp-icon"
            className="max-w-8 max-h-7 mr-2 "
          />{" "}
          Entre em contato
        </button>

        <div>
          <span className="font-bold">Principais caracteristicas</span>
          <ul className="text-gray-700">
            {product.characteristics.map((item) => {
              return <li key={item}>. {item}</li>;
            })}
          </ul>
        </div>
        {/* TODO: colocar localizacao */}
        <div className="flex gap-4 bg-[#64646433]/20 rounded-2xl border border-gray-200 mt-8">
          <img src="/product/amostras.png" alt="amostras" />
          <div className="flex flex-col gap-2">
            <span className="font-bold">Experimente as amostras</span>
            <span>
              Visite nossa loja e conheça de perto a qualidade dos materiais
            </span>
            <a href="" className="flex text-[#005CA1]">
              <img src="localPin.png" alt="pin" />
              Ver localizacao
            </a>
          </div>
        </div>

        <div className="mt-8">
          <span className="font-bold">Descrição do produto</span>
          <span>{product.description}</span>
        </div>

        <div className="mt-6 text-sm">
          <table>
            <tbody>
              {product.productSpecs.map((spec, idx) => {
                return (
                  <tr
                    key={spec.label}
                    className={`py-2 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-300"}`}
                  >
                    <td className="p-1">{spec.label}</td>
                    <td className="p-1">{spec.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 mb-17">
          <span className="font-bold block mb-1">Voce tambem pode gostar</span>

          <RecentViewCard />
        </div>
      </div>
    </div>
  );
}
