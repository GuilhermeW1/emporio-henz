import { useState } from "react";

export function PasswordInput({
  label,
  placeholder,
  name,
  value,
  onChange,
  className,
}) {
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const handleChangeVisibility = () => {
    if (passwordVisibility === "password") {
      setPasswordVisibility("text");
      return;
    }

    setPasswordVisibility("password");
    return;
  };
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="block font-bold self-start">{label}</span>
      <div className="border rounded h-11 border-[#939393] w-68 flex items-center justify-between mt-3">
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={passwordVisibility}
          className="pl-3"
          placeholder={placeholder}
        />
        <button type="button" onClick={() => handleChangeVisibility()}>
          <img src="/aboutUs/Ocultar.svg" alt="ocultar" className="pr-3" />
        </button>
      </div>
    </div>
  );
}
