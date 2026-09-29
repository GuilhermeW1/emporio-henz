import "./App.css";
import Header from "./components/header";
export default function App() {
  return (
    <main>
      <Header />
      <div className="h-94 bg-[#007CD840] flex relative overflow-hidden">
        <div className="absolute z-20 top-11 left-6">
          <h1 className="text-[26px]/6.5">
            Móveis para <br /> <span className="font-bold">transformar</span>{" "}
            <br />o seu lar
          </h1>
        </div>
        <img
          src="/background-blue.png"
          alt="fundo"
          className="absolute bottom-8 right-0 z-0"
        />
        <img
          src="/chair.png"
          alt="cadeira"
          className="absolute right-0.5 -bottom-7"
        />
      </div>

      <div></div>
    </main>
  );
}
