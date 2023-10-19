export let unauth = {
    error: {
        message: 'Unauthorized'
    }
};

export let invalid = (errKey, errMessage) => {
    return {
        message: "Validattion error",
        errors: {
            [errKey]: errMessage
        }
    }
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


/**
 * @param {Object} [req] Объект зпроса на валидацию
 * @param {Array} [required] Массив названий обязательных полей для проверки (как в запросе)
 * @param {Object} [res] Объект щаблона ответа клиенту
 * @return {Boolean} Правлиьный объект или нет
 * @description Функция валидации обхектов по наличию ключей и значеним (если данные и не пустое ли значение)
 */
export let validation = (req, required, res, callback) => {

    let tmpRes = { ...res }; // временный объект с шаблоном ответа

    required.forEach(element => {

        // Сверем список обязательных полей и полученых
        if (req[element] == null || req[element].toString().trim() == "") {
            tmpRes.errors[element] = [`The ${element} field is required.`]
        }

    });

    // Проверка на наличие ошибок
    if (Object.keys(tmpRes.errors).length > 0) {
        callback(tmpRes);
        return false;
    }

    return true;

}