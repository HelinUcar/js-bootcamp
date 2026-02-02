/**
 * 1. VALID PALINDROME: TWO POINTERS ALGORITHM
 * Soru: Verilen bir metnin tersten okunuşuyla aynı olup olmadığını kontrol edin (sadece harf ve rakamları dikkate alarak).
 * Zaman Karmaşıklığı: O(n) - Diziyi bir kez döner.
 * Alan Karmaşıklığı: O(1) - Yeni bir dizi/string oluşturmaz.
 */

const isPalindrome = (str) => {
    // 1. Hazırlık: Sadece harf ve sayıları tut, küçük harfe çevir
    const s = str.toLowerCase().replace(/[^a-z0-9]/g, '');

    // 2. İki işaretçi (pointer) belirle
    let left = 0;             // Başlangıç noktası
    let right = s.length - 1; // Bitiş noktası

    // 3. İşaretçiler merkezde buluşana kadar dön
    while (left < right) {
        // Karşılıklı karakterler aynı mı?
        if (s[left] !== s[right]) {
            return false;
        }

        // İşaretçileri merkeze doğru kaydır
        left++;
        right--;
    }

    return true; // Döngü bittiyse hepsi eşleşmiştir
}

console.log("1. VALID PALINDROME: TWO POINTERS ALGORITHM");
// --- TEST CASES ---
console.log(isPalindrome("madam"));             // true
console.log(isPalindrome("Race Car"));          // true
console.log(isPalindrome("hello"));             // false
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true

/*
=========================================================================
 ALGORİTMA MANTIĞI: NEDEN İKİ İŞARETÇİ?
=========================================================================

1. VERİMLİLİK: 
   - `reverse()` yönteminde string'in kopyasını oluştururuz. 
   - Bu yöntemde ise sadece mevcut string üzerinde iki sayı (index) tutuyoruz.

2. ERKEN ÇIKIŞ (Early Exit):
   - Kelimenin başı ile sonu uyuşmadığı anda fonksiyon durur. 
   - Tüm kelimeyi ters çevirmekle vakit kaybetmez.

3. UYGULAMA ALANI:
   - Bu mantık, sadece palindromlarda değil; dizileri ters çevirme, 
     sıralı dizilerde hedef toplamı bulma (Two Sum) gibi birçok 
     zorlu algoritma sorusunun temelidir.
=========================================================================
-------------------------------------------------------------------------
GÖRSELLEŞTİRME ("radar" kelimesi için)
----------------------------------------------------------
| Adım | Left (L) | Right (R) | Karşılaştırma | Durum    |
|------|----------|-----------|---------------|----------|
| 1    | index 0:r| index 4:r | 'r' === 'r'   | Devam    |
| 2    | index 1:a| index 3:a | 'a' === 'a'   | Devam    |
| 3    | index 2:d| index 2:d | L < R değil   | DUR / TRUE|
-----------------------------------------------------------
*/

/**
 * 2. MAX CHARACTER ALGORITHM (En Sık Geçen Karakter)
 * Soru: Bir metin içinde en sık geçen karakteri bulun.
 * Zaman Karmaşıklığı: O(n)
 * Alan Karmaşıklığı: O(k) - k: benzersiz karakter sayısı
 */

const getMaxChar = (str) => {
    const charMap = {}; // Karakterleri saymak için bir harita 
    let maxCount = 0;   // En yüksek frekans değeri
    let maxChar = '';   // En yüksek frekansa sahip karakter

    // 1. ADIM: Karakterleri say ve objeye doldur
    for (let char of str) {
        // Eğer karakter haritada varsa 1 artır, yoksa 1'e eşitle
        charMap[char] = (charMap[char] || 0) + 1;
    }

    // 2. ADIM: Haritayı tara ve en büyüğü bul
    for (let char in charMap) {
        if (charMap[char] > maxCount) {
            maxCount = charMap[char];
            maxChar = char;
        }
    }
    return maxChar;
};

console.log("2. MAX CHARACTER ALGORITHM (En Sık Geçen Karakter)");
// --- TEST CASES ---
console.log(getMaxChar("javascript")); // "a" (2 kez geçiyor)
console.log(getMaxChar("apple 123111")); // "1" (4 kez geçiyor)
console.log(getMaxChar("abbcccddddeeeee")); // "e" (5 kez geçiyor)

/*
=========================================================================
 ALGORİTMA ADIMLARI VE MANTIĞI
=========================================================================

1. CHARACTER MAP (Frekans Tablosu):
   - "hello" kelimesi için haritamız şuna dönüşür:
     { h: 1, e: 1, l: 2, o: 1 }
   - Bu yöntemle her karakteri sadece bir kez ziyaret etmiş oluruz.

2. NEDEN İKİ DÖNGÜ?
   - İlk döngü veri setini (string) tarar.
   - İkinci döngü ise oluşan özet tabloyu (object) tarar.
   - Toplam karmaşıklık n + k'dır, bu da büyük veri setlerinde O(n) kabul edilir.

3. OPTİMİZASYON:
   - Eğer hafıza (memory) çok kritikse ve sadece ASCII karakterlerle çalışıyorsak, 
     nesne yerine 256 elemanlı bir dizi (Integer Array) kullanılabilir.
=========================================================================
-------------------------------------------------------------------------
CHAR MAP GÖRÜNÜMÜ ("javascript" örneği için)
---------------------------
| Karakter | Sayı (Count) |
|----------|--------------|
| j        | 1            |
| a        | 2  <-- Max!  |
| v        | 1            |
| s        | 1            |
| c        | 1            |
| r        | 1            |
| i        | 1            |
| p        | 1            |
| t        | 1            |
---------------------------
*/

/**
 * 3. TWO STRINGS COMMON CHARACTER (İki String Ortak Karakter Var mı?)
 * Soru: İki farklı string içinde en az bir ortak karakter olup olmadığını bulun.
 * Zaman Karmaşıklığı: O(n + m) - Her iki string'i birer kez tarar.
 * Alan Karmaşıklığı: O(n) - İlk string'deki benzersiz karakterleri saklar.
 */

