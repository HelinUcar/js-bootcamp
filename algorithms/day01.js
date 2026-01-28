//1. The largest number in array
function largestNumber(arr) {
    let largest = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > largest) {
            largest = arr[i];
        }
    }
    return largest;
}

const arr1 = [2, 5, 3, 9, 7, 1, 10];
const arr2 = [10, 324, 45, 90, 9808];
console.log("1. The largest number in array");
console.log(largestNumber(arr1)); //10
console.log(largestNumber(arr2)); //9808

//2. The smallest number in the array
function smallestNumber(arr) {
    let smallest = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < smallest) {
            smallest = arr[i];
        }

    }
    return smallest;

}
console.log("2. The smallest number in the array");
console.log(smallestNumber(arr1)); //1
console.log(smallestNumber(arr2)); //10

//3. Sum all the numbers in the array
function arraySum(arr) {
    let total = 0;
    for (const number of arr) {
        total += number;
    }
    return total;
}

console.log("3. Sum all the numbers in the array");
console.log(arraySum(arr1)); //37
console.log(arraySum(arr2)); //10277

//4. Reverse the given string
function reverseString(str) {
    let reverseString = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reverseString += str[i];
    }
    return reverseString;
}

const str1 = "Hello World!";
const str2 = "javascript";

console.log("4. Reverse the given string");
console.log(reverseString(str1)); //!dlroW olleH
console.log(reverseString(str2)); //tpircsavaj

//5. Count words (separated by spaces)
function countWords(str) {
    let isWord = false;
    let totalWord = 0;
    for (const char of str) {
        if (/\s/.test(char)) {
            isWord = false;
        } else if (!isWord) {
            isWord = true;
            totalWord++;
        }
    }
    return totalWord;
}

console.log("5. Count words (separated by spaces)");
console.log(countWords(str1)); //2
console.log(countWords(str2)); //1

//6. Frequency map
function freqMap(str) {
    const mapped = {};
    for (const char of str) {
        mapped[char] = (mapped[char] || 0) + 1;
    }
    return mapped;
}

const freq1 = "aabccc";
const freq2 = "bacbbccaacd";
console.log("6. Frequency map");
console.log(freqMap(freq1)); //{a: 2, b: 1, c: 3}
console.log(freqMap(freq2)); //{b: 3, a: 3, c: 4, d: 1}

//7. First non-repeating character
function nonRepeat(str) {
    const freq = {};
    for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;
    for (const ch of str) if (freq[ch] === 1) return ch;
    return null;
}


const repeat1 = "racecar";
const repeat2 = "aabbccc";
console.log("7. First non-repeating character");
console.log(nonRepeat(repeat1)); //e


//8. Intersection of two arrays
function intersection(arr1, arr2) {
    const intersection = Array();
    for (const char1 of arr1) {
        //1.option
        for (const char2 of arr2) {
            if (char1 === char2) {
                intersection.push(char1);
            }
        }

        //2.option
        /*if (arr2.includes(char1)) {
            intersection.push(char1);
        }*/
    }
    return intersection;
}
/*2.option for Intersection of two arrays
function intersection(arr1, arr2) {
  const set2 = new Set(arr2);
  const res = [];
  const seen = new Set();
  for (const x of arr1) {
    if (set2.has(x) && !seen.has(x)) {
      seen.add(x);
      res.push(x);
    }
  }
  return res;
}*/


const arr3 = [1, 2, 4, 5, 6, 9];
const arr4 = [1, 3, 5, 7, 8, 9];
console.log("8. Intersection of two arrays");
console.log(intersection(arr3, arr4));

//9. "Does it contain a target?" (linear search)
function linearSearch(arr, x) {
    const n = arr.length;
    let found = false;
    for (let i = 0; i < n; i++) {
        if (x === arr[i]) {
            found = true;
            break;
        }
    }

    return found;
}


const x3 = 5;
const x4 = 3;
const x5 = 10;
console.log("9. 'Does it contain a target?' (linear search)");
console.log(linearSearch(arr3, x3));
console.log(linearSearch(arr4, x4));
console.log(linearSearch(arr4, x5));

//10. "Target index" (if it cannot be found, -1)
function findIndexLinear(arr, x) {
    const n = arr.length;
    let found = false;
    let index = 0;
    for (let i = 0; i < n; i++) {
        if (x === arr[i]) {
            found = true;
            index = i;
            break;
        }
    }

    if (!found) return -1;


    return index;
}


console.log("10. 'Target index' (if it cannot be found, -1))");
console.log(findIndexLinear(arr3, x3));
console.log(findIndexLinear(arr4, x4));
console.log(findIndexLinear(arr4, x5));

//11. Anagram?
function isAnagram(str1, str2) {
    let n1 = str1.length;
    let n2 = str2.length;
    if (n1 !== n2) return false;

    const charCount = {};
    for (const char of str1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    for (const char of str2) {
        charCount[char] = (charCount[char] || 0) - 1;
    }

    for (let key in charCount) {
        if (charCount[key] !== 0) {
            return false;
        }
    }

    return true;


}

const s1 = "listen";
const s2 = "silent";
const s3 = "aab";
const s4 = "abb";
console.log("11. Anagram?");
console.log(isAnagram(s1, s2)); //true
console.log(isAnagram(s3, s4)); //false

//12. “Remove duplicates” (array)
function removeDuplicates(arr) {
    const removed = Array();
    for (const char of arr) {
        if (!removed.includes(char)) {
            removed.push(char);
        }
    }
    /*1.option
    return [...new Set(arr)];
    */
    return removed;
}

const dup1 = [1, 1, 2, 2, 3, 4, 5, 6, 6];
console.log("12. “Remove duplicates” (array)");
console.log(removeDuplicates(dup1));






