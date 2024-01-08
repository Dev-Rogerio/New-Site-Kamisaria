import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Init from "./Components/pages/init/index.js";
import Contact from "./Components/pages/contact/index.js";
import ShirtMan from "./Components/pages/dropdown/shirtMan/index.js";
import ShirtWoman from "./Components/pages/dropdown/shirtWoman/index.js";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Init />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/man" element={<ShirtMan />} />
                    <Route path="/woman" element={<ShirtWoman />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;
