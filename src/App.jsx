import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Components/pages/Home/home.jsx";
import Contact from "./Components/pages/contact/contact.jsx";
import ShirtMan from "./Components/pages/dropdown/shirtMan/man.jsx";
import ShirtWoman from "./Components/pages/dropdown/shirtWoman/index.jsx";
import Sewing from "./Components/Modal/Sewing/index.jsx";
import Tailor from "./Components/Modal/Tailor/index.jsx";
import Measure from "./Components/Modal/Measure/index.jsx";
import Tissue from "./Components/Modal/Tissue/index.jsx";
import Cufflinks from "./Components/Modal/Cufflinks/index.jsx";
import Grid from "./Components/Modal/Grid/index.jsx";
import Embroidery from "./Components/Modal/Embroidery/index.jsx";
import Custom from "./Components/Modal/Custom/index.jsx";
import Store from "./Components/Modal/Store/index.jsx";
import CustomShirt from "./Components/pages/CustomShirt/index.jsx";
import Sales from "./Components/pages/Sales/sales.jsx";
import Address from "./Components/Modal/Address/address.jsx";
import Controler from "./Components/Controler/controler.jsx";
import Tabela from "./Components/Modal/Tabela/tabela.jsx";
import Order from "./Components/Modal/Order/order.jsx";
import Return from "./Components/pages/Return/return.jsx";
import Test from "./Components/pages/Test/test.jsx";
import Pedido from "./Components/pages/Pedido/pedido.jsx";
import ModalPagamento from "./Components/Modal/pagamentoCartao/Modal_Pagamento.jsx";
import GuiaTamanhos from "./Components/Modal/GuiaTamanhos/GuiaTamanhos.jsx";
import CarrinhoCompras from "./Components/Modal/CarrinhoCompra/Carrinho_Compra.jsx";
import Nav from "./Components/common/nav/Nav.jsx";
import Footer from "./Components/common/footer/Footer.jsx";
import Cep from "./Components/pages/dropdown/modalCep/ModalCep.jsx";
import BandeiraVisa from "./Components/Modal/CartaoVisa/bandeiraVisa.jsx";

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
                    <Route
                        path="/controler"
                        element={<Controler setPrice={setPrice} />}
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