const hasCommonChar = (str1, str2) => {
    // 1. ADIM: İlk string'deki karakterleri bir Set içine al.
    // Set kullanımı, arama işlemini (lookup) O(1) hızına indirir.
    const charSet = new Set(str1);

    // 2. ADIM: İkinci string'in karakterlerini tara.
    for (let char of str2) {
        // Eğer bu karakter ilk string'in kümesinde varsa ortak karakter vardır.
        if (charSet.has(char)) {
            return true;
        }
    }

    // Döngü biterse ortak karakter yok demektir.
    return false;
};

console.log("3. TWO STRINGS COMMON CHARACTER (İki String Ortak Karakter Var mı?)");
// --- TEST CASES ---
console.log(hasCommonChar("hello", "world")); // true ('l' ve 'o' ortak)
console.log(hasCommonChar("abc", "def"));     // false
console.log(hasCommonChar("javascript", "python")); // true ('p', 'y', 't' ortak değil, sadece 't' ortak)
console.log(hasCommonChar("apple", "pie"));   // true ('p', 'e' ortak)

/*
=========================================================================
 NEDEN SET (HASH SET) KULLANIYORUZ?
=========================================================================

1. PERFORMANS (O(n+m)):
   - Eğer iç içe iki döngü (for içinde for) kullansaydık, her karakter için 
     diğer string'i baştan sona tarardık. Bu çok yavaş bir yöntemdir.
   - Set.has() işlemi "hash table" mantığıyla çalıştığı için anında sonuç verir.

2. BELLEK YÖNETİMİ:
   - Set sadece benzersiz (unique) karakterleri tutar. "aaaaa" gibi bir 
     string gelirse Set içinde sadece tek bir 'a' saklanır.

3. ERKEN ÇIKIŞ (Early Exit):
   - Ortak olan İLK karakteri bulduğumuz anda fonksiyon durur (return true). 
     Geri kalan karakterleri kontrol ederek vakit kaybetmez.
=========================================================================
*/

/*
-------------------------------------------------------------------------
ALGORİTMA ADIMLARI ("abc", "cde" örneği için)
-----------------------------------------------------------------------
| İşlem             | Veri Yapısı         | Durum                     |
|-------------------|---------------------|---------------------------|
| Set Oluştur (str1)| Set { 'a', 'b', 'c'}| str1 belleğe alındı.      |
| str2 Tara (char)  | 'c'                 | Set'te var mı? EVET!      |
| Sonuç             | true                | Fonksiyon hemen bitti.    |
-----------------------------------------------------------------------
*/

/**
 * 4. SUBSTRING COUNT (Alt Dizi Sayma)
 * Soru: Bir ana metin içinde belirli bir alt metnin kaç kez geçtiğini sayın.
 * Zaman Karmaşıklığı: O(n)
 * Alan Karmaşıklığı: O(1)
 */

const countSubstring = (str, sub) => {
    // 1. Güvenlik Kontrolü: Eğer alt dizi boşsa sonsuz döngüyü önle
    if (sub.length === 0) return 0;

    let count = 0;
    let pos = 0;

    // 2. ADIM: indexOf() kullanarak bir sonraki eşleşmeyi ara
    // indexOf(searchString, fromIndex) metodu eşleşme bulamazsa -1 döner
    while ((pos = str.indexOf(sub, pos)) !== -1) {
        count++;
        // 3. ADIM: Pozisyonu bulunan alt dizinin uzunluğu kadar ileri taşı
        // Eğer 'üst üste binenleri' saymak isterseniz pos += 1 yapmalısınız.
        pos += sub.length;
    }

    return count;
};

console.log("4. SUBSTRING COUNT (Alt Dizi Sayma)");
// --- TEST CASES ---
console.log(countSubstring("banana", "ana"));    // 1 (ana-na -> 1 tane 'ana' alır, geri kalan 'na')
console.log(countSubstring("aaaaa", "aa"));      // 2 (aa-aa-a -> 2 tane)
console.log(countSubstring("javascript is fun", "a")); // 2
console.log(countSubstring("hello", "world"));   // 0

/*
=========================================================================
 FARKLI YAKLAŞIMLAR VE MANTIK
=========================================================================

1. indexOf() YÖNTEMİ (Yukarıdaki Örnek):
   - En verimli yöntemdir. Bellekte yeni yapılar oluşturmadan string üzerinde 
     sadece bir işaretçi (pointer) kaydırır.

2. split() YÖNTEMİ (Kısa ama riskli):
   - "banana".split("ana").length - 1;
   - Okunabilirliği yüksektir ancak büyük string'lerde gereksiz yere dizi (array) 
     oluşturduğu için bellek harcar.

3. REGEX (Düzenli İfadeler):
   - (str.match(/ana/g) || []).length;
   - Çok güçlüdür ama Regex motorunu ayağa kaldırdığı için basit sayımlar 
     için indexOf'tan daha yavaştır.
=========================================================================
-------------------------------------------------------------------------
ÜST ÜSTE BİNME (OVERLAPPING) FARKI
-------------------------------------------------------------------------
Metin: "aaaaa" | Aranan: "aa"
----------------------------------------------------------
| Yöntem           | Sayım Mantığı               | Sonuç |
|------------------|-----------------------------|-------|
| Non-Overlapping  | [aa] [aa] a                 | 2     |
| Overlapping      | [aa] -> a[aa] -> aa[aa]...  | 4     |
----------------------------------------------------------
*/

/**
 * 5. DUPLICATE CHECK (Set Kullanarak)
 * Soru: Dizide tekrar eden eleman olup olmadığını kontrol edin.
 * Zaman Karmaşıklığı: O(n)
 * Alan Karmaşıklığı: O(n)
 */

const hasDuplicate = (arr) => {
    // 1. YÖNTEM: Erken Çıkış (Early Exit) - En Verimli Yol
    // Bir Set oluşturup elemanları tek tek kontrol ederiz.
    const seen = new Set();

    for (let item of arr) {
        if (seen.has(item)) {
            return true; // Eğer eleman Set'te zaten varsa, duplicate bulduk!
        }
        seen.add(item); // Yoksa Set'e ekle
    }

    return false; // Döngü biterse tekrar eden eleman yoktur.
};

// 2. YÖNTEM: Tek Satırlık Çözüm (Short & Clean)
const hasDuplicateShort = (arr) => {
    // Set sadece benzersiz elemanları tutar.
    // Eğer Set'in boyutu orijinal diziden küçükse, tekrar eden eleman var demektir.
    return new Set(arr).size !== arr.length;
};

