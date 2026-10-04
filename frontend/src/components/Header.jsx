import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);

    setIsMenuOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-50 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 z-50 w-2/4 max-w-sm shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full min-h-38 flex items-center justify-center bg-[#123854]">
          <img className="h-12 w-[222px]" src="/hamburger-sm-logo.png" alt="" />
        </div>
        {/* TODO: Renderizar as categorias */}
        <div className="bg-[#005CA1] h-full pt-10 pl-6 text-white">
          <div className=" flex flex-col gap-6">
            <button
              onClick={() => console.log("quarto")}
              className="block font-bold text-sm w-full text-left"
            >
              Quarto
            </button>
            <button
              onClick={() => console.log("Sala")}
              className="block font-bold text-sm w-full text-left"
            >
              Sala de Estar
            </button>
            <button
              onClick={() => console.log("jantar")}
              className="block font-bold text-sm w-full text-left"
            >
              Sala de Jantar
            </button>
            <button
              onClick={() => console.log("cozinha")}
              className="block font-bold text-sm w-full text-left"
            >
              Cozinha
            </button>
            <button
              onClick={() => console.log("escritorio")}
              className="block font-bold text-sm w-full text-left"
            >
              Escritorio
            </button>
            <button
              onClick={() => console.log("quarto")}
              className="block font-bold text-sm w-full text-left"
            >
              Banheiro
            </button>
          </div>

          <hr className="border-t border-[#fff] max-w-38 opacity-30 mt-6 pb-6" />

          <div className="gap-8 flex flex-col">
            <button
              onClick={() => console.log("Salvos")}
              className="font-bold text-sm w-full text-left flex-row flex gap-3"
            >
              <img src="/Salvar.png" alt="salvos" className="h-5 w-5" />
              Salvos
            </button>

            <button
              onClick={() => handleNavigate("/sobre")}
              className="font-bold text-sm w-full text-left flex-row flex gap-3"
            >
              <img src="/Market.png" alt="salvos" className="h-5 w-5" />
              Sobre a Loja
            </button>
            <button
              onClick={() => console.log("Salvos")}
              className="font-bold text-sm w-full text-left flex-row flex gap-3"
            >
              <img src="/Perfil.png" alt="salvos" className="h-5 w-5" />
              Minha Conta
            </button>
            <button
              onClick={() => console.log("Salvos")}
              className="font-bold text-sm w-full text-left flex-row flex gap-3"
            >
              <img src="/Sair.png" alt="salvos" className="h-5 w-5" />
              Sair
            </button>
          </div>
        </div>
      </div>

      <header className="lg:h-[111px] lg:pt-0 h-[152px] w-full bg-[#123854] flex-col  pt-4">
        <div className="lg:h-[77px] max-w-[380px] lg:max-w-full mx-auto w-full flex h-8  items-center justify-between">
          <button onClick={() => setIsMenuOpen(true)}>
            <img src="/Menu.png" alt="menu" className="h-6.5 w-6.5 lg:hidden" />
          </button>

          <button onClick={() => handleNavigate("/")}>
            <img
              src="/logo-small.png"
              alt="logo"
              className="w-32 h-8 lg:pl-8 lg:mt-4 "
            />
          </button>

          <div className="hidden  mx-auto w-full max-w-150 h-[45px] lg:flex mt-4 bg items-center justify-between  bg-white rounded-lg">
            <input
              className="w-full pl-4 tx-sm outline-none placeholder:text-[#646464B2]"
              placeholder="Busque por moveis para sua casa"
            />

            <img src="/Busca.svg" className="pr-4 text-[#1D1D24]" />
          </div>

          <div className="lg:gap-6 gap-4 flex lg:pr-8 lg:items-center lg:mt-4 ">
            <div className="lg:h-[46px] lg:flex lg:flex-col lg:items-center">
              <img
                src="/Loja.svg"
                alt="loja"
                className="hidden lg:block h-6 w-6"
              />
              <span className="text-white text-sm hidden lg:block">
                Sobre a loja
              </span>
            </div>

            <div className="lg:h-[46px] lg:flex lg:flex-col lg:items-center">
              <img src="/Salvar.png" alt="salvar" className="h-6.5 w-6.5" />
              <span className="text-white text-sm hidden lg:block">Salvos</span>
            </div>

            <Link
              to="conta"
              className="lg:h-[46px] lg:flex lg:flex-col lg:items-center"
            >
              <img src="/Perfil.png" alt="perfil" className="h-6.5 w-6.5" />
              <span className="text-white text-sm hidden lg:block">
                Minha conta
              </span>
            </Link>
          </div>
        </div>

        <div className="lg:hidden mx-auto w-full max-w-[380px] h-[45px] flex mt-4 bg items-center justify-between  bg-white rounded-lg">
          <input
            className="w-full pl-4 tx-sm outline-none placeholder:text-[#646464B2]"
            placeholder="Busque por moveis para sua casa"
          />
          <img src="/Busca.svg" className="pr-4 text-[#1D1D24]" />
        </div>

        <div className="bg-[#007CD8] h-[34px] mt-[12px] flex w-full justify-center items-center gap-1">
          <img src="/Vector.svg" alt="cart" />
          <span className="text-white block text-sm">
            Entrega e montagem em todo Vale do Taquari
          </span>
        </div>
      </header>
    </>
  );
}
