export let unauth = JSON.stringify({
    error: {
        message: 'Unauthorized'
    }
});

export let invalid = (errKey, errMessage) => {
    return JSON.stringify({
        message: "Validattion error",
        errors: {
            errKey: errMessage
        }
    })
};

export let noneLoginOrPass = JSON.stringify({
    message: 'The given data was invalid.',
    errors: {
        username: ["The username field is required."],
        password: ["The password field is required."]
    }
});

export let login401 = JSON.stringify({
    message: 'Unauthorized',
    errors: {
        login: "invalid credentials"
    }
});

export let notFound = JSON.stringify({
    errors: {
        message: "Not found"
    }
})