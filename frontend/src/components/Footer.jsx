export function Footer() {
  return (
    <footer className=" bg-[#123854] w-full">
      <div className="h-[555px] flex-col justify-center pl-3 pr-3 text-sm lg:hidden">
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

      {/* desktop */}
      <div className="w-full bg-[#123854] text-white py-10 hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-evenly gap-12">
          <div className="shrink-0 pt-1">
            <img src="/logo-footer-lg.png" alt="logo" />
          </div>

          <div className="flex gap-16 items-start">
            {/* Coluna de Categorias */}
            <div>
              <h3 className="font-bold text-base mb-4">Categorias</h3>
              <div className="flex gap-8 text-sm">
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="hover:underline">
                      Quarto
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Sala de estar
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Sala de jantar
                    </a>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="hover:underline">
                      Cozinha
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Escritório
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Banheiro
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-sm max-w-xs">
              <h3 className="font-bold text-base mb-4">Empório Henz</h3>
              <a href="#" className="block mb-3 hover:underline">
                Sobre a loja
              </a>
              <p className="text-gray-200 leading-relaxed mb-4">
                Rua General Neto, 317 - Centro,
                <br />
                Cruzeiro do Sul - RS, 95930-000
              </p>
              <div className="flex gap-3">
                <img
                  src="/whatsapp-icon.svg"
                  alt="whatsapp"
                  className="w-7 h-7"
                />
                <img
                  src="/instagram-icon.svg"
                  alt="instagram"
                  className="w-7 h-7"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