console.log("5. DUPLICATE CHECK (Set Kullanarak)");
// --- TEST CASES ---
console.log(hasDuplicate([1, 2, 3, 1]));    // true
console.log(hasDuplicate([1, 2, 3, 4]));    // false
console.log(hasDuplicate(["a", "b", "a"])); // true
console.log(hasDuplicateShort([10, 20, 30])); // false

/**
 * 5. DUPLICATE CHECK (O(1) Space Complexity - Bellek Dostu)
 * Zaman Karmaşıklığı: O(n log n) - Sıralama (sort) işleminden dolayı.
 * Alan Karmaşıklığı: O(1) - Ekstra bir veri yapısı kullanılmaz.
 */

const hasDuplicateInPlace = (arr) => {
    // 1. ADIM: Diziyi sırala.
    // JavaScript'in varsayılan sort() metodu diziyi olduğu yerde değiştirir.
    arr.sort((a,b)=>a-b)

    // 2. ADIM: Sıralı dizide tekrar eden elemanlar yan yana gelir.
    // Tek bir döngüyle her elemanı sağındaki komşusuyla kıyasla.
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            return true; // Komşular aynıysa tekrar vardır.
        }
    }

    return false; // Hiçbir komşu aynı değilse tekrar yoktur.
};

console.log("5. DUPLICATE CHECK (O(1) Space Complexity - Bellek Dostu)");
// --- TEST CASES ---
const numbers = [3, 1, 4, 1, 5];
console.log(hasDuplicateInPlace(numbers)); // true

/*
=========================================================================
 NEDEN VE NE ZAMAN BU YÖNTEM?
=========================================================================

1. TIME-SPACE TRADEOFF (Zaman-Alan Takası):
   - Set yönteminde HIZ kazanmak için BELLEK harcadık (O(n) Zaman, O(n) Alan).
   - Bu yöntemde BELLEK tasarrufu için HIZDAN feda ettik (O(n log n) Zaman, O(1) Alan).

2. KRİTİK NOT:
   - arr.sort() orijinal diziyi kalıcı olarak değiştirir. Eğer orijinal veriyi
     bozmaman gerekiyorsa, bu yöntemi kullanmadan önce dizinin bir kopyasını
     almalısın (ancak o zaman alan karmaşıklığı tekrar O(n) olur).

3. MÜLAKAT CEVABI:
   - "Eğer bellek çok kısıtlıysa (embedded sistemler gibi), önce diziyi sıralayıp
      ardından komşu kontrolü yaparak O(1) alan karmaşıklığı ile çözebilirim."
=========================================================================
-------------------------------------------------------------------------
ALGORİTMA ADIMLARI ([3, 1, 2, 1] için)
-------------------------------------------------------------------------
1. Orijinal: [3, 1, 2, 1]
2. Sıralanmış: [1, 1, 2, 3]  <-- Tekrar edenler (1, 1) yan yana geldi!
3. Karşılaştırma:
   - i=0: arr[0] (1) === arr[1] (1) ? EVET -> RETURN TRUE.
-------------------------------------------------------------------------
*/

/**
 * 6. TWO SUM ALGORİTMASI
 * Soru: Toplamları belirli bir target değerine eşit olan iki sayının indekslerini döndürün.
 */

// --- 1. YÖNTEM: OPTİMİZE EDİLMİŞ ÇÖZÜM (Hash Map) ---
// Zaman Karmaşıklığı: O(n) -> Diziyi sadece bir kez tararız.
// Alan Karmaşıklığı: O(n) -> Sayıları saklamak için bir Map kullanırız.

const twoSum = (nums, target) => {
    const map = new Map(); // Değerleri ve indeksleri tutar { değer => indeks }

    for (let i = 0; i < nums.length; i++) {
        const currentNum = nums[i];
        const complement = target - currentNum; // Aradığımız "tamamlayıcı" sayı

        // 1. İhtiyacımız olan sayı daha önce Map'e eklendi mi?
        if (map.has(complement)) {
            // Evet ise: Daha önce gördüğümüz sayının indeksi ve mevcut indeks
            return [map.get(complement), i];
        }

        // 2. Yoksa: Mevcut sayıyı Map'e kaydet (ileride başkasına lazım olabilir)
        map.set(currentNum, i);
    }
};

// --- 2. YÖNTEM: SIRALI DİZİ İÇİN (Two Pointers) ---
// Not: Bu yöntem sadece dizi SIRALIYSA (sorted) O(1) alan karmaşıklığı ile çalışır.
// Zaman Karmaşıklığı: O(n)
// Alan Karmaşıklığı: O(1)

const twoSumSorted = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const sum = nums[left] + nums[right];

        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++; // Toplam çok küçük, soldaki küçük sayıyı büyüt
        } else {
            right--; // Toplam çok büyük, sağdaki büyük sayıyı küçült
        }
    }
    return null;
};

console.log("6. TWO SUM ALGORİTMASI");
// --- TEST CASES ---
console.log(twoSum([2, 7, 11, 15], 9));    // [0, 1]
console.log(twoSum([3, 2, 4], 6));          // [1, 2]
console.log(twoSumSorted([1, 2, 3, 4, 6], 10)); // [3, 4]

/*
=========================================================================
 ALGORİTMA ANALİZİ VE MÜLAKAT NOTLARI
=========================================================================

1. NEDEN MAP KULLANDIK?
   - Brute Force (iç içe döngü) yönteminde her sayı için dizinin geri kalanına 
     bakılır (O(n²)). Map kullanarak "Ben 3'teyim, bana 6 lazım, 6'yı daha önce 
     gördüm mü?" sorusunu O(1) sürede sorabiliriz.

2. COMPLEMENT (TAMAMLAYICI) MANTIĞI:
   - Target = 10, Mevcut Sayı = 3 ise Complement = 7'dir. 
   - Tüm mesele, 7'nin daha önceki adımlarda hafızaya alınıp alınmadığıdır.

3. EDGE CASES (UÇ DURUMLAR):
   - Aynı sayıyı iki kez kullanamayız (Bu yüzden Map kontrolü eklemeden önce 
     sonuç bulamazsak ekleme yapıyoruz).
   - Çözümün olmadığı durumlar için 'null' veya boş dizi dönülmelidir.
=========================================================================
*/

