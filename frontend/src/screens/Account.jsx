import { Link, useNavigate } from "react-router-dom";
//TODO: logica de mostrar dados de usuario ou pedir para entrar na conta
export function Account() {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto min-h-screen w-screen">
      <button className="fixed top-10 left-4" onClick={() => navigate(-1)}>
        <img src="/Back.svg" alt="voltar" />
      </button>
      <div className="flex mt-25 ml-12 flex-col">
        <span className="font-bold block">Dados da conta</span>

        <Link
          className=" bg-gray-300 w-30 h-10 flex items-center justify-center rounded border-gray-500 border mt-5"
          to="/login"
        >
          Login
        </Link>

        <div className="w-58">
          <div className="mt-25">
            <div className="flex gap-3">
              <img src="/PerfilBlack.svg" alt="perfil" className="h-7 w-7 " />
              <div>
                <span className="font-bold">Nome</span>
                <span className="opacity-50 block">Nome</span>
              </div>
            </div>

            <div className="flex gap-3 mt-7">
              <img src="/email.svg" alt="email" className="h-7 w-7 " />
              <div>
                <span className="font-bold">@gmail</span>
                <span className="opacity-50 block">
                  E-mail que você recebe as comunicações.
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-7">
              <img src="/whatsapp.svg" alt="whatsapp" className="h-7 w-7 " />
              <div>
                <span className="font-bold">+5551999999999</span>
                <span className="opacity-50 block">
                  Número que você recebe os códicos de verificação e as
                  comunicações.
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-7">
              <img src="/IA.svg" alt="whatsapp" className="h-7 w-7 " />
              <div>
                <span className="font-bold">00/00/0000</span>
                <span className="opacity-50 block">
                  Número que você recebe os códicos de verificação e as
                  comunicações.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
