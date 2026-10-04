import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import { AboutUs } from "./screens/AboutUs.jsx";
import { Home } from "./screens/Home.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />

        <Route path="sobre" element={<AboutUs />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
