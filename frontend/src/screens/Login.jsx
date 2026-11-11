import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { PasswordInput } from "../components/PasswordInput";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const response = await fetch(`http://localhost:3001/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex w-screen bg-[#E0E0E0] pt-12 pr-12 pl-12 pb-15">
      <form
        onSubmit={login}
        className=" bg-white mx-auto w-full rounded-2xl flex-col pt-12 flex items-center pb-12 max-w-[935px] lg:px-30 px-2"
      >
        <span className="font-bold text-2xl hidden lg:block mb-8">
          Acesse sua conta
        </span>
        <Input
          name="email"
          value={formData.gmail}
          onChange={handelChange}
          label="E-mail"
          placeholder="Digite seu e-mail"
        />

        <PasswordInput
          className="mt-3 lg:mt-12"
          label="Digite sua senha"
          name="password"
          value={formData.password}
          onChange={handelChange}
          placeholder="Digite sua senha"
        />

        <button
          type="submit"
          className="bg-[#005CA1] h-14 w-63 rounded-md text-white mt-10"
        >
          Entrar
        </button>

        <span className="font-bold mt-10 block">ou acesse com</span>

        <button className="border rounded h-11 border-[#939393] min-w-68 flex mt-3 items-center justify-center gap-1 font-bold w-full">
          <img src="/aboutUs/Google.svg" alt="google" />
          Google
        </button>

        <div className="gap-1 flex mt-3">
          <span className="opacity-50">Nao tem cadastro?</span>
          <Link to="/cadastro" className="font-bold">
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  );
}
