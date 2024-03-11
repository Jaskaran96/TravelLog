import styles from "./CountryList.module.css";
import styles2 from "./CountryItem.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";
function getCountries(mapObj) {
  return Object.keys(mapObj).map((key) => [key, mapObj[key]]);
}

export default function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  const countries = getCountries(
    cities.reduce((obj, value) => {
      obj[value.country] = value.emoji;
      return obj;
    }, {})
  );

  if (!countries.length)
    return <Message message="Add a country by clicking on the map" />;
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryListItem country={country} key={country[0]} />
      ))}
    </ul>
  );
}

function CountryListItem({ country }) {
  const [countryName, emoji] = country;
  return (
    <li className={styles2.countryItem}>
      <span>{emoji}</span>
      <h3>{countryName}</h3>
    </li>
  );
}