/**
 * 7. REMOVE ELEMENT (In-Place / Yerinde Değiştirme)
 * Soru: Verilen bir değeri diziden yerinde (in-place) silin.
 * Zaman Karmaşıklığı: O(n) - Diziyi bir kez tararız.
 * Alan Karmaşıklığı: O(1) - Ekstra dizi oluşturulmaz, bellek dostudur.
 */

const removeElement = (nums, val) => {
    // 'writePointer' (Yazma İşaretçisi): Geçerli elemanların yazılacağı yer.
    let writePointer = 0;

    // 'readPointer' (Okuma İşaretçisi): Diziyi tarayan döngü değişkeni (i).
    for (let readPointer = 0; readPointer < nums.length; readPointer++) {

        // EĞER mevcut eleman silmek istediğimiz (val) DEĞİLSE:
        if (nums[readPointer] !== val) {

            // Bu "iyi" bir elemandır, onu writePointer'ın gösterdiği yere taşı.
            nums[writePointer] = nums[readPointer];

            // Yazma konumunu bir sonraki boş hücreye kaydır.
            writePointer++;
        }
        // Eğer eleman 'val' ise hiçbir şey yapma (üzerine yazılmak üzere orada bırak).
    }

    // writePointer aynı zamanda dizide kalan geçerli eleman sayısını temsil eder.
    return writePointer;
};

console.log("7. REMOVE ELEMENT (In-Place / Yerinde Değiştirme)");
// --- TEST CASE ---
let myNums = [3, 2, 2, 3, 4];
let target = 3;
let resultCount = removeElement(myNums, target);

console.log("Kalan Sayı:", resultCount); // 3 (2, 2 ve 4 kaldı)
console.log("Modifiye Dizi:", myNums.slice(0, resultCount)); // [2, 2, 4]

/*
=========================================================================
 IN-PLACE MANTIĞI VE STRATEJİSİ
=========================================================================

1. İKİ İŞARETÇİ (TWO POINTERS) TEKNİĞİ:
   - Bu soruda biri okuyan (hızlı), diğeri yazan (yavaş) iki pointer kullandık.
   - Okuyan pointer (i) her şeyi görür, yazan pointer (k) sadece kabul edilenleri kaydeder.

2. BELLEK VERİMLİLİĞİ (O(1) Space):
   - JavaScript'teki .filter() metodu yeni bir dizi oluşturur (O(n) space).
   - In-place yöntemi ise orijinal dizinin adresini (reference) değiştirmez, 
     sadece içindeki verileri kaydırır.

3. MÜLAKAT KRİTİĞİ:
   - Mülakatçı "Dizinin sonundaki elemanlara ne oldu?" diye sorabilir. 
   - Cevap: "Dizinin sonunda eski veriler (çöp değerler) kalabilir, ancak 
     biz döndürdüğümüz yeni uzunluk (k) sayesinde dizinin sadece 
     geçerli kısmını dikkate alıyoruz."
=========================================================================
-------------------------------------------------------------------------
ADIM ADIM İŞLEYİŞ ([3, 2, 3], val=3 için)
--------------------------------------------------------------------------------------------
| Adım | readPointer | nums[read] | İşlem (nums[read] !== 3?) | writePointer | Dizi Durumu |
|------|-------------|------------|---------------------------|--------------|-------------|
| 1    | 0           | 3          | Hayır (Atla)              | 0            | [3, 2, 3]   |
| 2    | 1           | 2          | Evet -> nums[0] = 2       | 1            | [2, 2, 3]   |
| 3    | 2           | 3          | Hayır (Atla)              | 1            | [2, 2, 3]   |
| SON  | -           | -          | RETURN writePointer (1)   | -            | [2...]      |
--------------------------------------------------------------------------------------------
*/

/**
 * 8. MAXIMUM SUBARRAY (Temel / Brute Force Yaklaşımı)
 * Soru: Toplamı en büyük olan bitişik alt diziyi bulun (Brute Force).
 * Zaman Karmaşıklığı: O(n²) - İç içe iki döngü kullanır.
 * Alan Karmaşıklığı: O(1) - Sadece sayısal değişkenler tutar.
 */

const maxSubArrayBasic = (nums) => {
    // 1. Başlangıçta en büyük toplamı dizinin ilk elemanı olarak belirle
    let maxTotal = nums[0];

    // 2. DIŞ DÖNGÜ: Alt dizinin başladığı nokta (i)
    for (let i = 0; i < nums.length; i++) {
        let currentSubtotal = 0;

        // 3. İÇ DÖNGÜ: 'i' noktasından başlayıp sağa doğru uzanan tüm alt diziler (j)
        for (let j = i; j < nums.length; j++) {
            currentSubtotal += nums[j];

            // 4. Eğer mevcut alt dizi toplamı, şimdiye kadarkinden büyükse güncelle
            if (currentSubtotal > maxTotal) {
                maxTotal = currentSubtotal;
            }
        }
    }

    return maxTotal;
};

// --- TEST CASE ---
const numbers2 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log("En Büyük Toplam:", maxSubArrayBasic(numbers2));
// Çıktı: 6 (Alt dizi: [4, -1, 2, 1])

/*
=========================================================================
 ALGORİTMA ANALİZİ VE MANTIK
=========================================================================

1. BRUTE FORCE NEDİR?
   - Tüm olasılıkları tek tek denemektir. Bu örnekte i'den başlayan ve 
     j'ye kadar giden her "pencereyi" hesapladık.

2. NEDEN O(n²)?
   - Dizide 10 eleman varsa, yaklaşık 10x10=100 işlem yapar. Veri büyüdükçe 
     (örneğin 1 milyon eleman) bu yöntem çok yavaş kalır.

3. OPTİMİZASYON İHTİYACI:
   - Bu problemin O(n) hızında (diziyi tek turda dönerek) çözülmesini sağlayan 
     meşhur bir algoritma vardır: **Kadane's Algorithm**.
=========================================================================
-------------------------------------------------------------------------
ADIM ADIM İŞLEYİŞ ([1, -2, 3] örneği için)
--------------------------------------------------------------------------
| i (Başlangıç) | j (Bitiş) | Alt Dizi      | Toplam | maxTotal (Güncel) |
|---------------|-----------|---------------|--------|-------------------|
| 0 (değer 1)   | 0         | [1]           | 1      | 1                 |
| 0             | 1         | [1, -2]       | -1     | 1                 |
| 0             | 2         | [1, -2, 3]    | 2      | 1                 |
| 1 (değer -2)  | 1         | [-2]          | -2     | 1                 |
| 1             | 2         | [-2, 3]       | 1      | 1                 |
| 2 (değer 3)   | 2         | [3]           | 3      | 3                 |
--------------------------------------------------------------------------
*/

