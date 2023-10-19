import { invalid } from "./errors.js";

let regex_client = {
    email: /([A-z]?.\@+[A-z]+.+[A-z])[^0-9]/g,
    fio: /[A-Za-z]/g,
    phone: /8(\d{3})(\d{3})(\d{4})/g,
    birth_date: /(\d{4})-(\d{2})-(\d{2})/g
}

/**
 * 
 * @param {Express.Request} req Объект запроса для валидации
 * @param {Function} callback Функция выполняема в случае не валидности
 */
export let valid_object = (req, callback) => {

    let hasErrors = false;

    let template = {
        message: "Validattion error",
        errors: {}
    }

    for (const [key, value] of Object.entries(req.body)) {
        let isValid = new RegExp(regex_client[key]).test(value);

        if(!isValid) {
            hasErrors = true;
            template.errors[key] = `The ${key} is invalid`;
        }
    }

    if(hasErrors) {
        callback(template);
        return false;
    } else {
        return true;
    }

}

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