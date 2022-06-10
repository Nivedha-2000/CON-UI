import { MASTER_APP_CODE } from "../constants";

/**
 * @param {string} url
 * @returns {string}
 */
 export function getAppCodeByDefault(url) {
    // try {
    //     let controller = API_CONTROLLERS.find(c => c.name == url.split("/")[0])
    //     if(!controller)debugger//if the controller name couldn't find means we have to add it in constant
    //     return controller.appCode
    // } catch (e) {}
    return MASTER_APP_CODE
}

export const validateInputOnKeyup = event => {
    let maxLength = event.target.getAttribute("maxlength"),
            value = event.target.value,
            alphabets = event.target.getAttribute("alphabets"),
            alphaNumeric = event.target.getAttribute("alphaNumeric"),
            numeric = event.target.getAttribute("numeric"),
            decimal = event.target.getAttribute("decimal")
    if (maxLength && event.target.value.length > maxLength) value = value.slice(0, maxLength)
    if (alphabets) value = value.replace(/[^A-Za-z]+/g, '');
    if (alphaNumeric) value = value.replace(/[^\d.a-zA-Z]/g, '')
    if (numeric) value = value.replace(/[^\d]/g, '')
    if (decimal) value = value.replace(/[^\d.]/g, '')
    return value
}

export const getHostName = () => {
    return location.host
}