/**
 * 9. ROTATE ARRAY (Diziyi Döndürme)
 * Soru: Verilen bir diziyi 'k' adım kadar sağa kaydır.
 */

// --- 1. YÖNTEM: PRATİK YAKLAŞIM (Pop & Unshift) ---
// Zaman Karmaşıklığı: O(k * n) -> unshift her çalıştığında diziyi kaydırdığı için yavaştır.
// Alan Karmaşıklığı: O(1)

const rotateBasic = (nums, k) => {
    k = k % nums.length; // Gereksiz turları engelle

    for (let i = 0; i < k; i++) {
        let lastItem = nums.pop();    // Sonuncuyu al
        nums.unshift(lastItem);       // Başa koy
    }
    return nums;
};

// --- 2. YÖNTEM: PROFESYONEL YAKLAŞIM (3-Step Reverse) ---
// Zaman Karmaşıklığı: O(n) -> Diziyi toplamda 2 kez tam tarar.
// Alan Karmaşıklığı: O(1) -> Ekstra dizi oluşturmaz, "In-place" çalışır.

const rotateInPlace = (nums, k) => {
    k = k % nums.length;

    // Yardımcı "Yerinde Ters Çevirme" Fonksiyonu
    const reverse = (arr, start, end) => {
        while (start < end) {
            // Swap (Yer Değiştirme) - Destructuring kullanarak
            [arr[start], arr[end]] = [arr[end], arr[start]];
            start++;
            end--;
        }
    };

    // 1. ADIM: Tüm diziyi tamamen ters çevir
    // [1, 2, 3, 4, 5] -> [5, 4, 3, 2, 1]
    reverse(nums, 0, nums.length - 1);

    // 2. ADIM: İlk 'k' elemanı kendi içinde ters çevir
    // k=2 ise: [4, 5, 3, 2, 1]
    reverse(nums, 0, k - 1);

    // 3. ADIM: Geri kalan elemanları (k'dan sona) kendi içinde ters çevir
    // [4, 5, 1, 2, 3] -> İŞLEM TAMAM!
    reverse(nums, k, nums.length - 1);

    return nums;
};

console.log("9. ROTATE ARRAY (Diziyi Döndürme)");
// --- TEST CASES ---
console.log("Basit Yöntem:", rotateBasic([1, 2, 3, 4, 5], 2));   // [4, 5, 1, 2, 3]
console.log("Algoritmik Yöntem:", rotateInPlace([1, 2, 3, 4, 5], 3)); // [3, 4, 5, 1, 2]


/*
=========================================================================
 ALGORİTMA MANTIĞI: NEDEN 3 KEZ REVERSE?
=========================================================================

1. MATEMATİKSEL ZEKA: 
   - Bir diziyi tamamen ters çevirdiğinde, aslında sağdaki elemanları 
     baş tarafa getirmiş olursun ama sıraları bozulur (tersten gelirler).
   - Bozulan bu iki parçayı kendi içlerinde tekrar ters çevirince 
     orijinal sıralarına ama yeni konumlarına kavuşurlar.

2. MODÜLO OPERATÖRÜ (k % n):
   - Eğer dizi 5 elemanlıysa ve k=102 ise, aslında dizi 20 tam tur atıp 
     sadece 2 adım kayacaktır. Gereksiz işlemleri bu operatörle eliyoruz.

3. UNYSYS / IN-PLACE:
   - Mülakatlarda yeni bir dizi (Array) oluşturmana izin verilmezse, 
     tek çaren 'swap' (elemanların yerini değiştirme) yaparak bu reverse 
     mantığını kullanmaktır.
=========================================================================
-------------------------------------------------------------------------
GÖRSELLEŞTİRME (nums = [1,2,3,4,5,6,7], k = 3)
-------------------------------------------------------------------------
1. Full Reverse:   [7, 6, 5, 4, 3, 2, 1]
2. Reverse (0..k-1): [5, 6, 7, 4, 3, 2, 1]  (İlk 3 eleman düzeldi)
3. Reverse (k..n-1): [5, 6, 7, 1, 2, 3, 4]  (Geri kalanlar düzeldi)
-------------------------------------------------------------------------
*/


/**
 * 10. ARRAY INTERSECTION (Set Kullanarak)
 * Soru: İki dizide de ortak olan benzersiz elemanları bir dizi olarak döndür.
 */

// --- OPTİMİZE EDİLMİŞ ÇÖZÜM ---
// Zaman Karmaşıklığı: O(n + m) -> Her iki diziyi birer kez tararız.
// Alan Karmaşıklığı: O(n) -> İlk dizinin elemanlarını saklamak için bir Set kullanırız.

const intersection = (nums1, nums2) => {
    // 1. ADIM: İlk diziyi bir Set'e dönüştür.
    // Set, arama (lookup) işlemini O(1) süresine indirir.
    const set1 = new Set(nums1);

    // 2. ADIM: Sonuçları toplamak için ikinci bir Set oluştur (Benzersizliği korumak için).
    const result = new Set();

    // 3. ADIM: İkinci diziyi tara
    for (let num of nums2) {
        // Eğer bu sayı set1 içinde varsa, ortaktır!
        if (set1.has(num)) {
            result.add(num);
        }
    }

    // 4. ADIM: Set'i tekrar diziye (Array) dönüştürerek döndür.
    return Array.from(result);
};

// --- ALTERNATİF: TEK SATIRLIK MODERN YAKLAŞIM ---
const intersectionShort = (nums1, nums2) => {
    const set1 = new Set(nums1);
    // filter ile ortakları bul, Set ile benzersiz yap, spread ile diziye çevir.
    return [...new Set(nums2.filter(num => set1.has(num)))];
};

