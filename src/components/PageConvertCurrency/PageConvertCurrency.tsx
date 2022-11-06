import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';
import './PageConvertCurrency.scss';
import Services from '../../services/CurrencyService';

const PageConvertCurrency = () => {
    const [value, setValue] = useState('');
    const [convertResult, setConvertResult] = useState<null | number>(null);

    async function requestConvert(value: string) {
        const elem = value.split(' ');
        const value1 = elem[0];
        const currencyFrom = elem[1];
        const currencyTo = elem[3];
        const res = await Services.convertCurrency(value1, currencyFrom, currencyTo);
        setConvertResult(res);
        setValue('');
    }
    async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            requestConvert(value);
        }
    }

    async function handleClick(e: React.MouseEvent) {
        requestConvert(value);
    }

    return (
        <>
            <div className='converter'>
                <Input
                    className='input'
                    type='text'
                    onKeyDown={handleKeyDown}
                    placeholder={'Например: 15 usd in rub'}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />

                <Button
                    className='input_btn'
                    type='submit'
                    color='primary'
                    onClick={handleClick}>
                    Convert
                </Button>
            </div>
            <div>{convertResult ? convertResult : null}</div>
        </>
    );
};

export default PageConvertCurrency;
