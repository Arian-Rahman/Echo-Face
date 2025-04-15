import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SavePage from "./pages/SavePage";
import SearchPage from "./pages/SearchPage";
import './index.css';

function App() {
  return (
    <Router>
      <div>
        {/* ✅ Navigation bar */}
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <Link to="/">Save Face</Link>
            </li>
            <li>
              <Link to="/search">Search Face</Link>
            </li>
          </ul>
        </nav>

        {/* ✅ Pages */}
        <Routes>
          <Route path="/" element={<SavePage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;