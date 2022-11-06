import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import {getUserLanguage, getUserCurrency} from '../../services/Language';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss'

const Header:FC = () => {
    const lang = getUserLanguage();
    const baseCurrency=getUserCurrency(lang);

    return (
        <nav className='navbar navbar-light'>
            <button className='btn'>
                <Link
                    className='link'
                    to='/'>
                    Конвертер валют
                </Link>
            </button>
            <div className='container'>
                <button className='btn'>
                    <Link
                        className='link'
                        to='/currencies'>
                        Курсы валют
                    </Link>
                </button>
                <div className='link'>{baseCurrency}</div>
            </div>
        </nav>
    );
};

export default Header;
