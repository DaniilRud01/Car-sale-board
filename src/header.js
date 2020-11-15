import React, {useState} from 'react'
import './style/header.css'
import {Link} from "react-router-dom";
import CreateCars from "./create-cars";


const Header = () => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <div className="header">
            <header>
                <Link to="/" className="header_logo">Logo</Link>
                <nav>
                    <button className="header_btn__new-post" onClick={() => setOpenModal(true)}>Добавить объявление</button>
                </nav>
            </header>
            <CreateCars openModal={openModal} setOpenModal={setOpenModal} />
            </div>
    );
};

export default Header;