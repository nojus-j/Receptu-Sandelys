import "./App.css";
import "./index.css";
import CheckBox from "./components/CheckBox.jsx";
import Recipe_Name from "./components/Recipe_Name.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Header from "./components/Header.jsx";
import FilterRecipeSlider from "./components/Filter_Recipe_Slider";
import Sidebar from "./components/Sidebar.jsx";
import UnifiedRecipeSearch from "./components/UnifiedRecipeSearch";
import Home from "./routes/Home.jsx";
import { Link, Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

{
  /* <Header />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-4">
         <UnifiedRecipeSearch />
        </div>
      </div> */
}

export default App;
