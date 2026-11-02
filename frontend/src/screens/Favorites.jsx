import { useNavigate } from "react-router-dom";
import { HighlightCard } from "../components/HighlightCard";

// TODO: colocar o produto dinamico
export function Favorites() {
  const navigation = useNavigate();
  return (
    <div className="pr-4 pl-4">
      <div className="flex items-center pt-5">
        <button type="button" onClick={() => navigation(-1)}>
          <img src="Back.svg" alt="voltar" className="h-6" />
        </button>
        <span className="text-gray-400 pl-4">Pasta de itens salvos</span>
      </div>
      <span className="pt-6 pb-6 block font-bold">Apartamento dos sonhos </span>

      <div className="flex gap-3 mb-12">
        <HighlightCard />
        <HighlightCard />
      </div>
    </div>
  );
}
