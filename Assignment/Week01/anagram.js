
let text1 = "stops"
let text2 = "potss"

checkAnagram()

function checkAnagram() {
    if (!text1.length == text2.length) {
        console.log("The provided strings are not anagrams")
    } else {
        let sortedText1 = text1.split('').sort().join('');
        let sortedText2 = text2.split('').sort().join('');

        if (sortedText1 === sortedText2) {
            console.log("The provided strings are anagram")
        } else {
            console.log("The provided strings are not anagram")
        }

        console.log(sortedText1)
        console.log(sortedText2)
    }
}