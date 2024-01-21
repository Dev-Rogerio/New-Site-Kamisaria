import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Components/Pages/Home/index.jsx";
import Contact from "./Components/Pages/Contact/index.jsx";
import ShirtMan from "./Components/Pages/Dropdown/ShirtMan/index.jsx";
import ShirtWoman from "./Components/Pages/Dropdown/ShirtWoman/index.jsx";
import Sewing from "./Components/Modal/Sewing/index.jsx";
import Alfaiataria from "../src/Components/Modal/Alfaiataria/index.jsx";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/man" element={<ShirtMan />} />
                    <Route path="/woman" element={<ShirtWoman />} />
                    <Route path="/shirtman" element={<ShirtMan />} />
                    <Route path="/sewing" element={<Sewing />} />
                    <Route path="/alfaiataria" element={<Alfaiataria />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;
