export function AboutUs() {
  return (
    <div className="w-full mb-12">
      {/* mobile */}
      <div className="bg-[url('/aboutUs/AboutUsBackground.png')] bg-cover w-full h-68 flex justify-center items-center lg:hidden">
        <img
          src="/aboutUs/vertical-logo.png"
          alt="logo"
          className="h-19 w-23"
        />

        <div className="w-px bg-white opacity-50 h-20 mr-6 ml-6"></div>

        <div className="text-white flex-col">
          <span className="block text-sm text-gray-400">Há quase</span>
          <span className="block font-bold text-[42px]">50 ANOS</span>
          <span className="block text-gray-400">CONSTRUINDO HISTÓRIAS</span>
        </div>
      </div>

      {/* desktop */}
      <div className="bg-[url('/aboutUs/about-us-lg-img.png')] bg-cover w-full  lg:flex justify-center items-center  h-[440px] relative hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#123854]/90 to-[#123854] w-full" />
        <div className="z-20 flex w-300">
          <img
            src="/aboutUs/vertical-logo.png"
            alt="logo"
            className="h-19 w-23 z-10"
          />

          <div className="w-px bg-white opacity-50 h-20 mr-6 ml-6"></div>

          <div className="text-white flex-col z-10">
            <span className="block text-sm text-gray-400">Há quase</span>
            <span className="block font-bold text-[42px]">50 ANOS</span>
            <span className="block text-white ">CONSTRUINDO HISTÓRIAS</span>
          </div>
        </div>
      </div>

      <div className="pr-[18px] pl-[18px] mt-10 flex flex-col lg:max-w-300 lg:mx-auto lg:p-0">
        <div className="flex items-center flex-col lg:flex-row-reverse lg:gap-24 ">
          <div>
            <span className="text-[#1D1D24] font-bold text-2xl">
              Empório Henz: Onde a sua história encontra o seu lugar
            </span>

            <span className="mt-4 block text-[16px]">
              Acreditamos que uma casa vira um lar quando é preenchida por
              memórias. Nascida em Cruzeiro do Sul, a{" "}
              <span className="font-bold">Empório Henz</span> é um negócio
              familiar que há quase cinco décadas transforma ambientes e
              constrói relações de confiança que passam de geração em geração.
              <br className="mt-6" />
              Hoje, unimos nossa tradição à praticidade digital. Você escolhe os
              móveis no conforto da sua tela e finaliza a compra na nossa loja
              física, com total segurança e o atendimento acolhedor de sempre.
            </span>
          </div>

          <img
            src="/aboutUs/owners.png"
            alt="Proprietarias"
            className="h-75 self-center mt-6 lg:hidden block"
          />

          <img
            src="/aboutUs/owners-lg.png"
            alt="Proprietarias"
            className="h-[436px] w-[644px]  self-center mt-6 hidden lg:block"
          />
        </div>

        <hr className="border-t border-[#6464644D] mt-12 mb-8" />

        <span className="font-bold text-2xl">Como funciona</span>

        <span className="mt-2">
          Unimos a praticidade do digital à segurança da experiência presencial
          para tornar sua compra simples e confiável.
        </span>

        <div className="mt-6 gap-4 flex flex-col lg:flex-row">
          <div className="flex items-center justify-around p-5 bg-[#CCE5F7] border-2 rounded-2xl border-[#12385480] lg:min-w-[291px] lg:min-h-[205px]  lg:flex-col lg:items-start">
            <img src="/Busca.svg" alt="busca" className="h-8 w-8 mr-4 " />
            <div className="">
              <span className="block mb-0.5 font-bold">
                Explore e inspire-se
              </span>
              <span className="opacity-80">
                Navegue pelo nosso site e conheça diferentes estilos e
                possibilidades para o seu ambiente no conforto da sua casa.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-around p-5 bg-[#CCE5F7] border-2 rounded-2xl border-[#12385480] lg:min-w-[291px] lg:min-h-[205px]  lg:flex-col lg:items-start">
            <img
              src="/aboutUs/Amostras.png"
              alt="amostras"
              className="h-8 w-8 mr-4"
            />
            <div>
              <span className="block mb-0.5 font-bold">
                Loja física e amostras
              </span>
              <span className="opacity-80">
                Visite-nos para conferir tecidos e acabamentos de perto, tirar
                dúvidas e finalizar sua compra com segurança.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-around p-5 bg-[#CCE5F7] border-2 rounded-2xl border-[#12385480] lg:min-w-[291px] lg:min-h-[205px]  lg:flex-col lg:items-start">
            <img
              src="/aboutUs/Moveis.png"
              alt="moveis"
              className="h-8 w-8 mr-4"
            />
            <div>
              <span className="block mb-0.5 font-bold">
                Móveis sob encomenda
              </span>
              <span className="opacity-80">
                Garantia de produtos novos, feitos especialmente para você com
                alta qualidade de materiais e muita atenção aos detalhes.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-around p-5 bg-[#CCE5F7] border-2 rounded-2xl border-[#12385480] lg:min-w-[291px] lg:min-h-[205px]  lg:flex-col lg:items-start">
            <img
              src="/aboutUs/Entrega.png"
              alt="entrega"
              className="h-8 w-8 mr-4"
            />
            <div>
              <span className="block mb-0.5 font-bold">Entrega e montagem</span>
              <span className="opacity-80">
                Entrega e montagem em todo Vale do Taquari. Tudo feito com uma
                equipe experiente, garantindo cuidado em cada etapa.
              </span>
            </div>
          </div>
        </div>

        <hr className="border-t border-[#6464644D] mt-12 mb-11" />

        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div>
            <span className="font-bold text-2xl">Visite nossa loja</span>

            <div className="flex mt-6">
              <img
                src="/aboutUs/LocalPin.png"
                alt="pin"
                className="h-5 w-5 mt-0.5 mr-2"
              />
              <div>
                <span className="block font-bold">Endereço</span>
                <span className="block">
                  Rua General Neto, 317 - Centro, Cruzeiro do Sul - RS,
                  95930-000
                </span>
              </div>
            </div>

            <div className="flex mt-6">
              <img
                src="/aboutUs/Hora.png"
                alt="pin"
                className="h-5 w-5 mt-0.5 mr-2"
              />
              <div>
                <span className="block font-bold">
                  Horário de funcionamento
                </span>
                <span className="block">
                  Segunda à sexta-feira:
                  <br />
                  08:00 - 12:00 | 13:30 - 18:00
                </span>
                <span className="block mt-1">
                  Sábado:
                  <br />
                  08:00 - 12:00
                </span>
              </div>
            </div>

            <div className="flex mt-6">
              <img
                src="/aboutUs/whatsapp.png"
                alt="pin"
                className="h-5 w-5 mt-0.5 mr-2"
              />
              <div>
                <span className="block font-bold">Contato</span>
                <span className="block mb-8">(51) 99898-1063</span>
              </div>
            </div>
          </div>

          <a
            className="mt-8 self-center"
            href="https://maps.app.goo.gl/XSAqhDAUUes6aAqi7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/aboutUs/local.png" alt="localizacao" />
          </a>
        </div>
      </div>
    </div>
  );
}
