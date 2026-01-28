# 🚀 Day 01 — JavaScript Algorithms

Bu repo, temel algoritma sorularına ait **yaklaşım + çözüm kodu + edge-case** notlarını içerir.

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

## 1) Dizideki En Büyük Sayıyı Bulma

**Yaklaşım:**  
İlk elemanı `largest` olarak başlatırım.  
Diziyi gezerken daha büyük değer görürsem `largest`ı güncellerim.  
Döngü bittiğinde en büyük sayıyı döndürürüm.

```js
function largestNumber(arr) {
  let largest = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  return largest;
}
```

**Edge-case :**

- `[]` (boş dizi) → `arr[0]` undefined olur, kontrol eklenmeli.
- Negatif sayılar: `[-10, -3, -20]` → `-3`.

---

## 2) Dizideki En Küçük Sayıyı Bulma

**Yaklaşım:**  
İlk elemanı `smallest` olarak başlatırım.  
Dizi boyunca dolaşır, daha küçük değer buldukça güncellerim.
En sonunda en küçük sayıyı döndürürüm.

```js
function smallestNumber(arr) {
  let smallest = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
    }
  }
  return smallest;
}
```

**Edge-case :**

- `[]` → hata riski (guard lazım).
- Tek eleman: `[42]` → `42`.

---

## 3) Dizi Elemanlarının Toplamı

**Yaklaşım:**  
Toplamı `0` başlatırım.
Dizideki her sayıyı `total`a eklerim.
Döngü sonunda toplamı döndürürüm.

```js
function arraySum(arr) {
  let total = 0;
  for (const number of arr) {
    total += number;
  }
  return total;
}
```

**Edge-case :**

- Boş dizi `[]` → `0` döner.
- Sayı olmayan değerler (örn. `"1"`) varsa sonuç beklenmedik olabilir.

---

## 4) String Ters Çevirme

**Yaklaşım:**  
Boş bir string oluştururum.
String’i sondan başa dolaşarak karakterleri eklerim.
Böylece ters çevrilmiş halini elde ederim.

```js
function reverseString(str) {
  let reverseString = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reverseString += str[i];
  }
  return reverseString;
}
```

**Edge-case :**

- Boş string `""` → `""`.
- Emojiler / birleşik unicode karakterlerde sonuç görsel olarak beklenenden farklı olabilir.

---

## 5) Kelime Sayısını Hesaplama

**Yaklaşım:**  
Kelimenin içinde miyim bilgisini `isWord` ile tutarım.
Boşluk görünce kelime bitti kabul ederim.
Boşluk olmayan karakterde `isWord=false` ise yeni kelime başlatır, sayacı artırırım.

```js
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
```

**Edge-case :**

- Birden fazla boşluk / tab / newline `"hi there\nok"` doğru saymalı.
- Sadece boşluklardan oluşan string `" "` → `0`.

---

## 6) Karakter Frekans Haritası

**Yaklaşım:**  
Bir obje içinde karakterlerin sayısını tutarım.
Her karakteri gezerken `mapped[char]` değerini 1 artırırım.
Böylece her harfin kaç kez geçtiğini hızlıca bulurum.

```js
function freqMap(str) {
  const mapped = {};
  for (const char of str) {
    mapped[char] = (mapped[char] || 0) + 1;
  }
  return mapped;
}
```

**Edge-case :**

- Boş string `""` → `{}`.
- Büyük/küçük harfler ayrı sayılır `"Aa"` → `{A:1, a:1}`.

---

## 7) Tekrar Etmeyen İlk Karakter

**Yaklaşım:**  
Önce tüm karakterlerin kaç kez geçtiğini `freq` objesiyle sayarım (1. tur).
Sonra string’i tekrar dolaşır, frekansı `1` olan ilk karakteri bulur ve döndürürüm (2. tur).
Bu yöntem, iç içe döngüye göre daha verimlidir (O(n)).

```js
function nonRepeat(str) {
  const freq = {};
  for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;
  for (const ch of str) if (freq[ch] === 1) return ch;
  return null;
}
```

**Edge-case :**

- Tüm karakterler tekrar ediyorsa: `"aabbcc"` → `null`
- Boş string (`""`) → `null`.

---

## 8) İki Dizinin Kesişimi

**Yaklaşım:**  
Birinci dizideki her eleman için ikinci diziyi tararım.
Eşleşme bulursam kesişim dizisine eklerim.
Bu yöntem tekrarları da ekleyebilir (mevcut kod davranışı).

```js
function intersection(arr1, arr2) {
  const intersection = Array();
  for (const char1 of arr1) {
    for (const char2 of arr2) {
      if (char1 === char2) {
        intersection.push(char1);
      }
    }
  }
  return intersection;
}
```

**Edge-case :**

- Kesişim yok: `[1,2]` & `[3,4]` → `[]`.
- Duplicate varsa tekrar tekrar eklenebilir: `[1,1]` & `[1]` → `[1,1]`.

---

## 9) Doğrusal Arama (Linear Search)

**Yaklaşım:**  
Diziyi lineer şekilde dolaşıp hedefi ararım.
Bulursam `found=true` yapıp döngüyü kırarım.
Sonuç olarak boolean döndürürüm.

```js
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
```

**Edge-case :**

- `[]` → `false`.
- `===` tip kontrolü yapar: `"5"` ile `5` eşleşmez.

---

## 10) Hedef İndeksi Bulma

**Yaklaşım:**  
Diziyi dolaşır, hedefi bulunca index’i kaydedip çıkarım.
Hiç bulamazsam `-1` döndürürüm.
Bulursam hedefin ilk index’ini döndürürüm.

```js
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
```

**Edge-case :**

- Hedef yok: `[1,2,3]` & `10` → `-1`.
- Birden fazla varsa ilkini döndürür.

---

## 11) Anagram Kontrolü

**Yaklaşım:**  
Uzunluklar farklıysa direkt `false` dönerim.
Birinci kelimenin karakterlerini sayıp objede tutarım.
İkinci kelimede aynı karakterleri azaltırım; hepsi 0 ise anagramdır.

```js
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
```

**Edge-case :**

- Case sensitive: `"Listen"` & `"silent"` → `false`.
- `""` & `""` → `true`.

---

## 12) Tekrar Edenleri Kaldırma

**Yaklaşım:**  
Yeni bir dizi (`removed`) oluştururum.
Orijinal diziyi gezerken eleman yoksa eklerim.
Böylece sonuçta her eleman tekil kalır (unique).

```js
function removeDuplicates(arr) {
  const removed = Array();
  for (const char of arr) {
    if (!removed.includes(char)) {
      removed.push(char);
    }
  }
  return removed;
}
```

**Edge-case :**

- `[]` → `[]`.
- Objeler/arrayler referansla kıyaslandığı için içerik aynı olsa bile duplicate saymayabilir.

---

## 🔗 Proje Linki: [Buraya Tıklayın](https://helinucar.github.io/js-bootcamp/algorithms/day01.js)
