import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Inicio from "./Components/pages/inicio/index.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
