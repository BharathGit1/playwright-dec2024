let input = "This is a sample sentence"

let inputArray = input.split(' ')

reverseOddWords()

function reverseOddWords() {
    for (i = 0; i < inputArray.length; i++) {
        if (i % 2 != 0) {
            inputArray[i] = inputArray[i].split('').reverse().join('')
        }
    }
    console.log(inputArray.join(' '))
}
