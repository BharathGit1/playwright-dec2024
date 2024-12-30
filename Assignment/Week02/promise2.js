function fetchDataFromDatabase(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data == true) {
                resolve("Data fetched successfully!")
            } else {
                reject("Data not found!")
            }
        }, 3000)

    })
}


fetchDataFromDatabase(true)
    .then((message) => console.log(message))
    .catch((error) => console.log(error))

fetchDataFromDatabase(false)
    .then((message) => console.log(message))
    .catch((error) => console.log(error))