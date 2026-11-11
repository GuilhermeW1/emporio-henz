export function Input({ label, placeholder, type, name, value, onChange }) {
  return (
    <div className="flex-col flex gap-3 w-full">
      <span className="block font-bold self-start">{label}</span>
      <input
        type={type ?? "text"}
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded h-11 border-[#939393] min-w-68 pl-3"
        placeholder={placeholder}
      />
    </div>
  );
}
