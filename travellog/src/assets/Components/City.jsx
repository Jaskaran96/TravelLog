import { useEffect, useState } from "react";
import styles from "./City.module.css";
import { useParams, useSearchParams } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContext";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function City() {
  const { cityID } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { cityData, isLoading, getCityData } = useCities();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(
    function () {
      getCityData(cityID);
    },
    [cityID]
  );
  if (isLoading) return <Spinner />;

  const { cityName, emoji, date, notes } = cityData;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}
