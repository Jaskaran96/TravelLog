import styles from "./CityList.module.css";
import styles2 from "./CityItem.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { Link } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContext";
export default function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add a city by clicking on the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityListItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityListItem({ city }) {
  const { deleteCity } = useCities();
  function handleDeleteCity(e) {
    e.preventDefault();
    deleteCity(city.id);
  }
  const { cityData } = useCities();
  const { cityName, emoji, date, id, position } = city;
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles2.cityItem} ${
          cityName === cityData.cityName ? styles2["cityItem--active"] : ""
        }`}
      >
        <span className={styles2.emoji}>{emoji}</span>
        <h3 className={styles2.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}
