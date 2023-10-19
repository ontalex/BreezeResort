export let unauth = {
    error: {
        message: 'Unauthorized'
    }
};

/**
 * 
 * @param {Array} errKey Массив названий ошибок
 * @param {Array} errMessage Массив сообщений об ошибке
 */
export let invalid = (errKey, errMessage) => {
    
    let tamplate = {
        message: "Validattion error",
        errors: {}
    }

    errKey.forEach((element, index) => {
        tamplate.errors[element] = errMessage[index] || "Invalid"
    });

    console.log(tamplate);

    return tamplate;

};
export let login401 = {
    message: 'Unauthorized',
    errors: {
        login: "invalid credentials"
    }
};

export let notFound = {
    errors: {
        message: "Not found"
    }
};

export let errorServerDB = {
    message: 'Error width database'
};


