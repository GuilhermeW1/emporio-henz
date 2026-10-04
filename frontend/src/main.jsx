import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import { AboutUs } from "./screens/AboutUs.jsx";
import { Account } from "./screens/Account.jsx";
import { CreateAccount } from "./screens/CreateAccount.jsx";
import { Home } from "./screens/Home.jsx";
import { Login } from "./screens/Login.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="sobre" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="conta" element={<Account />} />
        <Route path="cadastro" element={<CreateAccount />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
