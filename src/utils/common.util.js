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