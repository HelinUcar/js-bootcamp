# 🚀 Day 02 — JavaScript Algorithms (Two Pointers / Hashing / Arrays)

Bu döküman, dizi ve metin manipülasyonu, hash mapping ve matematiksel optimizasyonlar üzerine odaklanan 15 temel ve ileri seviye JavaScript algoritmasını içermektedir.

---

## 📌 Contents

- [Dizideki En Büyük Sayıyı Bulma](#1-dizideki-en-büyük-sayıyı-bulma)
- [Dizideki En Küçük Sayıyı Bulma](#2-dizideki-en-küçük-sayıyı-bulma)
- [Dizi Elemanlarının Toplamı](#3-dizi-elemanlarının-toplamı)
- [String Ters Çevirme](#4-string-ters-çevirme)
- [Kelime Sayısını Hesaplama](#5-kelime-sayısını-hesaplama)
- [Karakter Frekans Haritası](#6-karakter-frekans-haritası)
- [Tekrar Etmeyen İlk Karakter](#7-tekrar-etmeyen-ilk-karakter)
- [İki Dizinin Kesişimi](#8-iki-dizinin-kesişimi)
- [Doğrusal Arama (Linear Search)](#9-doğrusal-arama-linear-search)
- [Hedef İndeksi Bulma](#10-hedef-indeksi-bulma)
- [Anagram Kontrolü](#11-anagram-kontrolü)
- [Tekrar Edenleri Kaldırma](#12-tekrar-edenleri-kaldırma)

---

## 1) Valid Palindrome

**Soru:** Verilen bir metnin tersten okunuşuyla aynı olup olmadığını kontrol edin (sadece harf ve rakamları dikkate alarak).

**Zaman Karmaşıklığı:** O(n) - Diziyi bir kez döner.
**Alan Karmaşıklığı:** O(1) - Yeni bir dizi/string oluşturmaz.

```js
const isPalindrome = (str) => {
  const s = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};
```

**Zaman Karmaşıklığı:** O(n) → Diziyi bir kez döner.
**Alan Karmaşıklığı:** O(1) → Yeni bir dizi/string oluşturmaz.

---

## 2) Max Character

**Soru:** Bir metin içinde en sık geçen karakteri bulun.

```js
const getMaxChar = (str) => {
  const charMap = {};
  let maxCount = 0;
  let maxChar = "";

  for (let char of str) {
    charMap[char] = (charMap[char] || 0) + 1;
  }

  for (let char in charMap) {
    if (charMap[char] > maxCount) {
      maxCount = charMap[char];
      maxChar = char;
    }
  }
  return maxChar;
};
```

**Zaman Karmaşıklığı:** O(n)
**Alan Karmaşıklığı:** O(k) → k: benzersiz karakter sayısı

---

## 3) Common Character Check

**Soru:** İki farklı string içinde en az bir ortak karakter olup olmadığını bulun.

```js
const hasCommonChar = (str1, str2) => {
  const charSet = new Set(str1);
  for (let char of str2) {
    if (charSet.has(char)) return true;
  }
  return false;
};
```

**Zaman Karmaşıklığı:** O(n + m) → Her iki string'i birer kez tarar.
**Alan Karmaşıklığı:** O(n) → İlk string'deki benzersiz karakterleri saklar.

---

## 4) Substring Count

**Soru:** Bir ana metin içinde belirli bir alt metnin kaç kez geçtiğini sayın.

```js
const countSubstring = (str, sub) => {
  if (sub.length === 0) return 0;
  let count = 0,
    pos = 0;
  while ((pos = str.indexOf(sub, pos)) !== -1) {
    count++;
    pos += sub.length;
  }
  return count;
};
```

**Zaman Karmaşıklığı:** O(n)
**Alan Karmaşıklığı:** O(1)

---

## 5) Duplicate Check

**Soru:** Dizide tekrar eden eleman olup olmadığını kontrol edin.

```js
const hasDuplicate = (arr) => {
  const seen = new Set();
  for (let item of arr) {
    if (seen.has(item)) return true;
    seen.add(item);
  }
  return false;
};
```

**Zaman Karmaşıklığı:** O(n)
**Alan Karmaşıklığı:** O(n)

---

## 6) Two Sum

**Soru:** Toplamları belirli bir `target` değerine eşit olan iki sayının indekslerini döndürün.

```js
const twoSum = (nums, target) => {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const complement = target - currentNum;
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(currentNum, i);
  }
};
```

**Zaman Karmaşıklığı:** O(n) → Diziyi sadece bir kez tararız.
**Alan Karmaşıklığı:** O(n) → Sayıları saklamak için bir Map kullanırız.

---

## 7) Remove Element

**Soru:** Verilen bir değeri diziden yerinde (in-place) silin.

```js
const removeElement = (nums, val) => {
  let writePointer = 0;
  for (let readPointer = 0; readPointer < nums.length; readPointer++) {
    if (nums[readPointer] !== val) {
      nums[writePointer] = nums[readPointer];
      writePointer++;
    }
  }
  return writePointer;
};
```

**Zaman Karmaşıklığı:** O(n)
**Alan Karmaşıklığı:** O(1)

---

## 8) Maximum Subarray

**Soru:** Toplamı en büyük olan bitişik alt diziyi bulun (Brute Force).

```js
const maxSubArrayBasic = (nums) => {
  let maxTotal = nums[0];
  for (let i = 0; i < nums.length; i++) {
    let currentSubtotal = 0;
    for (let j = i; j < nums.length; j++) {
      currentSubtotal += nums[j];
      if (currentSubtotal > maxTotal) maxTotal = currentSubtotal;
    }
  }
  return maxTotal;
};
```

**Zaman Karmaşıklığı:** O(n²) → İç içe iki döngü kullanır.
**Alan Karmaşıklığı:** O(1) → Sadece sayısal değişkenler tutar.

---

## 9) Rotate Array

**Soru:** Verilen bir diziyi 'k' adım kadar sağa kaydır.

```js
const rotateInPlace = (nums, k) => {
  k = k % nums.length;
  const reverse = (arr, start, end) => {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  };
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
  return nums;
};
```

**Zaman Karmaşıklığı:** O(n) → Diziyi toplamda 2 kez tam tarar.
**Alan Karmaşıklığı:** O(1) → Ekstra dizi oluşturmaz, "In-place" çalışır.

---

## 10) Array Intersection

**Soru:** İki dizide de ortak olan benzersiz elemanları bir dizi olarak döndür.

```js
const intersection = (nums1, nums2) => {
  const set1 = new Set(nums1);
  const result = new Set();
  for (let num of nums2) {
    if (set1.has(num)) result.add(num);
  }
  return Array.from(result);
};
```

**Zaman Karmaşıklığı:** O(n + m) → Her iki diziyi birer kez tararız.
**Alan Karmaşıklığı:** O(n) → İlk dizinin elemanlarını saklamak için bir Set kullanırız.

---

## 11) Normalize Anagram

**Soru:** İki metin, tüm boşluk ve noktalama işaretleri temizlendiğinde aynı harf sayılarına sahip mi?

```js
const isAnagramNormalized = (str1, str2) => {
  const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const cleanStr1 = normalize(str1),
    cleanStr2 = normalize(str2);
  if (cleanStr1.length !== cleanStr2.length) return false;
  const charMap = {};
  for (let char of cleanStr1) charMap[char] = (charMap[char] || 0) + 1;
  for (let char of cleanStr2) {
    if (!charMap[char]) return false;
    charMap[char]--;
  }
  return true;
};
```

**Zaman Karmaşıklığı:** O(n + m) → Normalizasyon ve ardından tek tur tarama.
**Alan Karmaşıklığı:** O(k) → k: benzersiz karakter sayısı (max 26-30 karakter).

---

## 12) First Non-Repeating Character

**Soru:** Metin içindeki tekrar etmeyen ilk karakteri bulun.

```js
const firstNonRepeating = (str) => {
  const charMap = {};
  for (let char of str) charMap[char] = (charMap[char] || 0) + 1;
  for (let char of str) {
    if (charMap[char] === 1) return char;
  }
  return null;
};
```

**Zaman Karmaşıklığı:** O(n) → String'i en fazla iki kez baştan sona tararız (2n).
**Alan Karmaşıklığı:** O(k) → k: benzersiz karakter sayısı (max 26-256 karakter).

---

## 13) Frequency Map Pattern

**Soru:** Verilen bir koleksiyondaki (string/array) her elemanın kaç kez geçtiğini bulun.

```js
const getFrequencyMap = (collection) => {
    const map = {};
    for (let item of collection) {
        map[item] = (map[item] || 0) + 1;
    }
    return map;
};
```

**Zaman Karmaşıklığı:** O(n) →  Veriyi bir kez geçeriz.
**Alan Karmaşıklığı:** O(k) → k: benzersiz karakter sayısı kadar yer tutar.

---

## 14) Group Anagrams

**Soru:** Verilen bir dizi içindeki kelimeleri anagram olanlarına göre grupla.

```js
const groupAnagrams = (strs) => {
    const groups = {};
    for (let str of strs) {
        const sortedKey = str.split('').sort().join('');
        if (!groups[sortedKey]) groups[sortedKey] = [];
        groups[sortedKey].push(str);
    }
    return Object.values(groups);
};
```

**Zaman Karmaşıklığı:** O(n * k log k) → n: kelime sayısı, k: en uzun kelimenin boyutu.
**Alan Karmaşıklığı:** O(n * k) → Tüm kelimeleri Map içinde sakladığımız için.

---

## 15) Missing Number

**Soru:** 0'dan n'e kadar sayıları içeren bir dizide bir sayı eksiktir. 
```js
const missingNumberSum = (nums) => {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((acc, curr) => acc + curr, 0);
    return expectedSum - actualSum;
};
```

**Zaman Karmaşıklığı:** O(n) 
**Alan Karmaşıklığı:** O(1) → En verimli yol!

---

## 🔗 Proje Linki: [Buraya Tıklayın](https://helinucar.github.io/js-bootcamp/algorithms/day02 .js)
