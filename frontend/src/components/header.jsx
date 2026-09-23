export default function Header() {
  return (
    <header className="lg:h-[111px] lg:pt-0 h-[152px] w-full bg-[#123854] flex-col  pt-4">
      <div className="lg:h-[77px] max-w-[380px] lg:max-w-full mx-auto w-full flex h-8  items-center justify-between">
        <img src="/Menu.png" alt="menu" className="h-6.5 w-6.5 lg:hidden" />
        <img
          src="/logo-small.png"
          alt="logo"
          className="w-32 h-8 lg:pl-8 lg:mt-4 "
        />

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

          <div className="lg:h-[46px] lg:flex lg:flex-col lg:items-center">
            <img src="/Perfil.png" alt="perfil" className="h-6.5 w-6.5" />
            <span className="text-white text-sm hidden lg:block">
              Minha conta
            </span>
          </div>
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
  );
}
