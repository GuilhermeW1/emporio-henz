export function Footer() {
  return (
    <div className=" bg-[#123854] h-[555px] flex-col justify-center pl-3 pr-3 text-sm">
      <div className="pt-8 flex justify-center">
        <img src="/logo-footer.png" alt="logo" />
      </div>

      <span className="block text-white pt-8 pb-4 font-bold ">Categorias</span>

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
  );
}
