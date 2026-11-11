export function HighlightCard() {
  return (
    <div className="h-[279px] w-46 lg:w-[291px] lg:h-[384px] bg-[#F2F8FD] rounded-xl shadow-2xl shadow-gray-300">
      <div className="h-46 w-46 lg:w-[291px] lg:h-[291px]">
        <img
          src="/destaque.png"
          alt="teste"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="bg-white h-[95px] flex flex-col justify-center pl-8 items-start rounded-b-2xl">
        <span className="block text-sm text-[#1D1D24]">Cristaleira Liara</span>
        <div className="font-bold text-[#005CA1]">
          <span className="text-[20px] ">R$ 1.900</span>
          <span className="text-sm align-super">,00</span>
        </div>
        <span className="block text-sm text-[#005CA1]">Até 10x no cartão</span>
      </div>
    </div>
  );
}
