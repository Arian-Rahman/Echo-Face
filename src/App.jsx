import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SavePage from "./pages/SavePage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SavePage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;