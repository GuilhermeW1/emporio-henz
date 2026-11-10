export function SectionCard({ imgPath, name }) {
  return (
    <div className="flex flex-col justify-between h-[182px] w-[182px] lg:w-[190px] lg:h-[190px] bg-[#F2F8FD] border border-[#123854]/30 rounded-xl overflow-hidden">
      {" "}
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <img src={imgPath} alt={name} />
      </div>
      <div className="bg-[#123854] h-10.5 overflow-hidden rounded-b-xl flex p-3 items-center justify-between">
        <span className="text-sm text-white">{name}</span>
        <img src="/arrow.svg" />
      </div>
    </div>
  );
}
