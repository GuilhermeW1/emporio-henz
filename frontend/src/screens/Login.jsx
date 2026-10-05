import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { PasswordInput } from "../components/PasswordInput";

export function Login() {
  return (
    <div className="flex w-screen bg-[#E0E0E0] pt-12 pr-12 pl-12 pb-15">
      <div className=" bg-white  w-full rounded-2xl flex-col pt-12 flex items-center pb-12">
        <Input label="E-mail" placeholder="Digite seu e-mail" />

        <PasswordInput
          className="mt-3"
          label="Digite sua senha"
          placeholder="Digite sua senha"
        />

        <button className="bg-[#005CA1] h-14 w-63 rounded-md text-white mt-10">
          Entrar
        </button>

        <span className="font-bold mt-10 block">ou acesse com</span>

        <button className="border rounded h-11 border-[#939393] w-68 flex mt-3 items-center justify-center gap-1 font-bold">
          <img src="/aboutUs/Google.svg" alt="google" />
          Google
        </button>

        <div className="gap-1 flex mt-3">
          <span className="opacity-50">Nao tem cadastro?</span>
          <Link to="/cadastro" className="font-bold">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
