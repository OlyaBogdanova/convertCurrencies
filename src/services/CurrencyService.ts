import axios, { AxiosResponse } from 'axios';
import { getUserLanguage, getUserCurrency } from './Language';

export type Currency = {
    currency: string;
    value: number;
    desc: string;
};

type ResponseCurrencies = {
    currencies: Record<string, string>;
};

type ResponseLiveData = {
    quotes: Record<string, number>;
};

type ResponseConvert = {
    result: number;
};

export default class CurrencyService {
    static async getCurrenciesList(): Promise<Currency[]> {
        const {
            data: { currencies },
        } = await axios.get<any, AxiosResponse<ResponseCurrencies>>(
            'https://api.apilayer.com/currency_data/list',
            {
                headers: { apikey: 'JPQp1hE1GZneFRAh1h9iNc7v8AD83sfD' },
            }
        );
        const currenciesCodeList = Object.keys(currencies).join(',');
        const lang = getUserLanguage();
        const sourceCurrency = getUserCurrency(lang);

        const {
            data: { quotes },
        } = await axios.get<any, AxiosResponse<ResponseLiveData>>(
            `https://api.apilayer.com/currency_data/live?source=${sourceCurrency}&currencies=${currenciesCodeList}`,
            {
                headers: { apikey: 'JPQp1hE1GZneFRAh1h9iNc7v8AD83sfD' },
            }
        );
        return Object.entries(quotes).map((elem) => {
            const currency = elem[0].slice(3);
            const value = Math.round((1 / elem[1]) * 100) / 100;
            const desc = currencies[currency];
            return { currency, value, desc };
        });
    }

    static async convertCurrency(
        value: string,
        currencyFrom: string,
        currencyTo: string
    ): Promise<number> {
        const {
            data: { result },
        } = await axios.get<any, AxiosResponse<ResponseConvert>>(
            `https://api.apilayer.com/currency_data/convert?to=${currencyTo}&from=${currencyFrom}&amount=${value}`,
            {
                headers: { apikey: 'MIjNCHBXd5MFpwZR8mZbTuVHEV8sArge' },
                method: 'GET',
            }
        );
        return result;
    }
}
