import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Components/Pages/Home/index.jsx";
import Contact from "./Components/Pages/Contact/index.jsx";
import ShirtMan from "./Components/Pages/Dropdown/ShirtMan/index.jsx";
import ShirtWoman from "./Components/Pages/Dropdown/ShirtWoman/index.jsx";
import Sewing from "./Components/Modal/Sewing/index.jsx";
import Tailor from "./Components/Modal/Tailor/index.jsx";
import Measure from "./Components/Modal/Measure/index.jsx";
import Tissue from "./Components/Modal/Tissue/index.jsx";
import Cufflinks from "./Components/Modal/Cufflinks/index.jsx";
import Grid from "./Components/Modal/Grid/index.jsx";
import Embroidery from "./Components/Modal/Embroidery/index.jsx";
import Custom from "./Components/Modal/Custom/index.jsx";
import Store from "./Components/Modal/Store/index.jsx";
import CustomShirt from "./Components/Pages/CustomShirt/index.jsx";
import Sales from "./Components/Pages/Sales/sales.jsx";
import Address from "./Components/Modal/Address/address.jsx";
import Controler from "./Components/Controler/controler.jsx"
import Tabela from "./Components/Controler/Tabela/tabela.jsx"

function App() {
    const [price, setPrice] = useState('1050');
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
                    <Route path="/tailor" element={<Tailor />} />
                    <Route path="/measure" element={<Measure />} />
                    <Route path="/tissue" element={<Tissue />} />
                    <Route path="/cufflinks" element={<Cufflinks />} />
                    <Route path="/grid" element={<Grid />} />
                    <Route path="/embroidery" element={<Embroidery />} />
                    <Route path="/custom" element={<Custom />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/customshirt" element={<CustomShirt />} />
                    <Route path="/sales" element={<Sales price={price} />} />
                    <Route path="/address" element={<Address />} />
                    <Route path="/controler" element={<Controler setPrice={setPrice} />} />
                    <Route path="/tabela" element={<Tabela />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;
