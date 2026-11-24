import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/AuthProvider.jsx";
import App from "./App.jsx";
import { AboutUs } from "./screens/AboutUs.jsx";
import { Account } from "./screens/Account.jsx";
import { CreateAccount } from "./screens/CreateAccount.jsx";
import { Favorites } from "./screens/Favorites.jsx";
import { Home } from "./screens/Home.jsx";
import { Login } from "./screens/Login.jsx";
import { Product } from "./screens/Product.jsx";
import { Saved } from "./screens/Saved.jsx";
import { AdminDashboard } from "./screens/admin/AdminDashboardt.jsx";
import { AdminRoute } from "./screens/admin/AdminRoute.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<AboutUs />} />
          <Route path="login" element={<Login />} />
          <Route path="conta" element={<Account />} />
          <Route path="cadastro" element={<CreateAccount />} />
          <Route path="produto" element={<Product />} />
          <Route path="salvos" element={<Saved />} />
          <Route path="favoritos" element={<Favorites />} />
          {/* Admin stack */}
          <Route path="admin" element={<AdminRoute />}>
            <Route index element={<AdminDashboard />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme="colored"
    />
  </AuthProvider>,
);
