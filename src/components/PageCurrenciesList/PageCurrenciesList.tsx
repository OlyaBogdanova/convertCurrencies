import React, { useEffect, useState } from 'react';
import CurrencyService, {Currency} from '../../services/CurrencyService';
import { Table } from 'reactstrap';

const PageCurrenciesList = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
   
    useEffect(() => {
        const init = async () => {
            const result = await CurrencyService.getCurrenciesList();

            setCurrencies(result);
        };
        init();
    }, []);

    const rows = currencies.map((elem) => {
        const { currency, value, desc } = elem;

        return (
            <tr>
                <th scope='row'>{currency}</th>
                <td>{desc}</td>
                <td>{value}</td>
            </tr>
        );
    });

    return (
        <div>
            <Table
                hover
                size='sm'>
                <thead>
                    <tr>
                        <th>Буквенный код</th>
                        <th>Наименование</th>
                        <th>Курс</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </div>
    );
};

export default PageCurrenciesList;
