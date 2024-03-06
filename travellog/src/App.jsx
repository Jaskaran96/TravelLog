import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./assets/Pages/Product";
import Pricing from "./assets/Pages/Pricing";
import Homepage from "./assets/Pages/Homepage";
import PageNotFound from "./assets/Pages/PageNotFound";
import AppLayout from "./assets/Pages/AppLayout";
import Login from "./assets/Pages/Login";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
