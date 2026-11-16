import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { PasswordInput } from "../components/PasswordInput";
import { api } from "../services/api";

export function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dateBirth: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api("POST", "/users/register", {
        body: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      });
      console.log(res);
      navigation(-1);
    } catch (error) {
      alert("error" + error);
    }

    console.log(formData);
    setLoading(false);
  };

  return (
    <div className="flex w-screen bg-[#E0E0E0] pt-12 pr-12 pl-12 pb-15">
      <form
        onSubmit={handleSubmit}
        className=" bg-white max-w-[935px] mx-auto lg:px-30  w-full rounded-2xl flex-col pt-12 flex items-center pb-12 gap-3"
      >
        <Input
          name="name"
          value={formData.name}
          onChange={handelChange}
          label="Nome"
          placeholder="Digite seu nome"
        />
        <Input
          name="email"
          value={formData.email}
          onChange={handelChange}
          label="E-mail"
          placeholder="Digite seu e-mail"
        />
        <Input
          name="phone"
          value={formData.phone}
          onChange={handelChange}
          label="Número"
          placeholder="Digite o seu numero"
        />
        <Input
          name="dateBirth"
          value={formData.dateBirth}
          onChange={handelChange}
          label="Data de nascimento"
          placeholder="data de nascimento"
          type="date"
        />
        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handelChange}
          label="Digite sua senha"
          placeholder="Digite sua senha"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#005CA1] h-14 w-63 rounded-md text-white mt-10"
        >
          Criar conta
        </button>

        <div className="gap-1 flex mt-3">
          <span className="opacity-50">Ja tem uma conta?</span>
          <Link to="/login" className="font-bold">
            Entre
          </Link>
        </div>
      </form>
    </div>
  );
}
