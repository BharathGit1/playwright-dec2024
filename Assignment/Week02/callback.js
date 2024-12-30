let browser = "chrome"

function checkBrowserVersion(logVersion) {

    setTimeout((() => {
        logVersion(browser)
    }), 2000)
}

let logBrowserVersion = (browserName) => {
    console.log(`The version of the ${browserName} browser is 131`)
}

checkBrowserVersion(logBrowserVersion)