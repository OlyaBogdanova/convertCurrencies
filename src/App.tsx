import React from 'react';
import { useRoutes } from 'react-router';
import Header from './components/Header/Header';
import PageConvertCurrency from './components/PageConvertCurrency/PageConvertCurrency';
import PageCurrenciesList from './components/PageCurrenciesList/PageCurrenciesList';
import './App.css';

function App() {
    let pages = useRoutes([
        {
            path: '/',
            element: <PageConvertCurrency />,
        },
        {
            path: 'currencies',
            element: <PageCurrenciesList />,
        },
    ]);

    return (
        <>
            <Header />
            {pages}
        </>
    );
}

export default App;
