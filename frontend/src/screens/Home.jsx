import { HighlightCard } from "../components/HighlightCard";
import { RecentViewCard } from "../components/RecentViewCart";
import { SectionCard } from "../components/SectionCard";
import { seed } from "../services/createFolder";

export function Home() {
  //popula o localstorage
  seed();

  return (
    <>
      <div className="h-94 lg:h-100 bg-[#007CD840] flex relative overflow-hidden ">
        <div className="w-full max-w-7xl mx-auto px-6 h-full flex lg:items-center items-start justify-between relative overflow-hidden">
          <div className="z-20 py-6 lg:pl-19 sm:p-0">
            <h1 className="text-[26px]/6.5">
              Móveis para <br /> <span className="font-bold">transformar</span>{" "}
              <br />o seu lar
            </h1>

            <div className="hidden w-[330px] h-[102px] bg-white rounded-2xl lg:flex items-center justify-center mt-11">
              <img
                src="/hero-card.svg"
                alt="hero-card"
                className="w-[294px] h-[73px]"
              />
            </div>
          </div>

          {/* mobile */}
          <div className="flex lg:hidden">
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

          {/* desktop */}
          <div className="hidden lg:flex">
            <img
              src="/hero-background-lg.png"
              alt="fundo"
              className="absolute bottom-0 right-0 z-0 object-contain"
            />
            <img
              src="/hero-img-lg.png"
              alt="cadeira desktop"
              className="absolute right-26 -bottom-4"
            />
          </div>
        </div>
      </div>

      <div className="relative -mt-10  max-w-[1200px] mx-auto px-3 lg:px-0">
        <div className="flex flex-wrap gap-3 justify-center">
          <SectionCard name="Quarto" imgPath="/armario.png" />
          <SectionCard name="Quarto" imgPath="/armario.png" />
          <SectionCard name="Quarto" imgPath="/armario.png" />
          <SectionCard name="Quarto" imgPath="/armario.png" />
          <SectionCard name="Quarto" imgPath="/armario.png" />
          <SectionCard name="Quarto" imgPath="/armario.png" />
        </div>

        <hr className="border-t border-[#6464644D] my-12 lg:hidden" />

        <span className="mb-3 block lg:my-12 font-bold">Destaques</span>

        <div className="flex flex-wrap gap-3 justify-center">
          <HighlightCard />
          <HighlightCard />
          <HighlightCard />
          <HighlightCard />
        </div>

        <hr className="border-t border-[#6464644D] my-12" />

        <span className="mb-3 block font-medium">Vistos recentemente</span>

        <div className="flex gap-3 mb-14">
          <RecentViewCard />
          <RecentViewCard />
        </div>
      </div>
    </>
  );
}
