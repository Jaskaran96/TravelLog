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
import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [cities, setCities] = useState([]);
  function getCountries(mapObj) {
    return Object.keys(mapObj).map((key) => [key, mapObj[key]]);
  }
  const countries = getCountries(
    cities.reduce((obj, value) => {
      obj[value.country] = value.emoji;
      return obj;
    }, {})
  );

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:9000/cities")
      .then((response) => response.json())
      .then((data) => {
        console.log("GOT IT");
        setCities(data);
      })
      .catch((err) => {
        throw new Error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/:cityID" element={<City />} />
          <Route
            path="countries"
            element={
              <CountryList countries={countries} isLoading={isLoading} />
            }
          />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
