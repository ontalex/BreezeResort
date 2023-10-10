export let unauth = {
    error: {
        message: 'Unauthorized'
    }
};

export let invalid = (errKey, errMessage) => {
    return {
        message: "Validattion error",
        errors: {
            errKey: errMessage
        }
    }
};

export let noneLoginOrPass = {
    message: 'The given data was invalid.',
    errors: {
        username: ["The username field is required."],
        password: ["The password field is required."]
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