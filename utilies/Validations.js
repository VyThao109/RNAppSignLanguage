export const isValidEmail = (stringEmail) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(stringEmail.length > 0)
        return validRegex.test(stringEmail);
    return true;
}

export const isValidPassword = (stringPassword) => {
    return stringPassword.length >= 6 || stringPassword.length == 0
}