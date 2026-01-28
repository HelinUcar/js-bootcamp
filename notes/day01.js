//1. toTitleCase(str) => "helin duygu uçar" → "Helin Duygu Uçar"
function toTitleCase(str) {
    const trimmed = str.trim();
    if (!trimmed) return "";
    return trimmed
        .split(/\s+/)
        .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

const example = "helin duygu uçar";
console.log(toTitleCase(example)); //"helin duygu uçar" → "Helin Duygu Uçar"


//2. countVowels(str) => "javascript" → 3
function countVowels(str) {
    let count = 0;
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }

    return count;
}

const word = "javascript";
const word2 = "todayisverybeautiful";
console.log(countVowels(word)); //"javascript" → 3.
console.log(countVowels(word2));//"todayisverybeautiful" →  9.

//3. reverseWords(str) => "Merhaba Helin" → "Helin Merhaba"
function reverseWords(str) {
    const trimmed = str.trim();
    if (!trimmed) return "";
    return splitString = trimmed.split(/\s+/).reverse().join(" ");
}

const reverseWord = "Merhaba Helin";
const reverseWord2 = "Nasılsın Helin";
console.log(reverseWords(reverseWord));// "Merhaba Helin" → "Helin Merhaba"
console.log(reverseWords(reverseWord2));// "Nasılsın Helin" → "Helin Nasılsın"

//4. isPalindrome(str) => "kabak" → true, "hello" → false
function isPalindrome(str) {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
    return true;
}

const palindmore = "kabak";
const palindmore2 = "hello";
console.log(isPalindrome(palindmore)); //"kabak" → true
console.log(isPalindrome(palindmore2)); //"hello" → false