console.log("10. ARRAY INTERSECTION (Set Kullanarak)");
// --- TEST CASES ---
console.log(intersection([1, 2, 2, 1], [2, 2]));    // [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4])); // [9, 4]
console.log(intersection([1, 2, 3], [4, 5, 6]));    // []


/*
=========================================================================
 ALGORİTMA MANTIĞI VE PERFORMANS ANALİZİ
=========================================================================

1. NEDEN SET KULLANDIK?
   - Eğer iç içe for döngüsü kullansaydık (Brute Force), nums1'deki her eleman 
     için nums2'yi baştan sona arayacaktık. Bu O(n*m) sürerdi.
   - Set.has() metodunun hızı O(1)'dir. Bu sayede işlem inanılmaz hızlanır.

2. BENZERSİZLİK (Uniqueness):
   - Soruda genellikle "ortak elemanlar benzersiz olmalı" denir. 
   - nums1 = [1, 2, 2], nums2 = [2, 2] örneğinde sonuç [2, 2] değil, [2] olmalıdır.
   - Biz bu sorunu hem girdi setini oluştururken hem de 'result'ı Set yaparak çözdük.

3. BELLEK OPTİMİZASYONU:
   - Mülakatta şunu söyleyebilirsin: "Daha az bellek harcamak için, 
     her zaman daha KISA olan diziyi Set'e dönüştürürüm."
=========================================================================
-------------------------------------------------------------------------
ADIM ADIM İŞLEYİŞ (nums1: [1,2,1], nums2: [2,2,3])
-------------------------------------------------------------------------
1. set1 oluştur: {1, 2}
2. nums2'yi tara:
   - 2, set1'de var mı? EVET -> result.add(2)
   - 2, set1'de var mı? EVET -> result.add(2) (Set zaten olduğu için eklemez)
   - 3, set1'de var mı? HAYIR
3. Sonuç: [2]
-------------------------------------------------------------------------
*/

/**
 * 11. NORMALIZE ANAGRAM (Frekans Sayacı)
 * Soru: İki metin, tüm boşluk ve noktalama işaretleri temizlendiğinde 
 * aynı harf sayılarına sahip mi?
 */

// --- OPTİMİZE EDİLMİŞ ÇÖZÜM ---
// Zaman Karmaşıklığı: O(n + m) -> Normalizasyon ve ardından tek tur tarama.
// Alan Karmaşıklığı: O(k) -> k: benzersiz karakter sayısı (max 26-30 karakter).

const isAnagramNormalized = (str1, str2) => {
    // 1. ADIM: Helper (Yardımcı) fonksiyon ile string'leri temizle
    // Küçük harfe çevir ve harf/sayı dışındaki her şeyi (boşluk, virgül vb.) sil.
    const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

    const cleanStr1 = normalize(str1);
    const cleanStr2 = normalize(str2);

    // 2. ADIM: Uzunluk kontrolü (Hızlı çıkış)
    if (cleanStr1.length !== cleanStr2.length) return false;

    // 3. ADIM: Frekans Haritası (Hash Map) oluştur
    const charMap = {};

    // İlk string'i haritaya işle
    for (let char of cleanStr1) {
        charMap[char] = (charMap[char] || 0) + 1;
    }

    // 4. ADIM: İkinci string ile haritayı karşılaştır/azalt
    for (let char of cleanStr2) {
        // Eğer bu harf haritada yoksa veya sayısı 0 ise anagram değildir
        if (!charMap[char]) {
            return false;
        }
        charMap[char]--;
    }

    return true;
};

console.log("11. NORMALIZE ANAGRAM (Frekans Sayacı)");
// --- TEST CASES ---
console.log(isAnagramNormalized("A gentleman", "Elegant man")); // true
console.log(isAnagramNormalized("Debit card", "Bad credit"));   // true
console.log(isAnagramNormalized("Hello!", "Olleh..."));        // true
console.log(isAnagramNormalized("javascript", "java script")); // true


/*
=========================================================================
 ALGORİTMA MANTIĞI: NEDEN BU YAKLAŞIM?
=========================================================================

1. NORMALİZASYON (Regex):
   - /[^a-z0-9]/g ifadesi, "harf ve rakam OLMAYAN her şeyi bul ve sil" der. 
   - Bu sayede "Listen!" ve "Silent" kelimelerini güvenle kıyaslayabiliriz.

2. FREKANS SAYACI (Hash Map) vs SIRALAMA (Sort):
   - Sıralama yöntemi O(n log n) sürerken, bu yöntem O(n) sürer. 
   - Map üzerinden eksiltme yapmak, ikinci bir Map oluşturma maliyetinden kurtarır.

3. KULLANIM ALANI:
   - Şifreleme (Cryptography), metin benzerliği analizleri ve arama motoru 
     optimizasyonlarında bu mantık temel oluşturur.
=========================================================================
-------------------------------------------------------------------------
ADIM ADIM İŞLEYİŞ ("Listen", "Silent" için)
-------------------------------------------------------------------------
1. Normalize: "listen", "silent"
2. charMap (listen'dan sonra): { l:1, i:1, s:1, t:1, e:1, n:1 }
3. silent'ı tara:
   - 's' haritada var mı? Evet. Sayıyı 1 azalt: { s:0, ... }
   - 'i' haritada var mı? Evet. Sayıyı 1 azalt: { i:0, ... }
   - ... (Tüm harfler 0'a inerse anagramdır)
-------------------------------------------------------------------------
*/
 
/**
 * 12. FIRST NON-REPEATING CHARACTER
 * Soru: Bir string içinde tekrar etmeyen (sadece 1 kez geçen) ilk karakteri bul.
 * Bulamazsan null döndür.
 */

// --- OPTİMİZE EDİLMİŞ ÇÖZÜM ---
// Zaman Karmaşıklığı: O(n) -> String'i en fazla iki kez baştan sona tararız (2n).
// Alan Karmaşıklığı: O(k) -> k: benzersiz karakter sayısı (max 26-256 arası).

