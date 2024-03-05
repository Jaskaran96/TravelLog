import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
export default function HomePage() {
  return (
    <div>
      <NavBar />
      HomePage
      <Link to="app">Go to App</Link>
    </div>
  );
}
