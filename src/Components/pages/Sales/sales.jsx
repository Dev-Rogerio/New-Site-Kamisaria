import React, { useState } from 'react';
import '../Sales/sales.css'
import Controler from '../../Controler/controler.jsx';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import WcIcon from '@mui/icons-material/Wc';
import CallIcon from '@mui/icons-material/Call';
import GradeIcon from '@mui/icons-material/Grade';

import Logo from '../../Img/logovetorizadoKZ.png'
import Camisaa from '../../Img/camisaa.JPG';
import Camisab from '../../Img/camisab.JPG';
import Camisac from '../../Img/camisac.JPG';
import Camisad from '../../Img/camisad.JPG';
import Camisae from '../../Img/camisae.JPG';
import Camisaf from '../../Img/camisaf.JPG';
import WhatsApp from '../../Img/whatsapp.png'
import Azul from '../../Img/azul.png';
import Branco from '../../Img/branca.png';
import Rosa from '../../Img/rosa.png';

import Address from '../../Modal/Address/address';
import Order from '../../Modal/Order/order.jsx';

const Sales = ({ price }) => {
    const [mudaPhoto, setMudaPhoto] = useState(Camisaa);
    const [ativar, setAtivar] = useState(false);
    const [valorControler, setValorControler] = useState('');
    const [selectedColorText, setSelectedColorText] = useState('');
    const [selectedSizeText, setSelectedSizeText] = useState('');
    const [reais, centavos] = (123.45).toFixed(2).split('.');
    const [val, cent] = (99.99).toFixed(2).split('.');
    const [showModal, setShowModal] = useState(false);
    const [hideAddress, setHideAddress] = useState(false);
    const [orderData, setOrderData] = useState({});
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    function subMan() {
        const subman = document.querySelector(".man");
        if (subman) {
            window.open("http://localhost:3000/man");
        }
    }
    function contato() {
        const contato = document.querySelector(".liContato a");
        if (contato) {
            window.open("http://localhost:3000/contact");
        }
    }
    const y = (valorControler) => {
        return (
            setValorControler(`${y} aqui é 33`)
        )
    }
    const handleSize = (size) => {
        setSelectedSize(size);
        setSelectedSizeText(size)
    }
    const handleColors = (color) => {
        var collors = document.querySelector('.collors')
        setSelectedColor(color);
        setSelectedColorText(color);
    };
    // const handleContinue = () => {
    //     setShowModal(true);
    //     setHideAddress(true);
    //     setOrderData({
    //         selectedColor: selectedColor,
    //         selectedSize: selectedSize,
    //     });
    // };
    function collors() {
        const cores = {
            selectedColor,
        }
        console.log(cores)
    }
    return (
        <div className="containerSales">
            {!ativar && (
                <nav className={`divNav-Sales ${ativar ? 'hidden' : ''}`}>
                    <div className="divLeft-Sales">
                    </div>
                    <div className="divCenter-Sales">
                        <section>
                            <img className="logokz-sales" src={Logo} alt="" />
                        </section>
                        <article className='article-sales'>
                            <h1>KAMISARIA ZANUTO</h1>
                        </article>
                    </div>
                    <div className="divRight">
                        <div className="divMenu">
                            <ul className="divUl">
                                <li>
                                    <span className="material-symbols-outlined iconMenu">
                                        <HomeIcon />
                                    </span>
                                    <a href="/">Home</a>
                                </li>
                                <div className="traits">
                                    <p>|</p>
                                </div>
                                <li>
                                    <span className="material-symbols-outlined iconMenu">
                                        <LocalLibraryIcon />
                                    </span>
                                    <a href="/">História</a>
                                </li>
                                <div className="traits">
                                    <p>|</p>
                                </div>
                                <li>
                                    <span className="material-symbols-outlined iconMenu">
                                        <ShoppingCartIcon />
                                    </span>
                                    <a href="/">Loja</a>
                                </li>
                                <div className="traits">
                                    <p>|</p>
                                </div>
                                <li>
                                    <span className="material-symbols-outlined iconMenu">
                                        <WcIcon />
                                    </span>
                                    <a href="/">Vestuário</a>
                                    <div className="dropDown-subMenu">
                                        <ul>
                                            <li className="man" onClick={subMan}>
                                                <a href="/">
                                                    <span className="material-symbols-outlined iconMenu">
                                                        man_4
                                                    </span>
                                                    <h1> Camisa Masc.</h1>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/">
                                                    <span className="material-symbols-outlined iconSubMenu">
                                                        woman
                                                    </span>
                                                    <h1>Camisa Fem.</h1>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/">
                                                    <span className="material-symbols-outlined  iconSubMenu">
                                                        straighten
                                                    </span>
                                                    <h1>Medidas</h1>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <div className="traits">
                                    <p>|</p>
                                </div>
                                <li className="liContato">
                                    <span className="material-symbols-outlined iconSubMenu">
                                        <CallIcon />
                                    </span>
                                    <a href="/" onClick={contato}>
                                        Contato
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>)
            }
            {ativar && <Address
                ativo={ativar}
                setAtivo={setAtivar}
                setOrderData={setOrderData}
                selectedSize={selectedSize}
                orderData={orderData}
            />}
            <div className={`allSelect ${ativar ? 'hidden' : ''}`}>
                <div className="mCompras">
                    <p>Minhas compras</p>
                    <span className="material-symbols-outlined iconSubMenu">
                        <ShoppingCartIcon />
                    </span>
                </div>
                <section className="container">
                    <section className="sectionLeft">
                        <div className="scrool" onClick={() => setMudaPhoto(Camisaa)} ><img className='imgSales' src={Camisaa} alt="" /></div>
                        <div className="scrool" onClick={() => setMudaPhoto(Camisab)} ><img className='imgSales' src={Camisab} alt="" /></div>
                        <div className="scrool" onClick={() => setMudaPhoto(Camisac)} ><img className='imgSales' src={Camisac} alt="" /></div>
                        <div className="scrool" onClick={() => setMudaPhoto(Camisad)} ><img className='imgSales' src={Camisad} alt="" /></div>
                        <div className="scrool" onClick={() => setMudaPhoto(Camisae)} ><img className='imgSales' src={Camisae} alt="" /></div>
                        <div className="scrool" onClick={() => setMudaPhoto(Camisaf)} ><img className='imgSales' src={Camisaf} alt="" /></div>
                    </section>
                    <section className="sectonMain">
                        <div className="photo"><img src={mudaPhoto} alt="" /></div>
                    </section>
                    <section className="sectionRight">
                        <div className="description">
                            <p className="marca">Conferir mais produtos da marca KAMISARIA ZANUTO</p>
                            <p className='pDescription'>Camisa Social Masculina Manga Longa Slim Fit Sem Bolso</p>
                            <div className="opinion">
                                <div className="bestseller">mais vendido </div>
                                <div className="star">
                                    <span className="material-symbols-outlined iconSubMenu">
                                        Grade Grade Grade Grade Grade
                                    </span>
                                    <p>5/0.5</p>
                                    <p>10 opniões</p>
                                </div>
                            </div>
                            <p className="valueDesc">RS  {reais} <span>{centavos}</span></p>
                            <div className="valueoff">
                                <p className="valueTot">R$  {price}  <span>{cent}</span></p>
                                <p className='descriptionOff'>15% OFF</p>
                            </div>
                            <div className='descriptionParcelado'>
                                <p>em 3X R$ 49,<span>99</span></p>
                            </div>
                            <div className="pagtos">Ver os meios de pagamento</div>
                            <div className="entrega">
                                <p>Chegará amanhã</p>
                                <p> por <span> R$ 15,00</span></p>
                            </div>
                            <p className='fpagto'>Mais forma de pagamento</p>
                            <p className='envio'>Envio para todo país</p>
                            <p className='formasEnvio'> Saiba os prazos de entrega e as formas de envio</p>
                            <p className='calcularFrete'>Calcular o prazo de entrega</p>
                            <p className="retorno">Devolução grátis</p>
                            <p className='prazo'>Você tem 30 dias a partir da data de recebimento.</p>
                            <p className="saibamais">Saiba mais</p>
                            <div className="descriptionCor">
                                <p className="cores">Cor:</p>
                                <p
                                    className='collors'
                                    value={selectedColor}
                                    onChange={e => setSelectedColor(e.target.value)}
                                >{selectedColorText}</p>
                            </div>
                            <div className="gradecor">
                                <div
                                    className={`divOne colors ${selectedColor === 'Branco' ? 'bold' : ''}`} onClick={() => handleColors('Branco', 'Branco')}><img src={Branco} alt="" /></div>
                                <div className={`divTwo colors ${selectedColor === 'Azul' ? 'bold' : ''}`} onClick={() => handleColors('Azul', 'Azul')}><img src={Azul} alt="" /></div>
                                <div className={`divThree colors ${selectedColor === 'Rosa' ? 'bold' : ''}`} onClick={() => handleColors('Rosa', 'Rosa')}><img src={Rosa} alt="" /></div>
                            </div>
                            <div className="descriptionSize">
                                <p className="estoque">Tamanho:</p>
                                <p
                                    className='sizers'
                                    value={selectedSize}
                                    onChange={e => selectedSize(e.target.value)}
                                >{selectedSizeText}</p>
                            </div>
                            <div className="gradeTamanho">
                                <button className={`size ${selectedSize === '38' ? 'bold' : ''}`}
                                    onClick={() => handleSize('38', '38')}>38</button>
                                <button className={`size ${selectedSize === '40' ? 'bold' : ''}`}
                                    onClick={() => handleSize('40')}>40</button>
                                <button className={`size ${selectedSize === '42' ? 'bold' : ''}`}
                                    onClick={() => handleSize('42')}>42</button>
                                <button className={`size ${selectedSize === '44' ? 'bold' : ''}`}
                                    onClick={() => handleSize('44')}>44</button>
                                <button className={`size ${selectedSize === '46' ? 'bold' : ''}`}
                                    onClick={() => handleSize('46')}>46</button>
                                <button className={`size ${selectedSize === '48' ? 'bold' : ''}`}
                                    onClick={() => handleSize('48')}>48</button>
                            </div>
                            <div className="guia">
                                <span className="material-symbols-outlined  iconSubMenu">
                                    straighten
                                </span>
                                <p className='guiaDescription'>Guia de tamanhos</p>
                            </div>
                            <p className="disponivel">Estoque disponível</p>
                            <p className='labelCep'>Calcular o frete:</p>
                            <div className='InputCep'>
                                <a href="">Informe o cep</a>
                                <input type="text" />
                            </div>
                            <p className="freteGratis">Frete grátis comprando 2 ou mais unidades</p>
                            <button className='buttonComprar' onClick={() => setAtivar(true)}>Comprar</button>
                            <button className='buttonAdicionar'>Adicionar ao carrinho</button>
                            <p className="vendidoPor">Vendido por <span>KAMISARIA ZANUTO</span></p>
                            <div className="garantia">
                                <p>7 dias de garantia de fábrica</p>
                            </div>
                        </div>
                    </section>
                </section >
            </div>
            {showModal && <Order
                setShowModal={setShowModal}
                setHideAddress={setHideAddress}
                orderData={orderData}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                selectedColorText={selectedColorText}
            />}
        </div >
    )
}
export default Sales;
