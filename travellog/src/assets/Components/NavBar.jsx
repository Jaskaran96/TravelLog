import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
console.log(styles.nav);
const info = [
  ["/", "Home"],
  ["/product", "Product"],
  ["/pricing", "Pricing"],
];
export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <ListItem />
      </ul>
    </nav>
  );
}

function ListItem() {
  return info.map((item) => {
    return (
      <li key={item[1]}>
        <NavLink to={item[0]}>{item[1]}</NavLink>
      </li>
    );
  });
}
