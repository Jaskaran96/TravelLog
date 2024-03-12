import SideBar from "../Components/SideBar";
import styles from "./AppLayout.module.css";
import Map from "../Components/Map";
import User from "../Components/User";
export default function AppLayout() {
  // const { user, logout } = useAuth();
  // useEffect(() => {
  //   console.log(`The logged in user is ${user}`);
  // }, [user]);
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
}
