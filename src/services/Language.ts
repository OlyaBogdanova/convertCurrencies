const getUserLanguage = (): string => {
    const language = window.navigator.language;

    return language.substring(0, 2);
};

const getUserCurrency = (lang: string): string => {
    if (lang === 'ru') {
        return 'RUB';
    } else {
        return 'USD';
    }
};
export {getUserLanguage, getUserCurrency};
