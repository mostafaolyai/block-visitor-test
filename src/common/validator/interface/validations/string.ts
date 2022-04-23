export class ValidationString {
    isEmail = (value: string): boolean => {
        const createRegExp = (str: TemplateStringsArray) => new RegExp(str.raw[0].replace(/\s/gm, ''), '');
        const regex = createRegExp`
        ^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|
        (\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|
        (([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`;
        return regex.test(String(value).toLowerCase());
    };

    isMobile = (value: string): boolean => {
        if (value.length !== 11 || value.substr(0, 2) !== '09') return false;

        const regex = new RegExp('^[0-9]+$');
        return regex.test(value);
    };

    isNationalCode = (value: string): boolean => {
        if (value.length !== 10) return false;

        const regex = new RegExp('^[0-9]+$');
        if (!regex.test(value)) return false;

        const numbers: string[] = value.split('');
        let check = 0;
        numbers.forEach((number: string, index: number) => {
            if (index >= 9) return;
            check += (10 - index) * Number(number);
        });

        check = check % 11;
        check = check < 2 ? check : 11 - check;

        return check === Number(numbers[9]);
    };

    isBankCard = (value: string): boolean => {
        if (typeof value !== 'string' || value.length !== 16) return false;

        const regex = new RegExp('^[0-9]{16}$');
        if (!regex.test(value)) return false;

        // for more information on validating bank cards, see:
        // http://www.are.ir/article/creditcart/credit-debit-cart.htm
        let check = 0;
        const chars: string[] = value.split('');
        chars.forEach((char: string, index: number) => {
            const charCheck: number = Number(char) * (index % 2 === 0 ? 2 : 1);
            check += charCheck > 9 ? charCheck - 9 : charCheck;
        });

        return check % 10 === 0;
    };

    isDomain = (value: string): boolean => {
        if (typeof value !== 'string') return false;

        const createRegExp = (str: TemplateStringsArray) => new RegExp(str.raw[0].replace(/\s/gm, ''), '');
        const regex = createRegExp`^(([a-zA-Z0-9][a-zA-Z0-9-_]*[a-zA-Z0-9]|[a-zA-Z0-9])\.)*([a-zA-Z0-9][a-zA-Z0-9-_]*[a-zA-Z0-9]|[a-zA-Z0-9]){1}(\.[a-zA-Z]{2,})+$`;
        return regex.test(String(value));
    };

    isUrl = (value: string): boolean => {
        const rUrl =
            // eslint-disable-next-line
            /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

        return rUrl.test(value);
    };

    isSmartsheet = (value: string): boolean => {
        const regex = new RegExp('(https?://)?(www.app)?smartsheet.com/sheets/([A-Za-z0-9_\\-\\.]+)/?');
        return regex.test(value);
    };

    isLinkedin = (value: string): boolean => {
        const regex = new RegExp('(https?://)?(www.)?linkedin.com/in/([A-Za-z0-9_\\-\\.]+)/?');
        return regex.test(value);
    };

    isLinkedinSalesNavigator = (value: string): boolean => {
        const regex = new RegExp('(https?://)?(www.)?linkedin.com/sales/people/([A-Za-z0-9_\\-\\.]+)/?');
        return regex.test(value);
    };

    isJsonDate = (value: string): boolean => {
        const regex = new RegExp(
            '^(19|20){1}[0-9]{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T' + '([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9].[0-9][0-9][0-9]Z$',
        );
        return regex.test(value);
    };

    isJustJsonDate = (value: string): boolean => {
        const regex = new RegExp('^(19|20){1}[0-9]{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])');
        return regex.test(value);
    };
    isStringDate = (value: string): boolean => {
        const regex = new RegExp('^(19|20){1}[0-9]{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])');
        return regex.test(value);
    };
}