const firstNonRepeating = (str) => {
    const charMap = {};

    // 1. ADIM: Frekans Haritasını Oluştur
    // Tüm karakterleri say ve objeye kaydet.
    for (let char of str) {
        charMap[char] = (charMap[char] || 0) + 1;
    }

    // 2. ADIM: Tekrar Taraması Yap
    // String üzerinden tekrar geçerek charMap'te değeri 1 olan İLK karakteri bul.
    for (let char of str) {
        if (charMap[char] === 1) {
            return char; // Bulduğumuz ilk benzersiz karakteri anında döndür.
        }
    }

    return null; // Eğer her karakter en az 2 kez geçiyorsa null dön.
};

console.log("12. FIRST NON-REPEATING CHARACTER");
// --- TEST CASES ---
console.log(firstNonRepeating("leetcode"));    // "l"
console.log(firstNonRepeating("loveleetcode")); // "v"
console.log(firstNonRepeating("aabbcc"));      // null


/*
=========================================================================
 ALGORİTMA MANTIĞI VE KRİTİK NOTLAR
=========================================================================

1. NEDEN İKİ DÖNGÜ? (2n vs n²)
   - Eğer iç içe döngü (nested loop) kullansaydık, her karakter için tüm diziyi 
     tekrar tarardık (O(n²)). Bu çok yavaştır.
   - İki ayrı döngü (n + n) toplamda 2n yapar. Büyük O gösteriminde sabitler 
     atılır ve sonuç O(n) olur.

2. NEDEN OBJECT (HASH MAP)?
   - Objeye veri eklemek ve bir verinin değerine bakmak (lookup) O(1) sürededir. 
     Bu sayede frekans kontrolünü anında yaparız.

3. SIRA NEDEN ÖNEMLİ?
   - İkinci döngüde harita (charMap) üzerinde değil, orijinal string ("str") 
     üzerinde dönüyoruz. Bu, karakterlerin "ilk gelme sırasını" korumamızı sağlar.
=========================================================================
*/

/*
-------------------------------------------------------------------------
ADIM ADIM İŞLEYİŞ ("leetcode" için)
-------------------------------------------------------------------------
1. Döngü (Frekanslar): { l:1, e:3, t:1, c:1, o:1, d:1 }
2. Döngü (Kontrol):
   - 'l' harfine bak -> charMap['l'] kaç? 1. 
   - SONUÇ: "l" (Döngü biter)
-------------------------------------------------------------------------
*/

/**
 * 13. FREQUENCY MAP (Frekans Haritası Deseni)
 * Soru: Verilen bir koleksiyondaki (string/array) her elemanın kaç kez geçtiğini bul.
 */

// --- STANDART YAKLAŞIM ---
// Zaman Karmaşıklığı: O(n) -> Veriyi bir kez geçeriz.
// Alan Karmaşıklığı: O(k) -> k: benzersiz eleman sayısı kadar yer tutar.

const getFrequencyMap = (collection) => {
    const map = {};

    for (let item of collection) {
        // MANTIKSAL VEYA (||) KULLANIMI:
        // Eğer map[item] varsa değerini al, yoksa 0 kabul et ve 1 ekle.
        map[item] = (map[item] || 0) + 1;
    }

    return map;
};

// --- MODERN JS YAKLAŞIMI (Map Objesi ile) ---
// Not: Eğer key'ler sadece string değilse (örn: obje veya sayı), Map() daha güvenlidir.
const getFrequencyMapModern = (collection) => {
    const map = new Map();

    for (let item of collection) {
        map.set(item, (map.get(item) || 0) + 1);
    }

    return map;
};

console.log("13. FREQUENCY MAP (Frekans Haritası Deseni)");
// --- TEST CASES ---
console.log(getFrequencyMap("apple")); 
// Çıktı: { a: 1, p: 2, l: 1, e: 1 }

console.log(getFrequencyMap([1, 2, 2, 3, 3, 3])); 
// Çıktı: { "1": 1, "2": 2, "3": 3 }


/*
=========================================================================
 NEDEN BU DESENİ ADIN GİBİ BİLMELİSİN?
=========================================================================

1. İÇ İÇE DÖNGÜ KATİLİDİR:
   - "Dizide bu eleman kaç tane var?" diye her seferinde filter() veya 
     iç içe for kullanmak O(n²) zaman harcar. 
   - Haritayı bir kez kurmak, tüm sorulara O(1) sürede cevap vermeni sağlar.

2. EN ÇOK SORULAN SORULARIN TEMELİDİR:
   - "En çok tekrar eden eleman hangisi?" (Haritadaki max value'yu bul).
   - "Anagram mı?" (İki harita birbirine eşit mi?).
   - "Benzersiz elemanları döndür" (Haritadaki key'leri al).

3. MAP vs OBJECT:
   - Eğer key'lerin sıralaması önemliyse veya key olarak sayı kullanıyorsan 
     `new Map()` kullanmak mülakatta "ileri seviye" olduğun imajını verir.
=========================================================================
-------------------------------------------------------------------------
GÖRSELLEŞTİRME ("apple" için)
-------------------------------------------------------------------------
Adım 1: 'a' gel -> { a: 1 }
Adım 2: 'p' gel -> { a: 1, p: 1 }
Adım 3: 'p' gel -> { a: 1, p: 2 }  <-- Mevcut değer 1 artırıldı
Adım 4: 'l' gel -> { a: 1, p: 2, l: 1 }
Adım 5: 'e' gel -> { a: 1, p: 2, l: 1, e: 1 }
-------------------------------------------------------------------------
*/

/**
 * 14. GROUP ANAGRAMS (Challenge)
 * Soru: Verilen bir dizi içindeki kelimeleri anagram olanlarına göre grupla.
 * Örnek: ["eat", "tea", "tan", "ate", "nat", "bat"] 
 * Sonuç: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
 */

// --- OPTİMİZE EDİLMİŞ ÇÖZÜM (Sorting + Hash Map) ---
// Zaman Karmaşıklığı: O(n * k log k) -> n: kelime sayısı, k: en uzun kelimenin boyutu.
// Alan Karmaşıklığı: O(n * k) -> Tüm kelimeleri Map içinde sakladığımız için.

