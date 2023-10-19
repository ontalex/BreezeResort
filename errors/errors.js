/**
 * @description Шаблон ответа "Пользователь не найден"
 */
export let unauth = {
    error: {
        message: 'Unauthorized'
    }
};

/**
 * 
 * @param {Array} errKey Массив названий ошибок
 * @param {Array} errMessage Массив сообщений об ошибке
 * @description Функция создания объекта ответа ошибки валидации по переданныем ключам и сообщениям
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

/**
 * @description Шаблон ответа "Неверные учётные данные"
 */
export let login401 = {
    message: 'Unauthorized',
    errors: {
        login: "invalid credentials"
    }
};

/**
 * @description Шаблон ответа "Данные не найдены"
 */
export let notFound = {
    errors: {
        message: "Not found"
    }
};