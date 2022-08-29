export const configUrl = () => {
    // deveelopment
    if (process.env.react_app_baseurl == "http://gateway01.ithred.info/api/") {
        return {
            appUrl: 'http://iam.ithred.info/',
        }
    }
    // uat
    else if (process.env.react_app_baseurl == "http://gateway01.ithred.in/api/") {
        return {
            appUrl: 'http://iam.ithred.in/',
        }
    }
    // devtest
    else if (process.env.react_app_baseurl == "https://gateway01.ithred.liv/api/") {
        return {
            appUrl: 'http://iam.ithred.liv/',
        }
    }
    // production
    else if (process.env.react_app_baseurl == "https://gateway01.ithred.io/api/") {
        return {
            appUrl: 'https://iam.ithred.io/',
        }
    }
    // testing
    else {
        return {
            appUrl: 'http://iam.ithred.net/',
        }
    }
}