const groupAnagrams = (strs) => {
    // Kelimeleri gruplamak için bir Map oluşturuyoruz.
    // Key: Sıralanmış kelime (örn: "aet"), Value: Orijinal kelimeler dizisi (örn: ["eat", "tea"])
    const groups = {};

    for (let str of strs) {
        // 1. ADIM: Kelimeyi "Normalize" et (Sırala)
        // "eat" -> ["e", "a", "t"] -> ["a", "e", "t"] -> "aet"
        const sortedKey = str.split('').sort().join('');

        // 2. ADIM: Eğer bu 'key' haritada yoksa, yeni bir dizi başlat
        if (!groups[sortedKey]) {
            groups[sortedKey] = [];
        }

        // 3. ADIM: Orijinal kelimeyi ilgili gruba ekle
        groups[sortedKey].push(str);
    }

    // 4. ADIM: Sadece grupların (dizilerin) olduğu ana diziyi döndür
    return Object.values(groups);
};

console.log("14. GROUP ANAGRAMS (Challenge)");
// --- TEST CASE ---
const words = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(groupAnagrams(words));
// Çıktı: [["eat","tea","ate"], ["tan","nat"], ["bat"]]


/*
=========================================================================
 NEDEN BU STRATEJİ?
=========================================================================

1. KİMLİKLEŞTİRME (Key Generation):
   - Anagram kelimelerin ortak özelliği nedir? Harfleri sıralandığında 
     AYNI sonucu vermeleri. "ate" ve "tea" ikisi de "aet" olur.
   - Bu sıralanmış hali Map'te "çekmece etiketi" (key) olarak kullanıyoruz.

2. OBJECT.VALUES() GÜCÜ:
   - Map içinde veriyi { "aet": ["eat", "tea"], "ant": ["tan"] } gibi 
     biriktirdik. Soru bizden sadece içteki dizileri istediği için 
     Object.values() ile temiz bir çıktı alıyoruz.

3. MÜLAKAT KRİTİĞİ:
   - "Daha hızlı yapabilir misin?" diye sorarlarsa: "Eğer kelimeler 
     çok uzunsa, sorting (k log k) yerine 26 karakterlik bir sayı dizisi 
     (ASCII count) oluşturup onu key olarak kullanabilirim, bu süreyi 
     O(n * k) seviyesine indirir" diyebilirsin.
=========================================================================
-------------------------------------------------------------------------
GÖRSELLEŞTİRME (Processing "eat", "tea", "tan")
-------------------------------------------------------------------------
1. "eat" -> key: "aet" -> Map: { "aet": ["eat"] }
2. "tea" -> key: "aet" -> Map: { "aet": ["eat", "tea"] }
3. "tan" -> key: "ant" -> Map: { "aet": ["eat", "tea"], "ant": ["tan"] }
-------------------------------------------------------------------------
*/

/**
 * 15. MISSING NUMBER (0..n)
 * Soru: 0'dan n'e kadar sayıları içeren bir dizide bir sayı eksiktir. 
 * Onu ek bellek kullanmadan bul.
 */

// --- 1. YÖNTEM: MATEMATİKSEL (Gauss Toplam Formülü) ---
// Zaman Karmaşıklığı: O(n)
// Alan Karmaşıklığı: O(1) - En verimli yol!

const missingNumberSum = (nums) => {
    const n = nums.length;
    
    // 1. ADIM: 0'dan n'e kadar olan sayıların olması gereken toplamını hesapla.
    // Formül: (n * (n + 1)) / 2
    const expectedSum = (n * (n + 1)) / 2;

    // 2. ADIM: Dizideki mevcut sayıların toplamını hesapla.
    const actualSum = nums.reduce((acc, curr) => acc + curr, 0);

    // 3. ADIM: Aradaki fark eksik olan sayıdır.
    return expectedSum - actualSum;
};

// --- 2. YÖNTEM: XOR (Bitwise / İleri Seviye) ---
// Not: Sayılar çok büyükse toplam formülü "Integer Overflow" (sayı aşımı) yapabilir. 
// XOR yöntemi bu riski ortadan kaldırır.
const missingNumberXOR = (nums) => {
    let missing = nums.length;
    for (let i = 0; i < nums.length; i++) {
        // İndeksleri ve değerleri XOR'la. Çiftler birbirini yok eder, geriye eksik kalır.
        missing ^= i ^ nums[i];
    }
    return missing;
};

console.log("15. MISSING NUMBER (0..n)");
// --- TEST CASES ---
console.log(missingNumberSum([3, 0, 1]));       // 2 (n=3, beklenen: 6, mevcut: 4)
console.log(missingNumberSum([0, 1]));          // 2 (n=2, beklenen: 3, mevcut: 1)
console.log(missingNumberSum([9,6,4,2,3,5,7,0,1])); // 8


/*
=========================================================================
 ALGORİTMA ANALİZİ VE MANTIK
=========================================================================

1. GAUSS FORMÜLÜ ($$ \frac{n(n+1)}{2} $$):
   - 0'dan 10'a kadar olan sayıların toplamını tek tek toplamak yerine bu 
     formülle saniyeler içinde bulabiliriz. 
   - Toplamdan mevcut sayıları çıkardığımızda, elenmeyen tek sayı "kayıp" olandır.

2. NEDEN XOR? (Mülakat Bonus Bilgisi):
   - XOR operatörü ($$ \oplus $$) aynı iki sayıyı işleme soktuğunda 0 sonucunu verir ($$ a \oplus a = 0 $$).
   - Eğer tüm indeksleri ve tüm dizi elemanlarını XOR'larsak, elimizde olan 
     her sayı kendi indeks eşiyle "silinecek", eşi olmayan (eksik olan) sayı parlayacaktır.

3. ZAMAN VE ALAN:
   - Her iki yöntem de diziyi bir kez döner ($$ O(n) $$).
   - Yeni bir dizi veya Set oluşturmadığımız için bellek kullanımı tertemizdir ($$ O(1) $$).
=========================================================================
-------------------------------------------------------------------------
ADIM ADIM İŞLEYİŞ (nums = [3, 0, 1])
-------------------------------------------------------------------------
1. n = 3 (Dizi boyutu)
2. Expected Sum = (3 * 4) / 2 = 6
3. Actual Sum = 3 + 0 + 1 = 4
4. Sonuç = 6 - 4 = 2!
-------------------------------------------------------------------------
*/


