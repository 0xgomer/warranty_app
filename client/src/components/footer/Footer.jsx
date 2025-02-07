import React from 'react';
import {NavLink} from "react-router-dom";
import Logo from "../UI/logo/Logo";
import './footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer__head">
                    <Logo type={'dark'}/>
                    <div className="footer__nav">
                        <NavLink to="/privacy">Privacy & Policy</NavLink>
                        <NavLink to="/terms">Terms & Conditions</NavLink>
                    </div>
                </div>
                <span>© 2023 My company</span>
            </div>
        </footer>
    );
};

export default Footer;