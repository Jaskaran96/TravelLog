import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./assets/Pages/Product";
import Price from "./assets/Pages/Price";
import HomePage from "./assets/Pages/HomePage";
import NotFound from "./assets/Pages/NotFound";
import AppLayout from "./assets/Pages/AppLayout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Price />} />
        <Route path="app" element={<AppLayout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
