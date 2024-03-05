import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
const info = [
  ["/", "Home"],
  ["/product", "Product"],
  ["/pricing", "Pricing"],
  ["/login", "Login"],
];
export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <Logo />
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
