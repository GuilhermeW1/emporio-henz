export function RecentViewCard() {
  return (
    <div className="h-[374px] w-70 bg-[#F2F8FD] rounded-xl shadow-2xl shadow-gray-300">
      <div className="h-70 w-70">
        <img src="/roupeiro.png" alt="teste" />
      </div>

      <div className="bg-white h-[95px] flex flex-col justify-center pl-8 items-start rounded-b-2xl">
        <span className="block text-sm text-[#1D1D24]">Cristaleira Liara</span>
        <div className="font-bold text-[#005CA1]">
          <span className="text-2xl ">R$ 1.900</span>
          <span className="text-sm align-super">,00</span>
        </div>
        <span className="block text-sm text-[#005CA1]">Até 10x no cartão</span>
      </div>
    </div>
  );
}
