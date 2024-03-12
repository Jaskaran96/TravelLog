import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./assets/Pages/Product";
import Pricing from "./assets/Pages/Pricing";
import Homepage from "./assets/Pages/Homepage";
import PageNotFound from "./assets/Pages/PageNotFound";
import AppLayout from "./assets/Pages/AppLayout";
import Login from "./assets/Pages/Login";
import CityList from "./assets/Components/CityList";
import CountryList from "./assets/Components/CountryList";
import Form from "./assets/Components/Form";
import City from "./assets/Components/City";
import ProtectedRoute from "./assets/Pages/ProtectedRoute";
import { CitiesProvider } from "./assets/Contexts/CitiesContext";
import { AuthProvider } from "./assets/Contexts/FakeAuthContext";
import "./index.css";

function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<CityList />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:cityID" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}

export default App;
