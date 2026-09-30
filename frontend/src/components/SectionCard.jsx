export function SectionCard({ imgPath, name }) {
  return (
    <div className="h-[182px] w-[182px] bg-[#F2F8FD] border border-[#1238544D] rounded-xl">
      <div className="">
        <img src={imgPath} alt={name} />
      </div>
      <div className="bg-[#123854] h-10.5 overflow-hidden rounded-b-xl flex p-3 items-center justify-between">
        <span className="text-sm text-white">{name}</span>
        <img src="/arrow.svg" />
      </div>
    </div>
  );
}
