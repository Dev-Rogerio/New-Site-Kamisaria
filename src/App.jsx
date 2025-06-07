import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../src/components/pages/home/home.jsx";
import Contact from "./components/pages/contact/contact.jsx";
import ShirtMan from "./components/pages/dropdown/shirtMan/man.jsx";
import ShirtWoman from "./components/pages/dropdown/shirtWoman/index.jsx";
import Sewing from "./components/Modal/Sewing/index.jsx";
import Tailor from "./components/Modal/Tailor/index.jsx";
import Measure from "./components/Modal/Measure/index.jsx";
import Tissue from "./components/Modal/Tissue/tissue.jsx";
import Cufflinks from "./components/Modal/Cufflinks/index.jsx";
import Grid from "./components/Modal/Grid/index.jsx";
import Embroidery from "./components/Modal/Embroidery/index.jsx";
import Custom from "./components/Modal/Custom/index.jsx";
import Store from "./components/Modal/Store/index.jsx";
import CustomShirt from "./components/pages/CustomShirt/index.jsx";
import Sales from "./components/pages/Sales/sales.jsx";
import Address from "./components/Modal/Address/address.jsx";
import Tabela from "./components/Modal/Tabela/tabela.jsx";
import Order from "./components/Modal/Order/order.jsx";
import Return from "./components/pages/Return/return.jsx";
import Test from "./components/pages/Test/test.jsx";
import Pedido from "./components/pages/Pedido/pedido.jsx";
import ModalPagamento from "./components/Modal/ModalPagamento/modalPagamento.jsx";
import GuiaTamanhos from "./components/Modal/GuiaTamanhos/GuiaTamanhos.jsx";
import CarrinhoCompras from "./components/Modal/CarrinhoCompra/Carrinho_Compra.jsx";
import Nav from "./components/common/Nav/nav.jsx";
import Footer from "./components/common/Footer/footer.jsx";
import Cep from "./components/pages/dropdown/modalCep/Modal_Cep.jsx";
import BandeiraVisa from "./components/Modal/CartaoVisa/bandeiraVisa.jsx";

function App() {
    const [price, setPrice] = useState("499");
    const [color, setColor] = useState(false);

    const handleColorChange = (newColor) => {
        setColor(newColor);
    };
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
                    <Route path="/pedido" element={<Pedido />} />
                    <Route path="/guiatamanhos" element={<GuiaTamanhos />} />
                    <Route path="/cep" element={<Cep />} />
                    <Route
                        path="/carrinhocompras"
                        element={<CarrinhoCompras />}
                    />
                    <Route
                        path="/modalPagamento"
                        element={<ModalPagamento />}
                    />

                    <Route path="/tabela" element={<Tabela />} />
                    <Route path="/order" element={<Order price={price} />} />
                    <Route
                        path="/test"
                        element={<Test onColorChange={handleColorChange} />}
                    />
                    <Route path="/return" element={<Return color={color} />} />
                    <Route path="/nav" element={<Nav />} />
                    <Route path="/footer" element={<Footer />} />
                    <Route path="/bandeiravisa" element={<BandeiraVisa />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;
