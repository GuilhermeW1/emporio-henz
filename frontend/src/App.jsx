import "./App.css";
import Header from "./components/Header";
import { HighlightCard } from "./components/HighlightCard";
import { RecentViewCard } from "./components/RecentViewCart";
import { SectionCard } from "./components/SectionCard";
export default function App() {
  return (
    <main>
      <Header />
      <div className="h-94 bg-[#007CD840] flex relative overflow-hidden">
        <div className="relative z-20 top-11 left-6">
          <h1 className="text-[26px]/6.5">
            Móveis para <br /> <span className="font-bold">transformar</span>{" "}
            <br />o seu lar
          </h1>
        </div>
        <img
          src="/background-blue.png"
          alt="fundo"
          className="absolute bottom-8 right-0 z-0"
        />
        <img
          src="/chair.png"
          alt="cadeira"
          className="absolute right-0.5 -bottom-7"
        />
      </div>

      <div className="relative -mt-10 mr-3 ml-3">
        <div className="flex flex-wrap gap-3 justify-center">
          <SectionCard name="Quarto" imgPath="/armario.png" />
          <SectionCard name="Quarto" imgPath="/armario.png" />
          <SectionCard name="Quarto" imgPath="/armario.png" />
          <SectionCard name="Quarto" imgPath="/armario.png" />
          <SectionCard name="Quarto" imgPath="/armario.png" />
          <SectionCard name="Quarto" imgPath="/armario.png" />
        </div>

        <hr className="border-t border-[#6464644D] my-12" />

        <span className="mb-3 block font-medium">Destaques</span>

        <div className="flex flex-wrap gap-3 justify-center">
          <HighlightCard />
          <HighlightCard />
          <HighlightCard />
          <HighlightCard />
        </div>

        <hr className="border-t border-[#6464644D] my-12" />

        <span className="mb-3 block font-medium">Vistos recentemente</span>

        <div className="flex gap-3">
          <RecentViewCard />
          <RecentViewCard />
        </div>
      </div>
      <div className="mt-16 bg-[#123854] h-[555px] flex-col justify-center pl-3 pr-3 text-sm">
        <div className="pt-8 flex justify-center">
          <img src="/logo-footer.png" alt="logo" />
        </div>

        <span className="block text-white pt-8 pb-4 font-bold ">
          Categorias
        </span>

        <div className="text-white flex justify-between">
          <div className="">
            <span className="block">Quarto</span>
            <span className="block">Sala de estar</span>
            <span className="blok">Sala de jantar</span>
          </div>

          <div className="">
            <span className="block">Cozinha</span>
            <span className="block">Escritorio</span>
            <span className="block">Banheiro</span>
          </div>

          <div></div>
        </div>

        <span className="block text-white pt-8 pb-4 font-bold text-sm">
          Empório Henz
        </span>

        <span className="text-white block mt-6 text-sm">Sobre a loja</span>

        <span className="text-white block mt-4 text-sm">
          Rua General Neto, 317 - Centro, Cruzeiro do Sul - RS, 95930-000
        </span>

        <div className="flex gap-2 mt-4">
          <img src="/whatsapp-icon.svg" alt="whatsapp" />
          <img src="/instagram-icon.svg" alt="instagram" />
        </div>
      </div>
    </main>
  );
}
