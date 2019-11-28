import { CURRENCY } from '../constant/app.constant';

export function IsUserDetailsSet(user = {}, skipEmail = false) {
    if (!user.name || !user.dob) {
        return {
            allStepDone: false,
            step: 1
        }
    }

    if (skipEmail) {
        return {
            allStepDone: true
        }
    }

    if (!user.email) {
        return {
            allStepDone: false,
            step: 2
        }
    }

    if (!user.is_email_verified) {
        return {
            allStepDone: false,
            step: 3
        }
    }

    return {
        allStepDone: true
    }

}

/*
 * find a nested object property inside of an object.
 * @param  {array} path
 * @param  {object} obj
 */
export function AccessNestedObject(obj, path, valueNotFound = undefined) {
    if (!((Array.isArray(path) || ((typeof path == 'string') || (typeof path == 'number'))) && obj && typeof obj == 'object')) {
        return valueNotFound;
    }

    if (typeof path == 'number') {
        path = String(path);
    }

    if (typeof path == 'string') {
        path = path.split('.');
    }

    return path.reduce((xs, x) => (xs && xs[x] != undefined) ? xs[x] : valueNotFound, obj)
}

export function Camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export function ConvertToWord(str) {
    return str.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")
}

export function HasRole(user, role) {
    let hasRole = false;
    AccessNestedObject(user, 'role', []).forEach((thisRole) => {
        if (thisRole.name == role) {
            hasRole = true;
        }
    })

    return hasRole;
}

export function DisplayPrice(price) {
    let isNegative = false;
    if (price < 0) {
        isNegative = true;
        price = Math.abs(price);
    }
    if (price == 0) {
        return `${GLOBAL.CURRENCY} 0`;
    }
    let number = price;
    if (IsUndefined(price)) {
        return price;
    }
    if (!isNaN(number)) {
        number = Number(number).toFixed(2);
        if (parseFloat(number) == Math.ceil(number)) {
            number = parseFloat(number);
        }
    }
    if (typeof number == 'number') {
        number = number.toString();
    }
    let afterPoint = '';

    if (number.indexOf('.') > 0) {
        afterPoint = number.substring(number.indexOf('.'), number.length);
    }
    number = Math.floor(number);
    number = number.toString();
    let lastThree = number.substring(number.length - 3);
    const otherNumbers = number.substring(0, number.length - 3);
    if (otherNumbers != '') {
        lastThree = ',' + lastThree;
    }
    if (otherNumbers == undefined || otherNumbers == null) {
        return '';
    }
    let res = String(otherNumbers).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;
    return (isNegative ? `${CURRENCY} ${'-'}${res}` : `${CURRENCY} ${res}`);
}

/**
 * return boolean if given variable is undefined only
 * @param  {} value
 */
export function IsUndefined(value) {
    return value == null || value === '';
}