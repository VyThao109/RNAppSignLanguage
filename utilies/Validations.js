export const isValidEmail = (stringEmail) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return validRegex.test(stringEmail)
}

export const isValidPassword = (stringPassword) => {
    return stringPassword.length >= 3
}