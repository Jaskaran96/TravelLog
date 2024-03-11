import { createContext, useReducer, useEffect, useContext } from "react";

const CitiesContext = createContext();

const initialState = { cities: [], isLoading: false, cityData: {} };

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "unloading":
      return { ...state, isLoading: false };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "cities/loadCity":
      return { ...state, cityData: action.payload };
    case "cities/added":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        cityData: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        cityData: {},
      };
    default:
      throw new Error("invalid action type in the reducer!");
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, cityData } = state;

  const getCityData = async function (cityID) {
    dispatch({ type: "loading" });
    fetch(`http://localhost:9000/cities/${cityID}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "cities/loadCity", payload: data });
      })
      .catch((err) => {
        throw new Error(err.message);
      })
      .finally(() => {
        dispatch({ type: "unloading" });
      });
  };

  const addCity = async function (newCity) {
    dispatch({ type: "loading" });
    fetch(`http://localhost:9000/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(newCity);
        dispatch({ type: "cities/added", payload: data });
      })
      .catch((err) => {
        throw new Error(err.message);
      })
      .finally(() => {
        dispatch({ type: "unloading" });
      });
  };

  const deleteCity = async function (cityID) {
    dispatch({ type: "loading" });
    fetch(`http://localhost:9000/cities/${cityID}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "cities/deleted", payload: cityID });
      })
      .catch((err) => {
        throw new Error(err.message);
      })
      .finally(() => {
        dispatch({ type: "unloading" });
      });
  };
  useEffect(() => {
    dispatch({ type: "loading" });
    fetch("http://localhost:9000/cities")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: "cities/loaded", payload: data });
      })
      .catch((err) => {
        throw new Error(err.message);
      })
      .finally(() => {
        dispatch({ type: "unloading" });
      });
  }, []);
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        cityData,
        getCityData,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("useCities must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, CitiesContext, useCities };
