/**
 * JAVASCRIPT FONKSİYON KARŞILAŞTIRMASI (Declaration vs. Expression vs. Arrow)
 */

// --- 1. FUNCTION DECLARATION (Fonksiyon Bildirimi) ---
// Hoisting: VAR. Tanımlanmadan önce çağrılabilir.
console.log(sayHello("Helin")); // Çıktı: Hello Helin!

function sayHello(name) {
    return `Hello ${name}!`;
}


// --- 2. FUNCTION EXPRESSION (Fonksiyon İfadesi) ---
// Hoisting: YOK. Bir değişken gibi işlem görür.
// console.log(sayGoodbye("Helin")); // ReferenceError (Referans Hatası) fırlatır!

const sayGoodbye = function (name) {
    return `Goodbye ${name}!`;
};
console.log(sayGoodbye("Helin"));


// --- 3. ARROW FUNCTION (Ok Fonksiyonu) ---
// Hoisting: YOK.
// Implicit Return: Tek satırlık işlemlerde { } veya 'return' kullanmaya gerek yoktur.
const sayCheers = (name) => `Cheers ${name}! 🥂`;

console.log(sayCheers("Helin"));


// --- 'THIS' DAVRANIŞI (En Büyük Fark) ---
const user = {
    name: "Helin",

    // Düzenli Fonksiyon: 'this' nesnenin kendisine (user) odaklanır.
    regularMethod: function () {
        console.log("Düzenli 'this':", this.name);
    },

    // Arrow Fonksiyon: 'this' kapsayıcı (lexical) scope'a odaklanır.
    arrowMethod: () => {
        console.log("Arrow 'this':", this.name);
    }
};

user.regularMethod(); // Çıktı: "Helin"
user.arrowMethod();   // Çıktı: undefined (veya global isim)


/*
=========================================================================
 HANGİSİNİ NE ZAMAN KULLANMALISIN? (EN İYİ PRATİKLER)
=========================================================================

1. ARROW FUNCTIONS KULLANIMI:
   - Dizi metodları ile çalışırken (map, filter, reduce, find).
     Örn: data.map(item => item.id)
   - Callback fonksiyonlarında (setTimeout, addEventListener - eğer 'this' gerekmiyorsa).
   - "Lexical this" yapısını korumak istediğin her yerde ('this'in değişmesini önlemek için).
   - Kısa, tek satırlık yardımcı fonksiyonlarda.

2. FUNCTION DECLARATIONS KULLANIMI:
   - Proje genelinde kullanılan "Global Yardımcı" fonksiyonlarda (Hoisting avantajı için).
   - Fonksiyonu dosyanın en altında tanımlayıp en üstünde çağırmak istediğinde.
   - Daha iyi okunabilirlik için "bu bağımsız/ana bir fonksiyondur" mesajı vermek için.

3. NESNE METODLARI İÇİN:
   - Daima Function Declaration veya Metod Kısayolu kullanın. 
   - Burada ASLA Arrow Function kullanmayın (aksi takdirde 'this' nesneyi değil, global/window nesnesini gösterir).
   
   Örn:
   const user = {
       name: "John",
       greet() { console.log(this.name); } // EN İYİ PRATİK BUDUR
   };

4. FUNCTION EXPRESSIONS KULLANIMI:
   - Bir fonksiyonun sadece belirli bir kod bloğu içinde (scope) geçerli olmasını istediğinde.
   - Bir fonksiyonu değişkene atayıp başka bir fonksiyona argüman olarak gönderirken.
=========================================================================
-------------------------------------------------------------------------
REFERENCE TABLE (Comparison)
------------------------------------------------------------------------------
| Feature             | Declaration      | Expression       | Arrow          |
|---------------------|------------------|------------------|----------------|
| Hoisting            | Yes              | No               | No             |
| 'this' Binding      | Dynamic          | Dynamic          | Lexical (Static)|
| Constructor (new)   | Yes              | Yes              | No             |
| Arguments Object    | Yes              | Yes              | No             |
| Syntax              | Classic          | Assignment       | Concise/Modern |
| Use Case            | Global/General   | Scoped/Private   | Callbacks/Logic|
------------------------------------------------------------------------------
*/

/**
 * JAVASCRIPT SCOPE REHBERİ: Global vs. Function vs. Block
*/

// --- 1. GLOBAL SCOPE (Küresel Kapsam) ---
// Herhangi bir fonksiyonun veya süslü parantezin dışında tanımlanır.
// Kodun tamamından erişilebilir.
const globalVar = "Her yerdeyim!";

function testGlobal() {
    console.log("Fonksiyon içinden:", globalVar); // Çalışır
}
testGlobal();


// --- 2. FUNCTION SCOPE (Fonksiyon Kapsamı / Yerel Kapsam) ---
// Sadece tanımlandığı fonksiyonun içinden erişilebilir.
function sayName() {
    const name = "Gemini";
    console.log(name); // Çalışır
}
// console.log(name); // HATA! (ReferenceError: name tanımlı değil)


// --- 3. BLOCK SCOPE (Blok Kapsamı) ---
// ES6 ile 'let' ve 'const' kullanılarak tanıtıldı. { } içindeki her şey bir "blok"tur.
// NOT: 'var' blok kapsamını tanımaz, ancak 'let' ve 'const' tanır!

if (true) {
    var varInside = "Dışarı sızarım!";      // Blok kapsamını tanımaz (global/fonksiyona taşınır)
    let letInside = "Blokta hapsoldum!";    // Blok kapsamını tanır
    const constInside = "Ben de!";          // Blok kapsamını tanır
}

console.log(varInside);   // "Dışarı sızarım!" (Güvenlik risklerine veya hatalara yol açabilir)
// console.log(letInside); // HATA! (Erişilemez)


/*
=========================================================================
 SCOPE KURALLARI VE EN İYİ PRATİKLER 
=========================================================================

1. GLOBAL SCOPE:
   - İdareli kullanın. Global değişkenler kodun herhangi bir yerinden değiştirilebilir, 
     bu da hatalara (İsim alanı kirliliği) yol açar.

2. FUNCTION SCOPE:
   - Bir fonksiyon içinde oluşturulan değişkenler o fonksiyona özeldir.
   - Uygulamanın geri kalanı tarafından görülmemesi gereken mantıklar için idealdir.

3. BLOCK SCOPE (Modern Standart):
   - Daima 'var' yerine 'let' ve 'const' tercih edin.
   - Bu, değişkenlerin if-ifadeleri veya döngülerden dışarı "sızmasını" önler.

4. SCOPE CHAIN (Kapsam Zinciri):
   - JavaScript bir değişkeni önce mevcut kapsamda arar. Bulamazsa, 
     Global Scope'a ulaşana kadar bir üst seviyeye çıkar.
=========================================================================
-------------------------------------------------------------------------
COMPARISON TABLE
----------------------------------------------------------------------------
| Scope Type | Defined By           | Accessible From            | Keyword |
|------------|----------------------|----------------------------|---------|
| Global     | Outside everything   | Everywhere                 | Any     |
| Function   | Inside function() {} | Inside that function only  | Any     |
| Block      | Inside { } (if/for)  | Inside that block only     |let/const|
----------------------------------------------------------------------------
*/

/**
 * JAVASCRIPT HOISTING: var vs. let vs. const
 */

// --- 1. 'var' İLE HOISTING ---
// 'var' bildirimleri yukarı taşınır ve "undefined" olarak başlatılır.
console.log(nameVar); // Çıktı: undefined (Hata vermez ama değer atanmamıştır)
var nameVar = "Helin";
console.log(nameVar); // Çıktı: "Helin"


// --- 2. 'let' VE 'const' İLE HOISTING ---
// Bunlar da yukarı taşınır (hoisted) ancak BAŞLATILMAZLAR. 
// Kod o satıra gelene kadar "Temporal Dead Zone" (TDZ - Geçici Ölü Bölge) içinde kalırlar.

// console.log(nameLet); // HATA: ReferenceError (Başlatılmadan önce erişilemez)
let nameLet = "Modern JS";


// --- 3. FONKSİYON HOISTING ---
// Fonksiyon Bildirimleri (Declaration) tamamen yukarı taşınır (hem isim hem gövde).
greet(); // Çıktı: "Hello!" (Mükemmel çalışır)

function greet() {
    console.log("Hello!");
}

// Fonksiyon İfadeleri (Expression) ve Arrow fonksiyonlar değişken kurallarını takip eder.
// sayHi(); // HATA: ReferenceError (let/const kullanılıyorsa)
const sayHi = () => console.log("Hi!");


/*
=========================================================================
 TEMEL KAVRAMLAR 
=========================================================================

1. BAŞLATMA (INITIALIZATION):
   - 'var', hoisting sırasında 'undefined' olarak başlatılır.
   - 'let' ve 'const' başlatılmaz. TDZ içinde beklerler.

2. TEMPORAL DEAD ZONE (TDZ):
   - Bloğun başlangıcı ile değişkenin tanımlandığı an arasındaki süre. 
     Değişkene burada erişmeye çalışmak uygulamanın çökmesine neden olur.

3. HOISTING NEDEN OLUŞTURULDU?
   - Fonksiyonların farklı sıralarda tanımlanmış olsalar bile birbirlerini 
     çağırabilmelerine olanak tanır, bu da kod yapısı için yardımcıdır.

4. EN İYİ PRATİK:
   - Değişkenleri daima kapsamlarının en başında manuel olarak tanımlayın.
   - Hataları TDZ aracılığıyla erkenden yakalamak için 'const' ve 'let' kullanın.
=========================================================================
-------------------------------------------------------------------------
HOISTING SUMMARY TABLE
-----------------------------------------------------------------------
| Keyword   | Hoisted? | Initial Value | Result of access before line |
|-----------|----------|---------------|------------------------------|
| var       | Yes      | undefined     | undefined                    |
| let       | Yes      | None          | ReferenceError               |
| const     | Yes      | None          | ReferenceError               |
| function  | Yes      | Full Body     | Successful Execution         |
-----------------------------------------------------------------------
*/


/**
 * Mini Görevler
*/

// --- 1. 'sum(a,b)' (declaration) ---
function sum(a, b) {
    return a + b;
}

console.log("1. 'sum(a,b)' (declaration)");
console.log(sum(3, 5));

// --- 2. 'sumExp' (expression) ---
const sumExp = function (a, b) {
    return a + b;
}

console.log("2. 'sumExp' (expression)");
console.log(sumExp(2, 9));

// --- 3. 'sumArrow' (arrow) ---
const sumArrow = (a, b) => a + b;

console.log("3. 'sumArrow' (arrow)");
console.log(sumArrow(4, 8));

// --- 4. 'makeCounter()' closure: her çağrıda +1 ---
function makeCounter() {
    let count = 0; // "Private" değişken

    // İçteki fonksiyon, dıştaki 'count' değişkenine erişebilir
    return function () {
        count++; // Dış kapsamdaki değişkeni günceller
        return count;
    };
}

// counter1 kendi "count" değişkenini hafızasında tutan bir Closure oluşturur
const counter1 = makeCounter();

console.log("4. 'makeCounter()' closure: her çağrıda +1");
console.log(counter1()); // Çıktı: 1
console.log(counter1()); // Çıktı: 2
console.log(counter1()); // Çıktı: 3

// counter2 yeni bir kapsam (scope) ile başlar, counter1'i etkilemez
const counter2 = makeCounter();
console.log(counter2()); // Çıktı: 1 (Kendi sayacı sıfırdan başlar)

/*
=========================================================================
 CLOSURE MANTIĞI VE EN İYİ PRATİKLER
=========================================================================

1. CLOSURE NEDİR?
   - Bir fonksiyonun, tanımlandığı yerdeki değişkenleri (Lexical Environment) 
     fonksiyon dışarıda çalıştırılsa bile "hatırlaması" olayıdır.

2. NEDEN KULLANILIR?
   - Veri Gizleme (Data Privacy): 'count' değişkenine dışarıdan doğrudan 
     erişilemez (counter1.count yazılamaz). Sadece fonksiyon aracılığıyla değişir.
   - Durum Koruma (State Management): Fonksiyonun her çağrıldığında kaldığı 
     yeri hatırlamasını sağlar.

3. BELLEK YÖNETİMİ:
   - Closure'lar değişkenleri hafızada tutmaya devam eder. Artık ihtiyaç 
     duyulmayan büyük closure'lar bellekte yer kaplamaması için null ile serbest bırakılabilir.

4. GERÇEK DÜNYA ÖRNEĞİ:
   - API anahtarlarını gizlemek, sayaçlar oluşturmak veya bir fonksiyonun 
     sadece bir kez çalışmasını (once) sağlamak için kullanılır.
=========================================================================
-------------------------------------------------------------------------
KARŞILAŞTIRMA: Normal Fonksiyon vs. Closure
--------------------------------------------------------------------------
| Özellik             | Normal Fonksiyon     | Closure (Kapanış)         |
|---------------------|----------------------|---------------------------|
| Değişken Durumu     | Her seferinde sıfırlanır | Durumu (state) korur  |
| Veri Erişimi        | Herkese açık/Global  | Gizli (Private)           |
| Hafıza              | İş bitince silinir   | Referans biterse silinir  |
--------------------------------------------------------------------------
*/

// --- 5. 'safeParseInt(str)' sayı değilse 'null' ---
const safeParseInt = (str) => {
    // 1. Önce string'i sayıya çevirmeye çalışıyoruz
    const parsed = parseInt(str, 10);

    // 2. Sayı değilse (NaN) veya girdi boş/hatalıysa null döndür
    // Number.isNaN, klasik isNaN'den daha güvenlidir.
    if (Number.isNaN(parsed)) {
        return null;
    }

    // 3. Ekstra Güvenlik: parseInt("12abc") -> 12 döndürür. 
    // Eğer girdinin TAMAMI sayı olmalı dersen şu kontrolü de ekleyelim:
    if (parsed.toString().length !== str.toString().trim().length) {
        // İsteğe bağlı: "10px" gibi durumları da reddetmek istersen null döndürebilirsin
        return null;
    }

    return parsed;

};

console.log("5. 'safeParseInt(str)' sayı değilse 'null'");
// --- TESTLER ---
console.log(safeParseInt("123"));    // 123
console.log(safeParseInt("abc"));    // null
console.log(safeParseInt("  45  ")); // 45
console.log(safeParseInt(""));       // null
console.log(safeParseInt(undefined));// null

/*
=========================================================================
 NEDEN BU YÖNTEMİ KULLANMALIYIZ?
=========================================================================

1. NaN KONTROLÜ:
   - JavaScript'te typeof NaN === "number" sonucunu verir. Bu çok kafa karıştırıcıdır.
   - Doğrudan null döndürmek, 'if (!result)' gibi kontrolleri kolaylaştırır.

2. RADIX (TABAN) PARAMETRESİ:
   - parseInt kullanırken daima ikinci parametre olarak 10 (decimal) verilmelidir.
   - Bu, eski tarayıcıların "0" ile başlayan sayıları sekizlik tabanda okumasını önler.

3. TEMİZ KOD:
   - Hatalı girişlerde programın çökmesini engeller ve varsayılan bir değer (null) sunar.
=========================================================================
-------------------------------------------------------------------------
SAYI DÖNÜŞTÜRME KARŞILAŞTIRMASI
------------------------------------------------------
| Girdi     | Number() | parseInt() | safeParseInt() |
|-----------|----------|------------|----------------|
| "123"     | 123      | 123        | 123            |
| "12abc"   | NaN      | 12         | 12 (veya null) |
| "abc"     | NaN      | NaN        | null           |
| null      | 0        | NaN        | null           |
------------------------------------------------------
*/


// --- 6. 'getType(value)' → '"null"','"array"','"object"' ayrımı ---
const getType = (value) => {
    // 1. Null kontrolü (typeof null === "object" hatasını düzeltir)
    if (value === null) {
        return "null";
    }

    // 2. Array (Dizi) kontrolü
    if (Array.isArray(value)) {
        return "array";
    }

    // 3. Genel tip kontrolü (string, number, boolean, undefined, function)
    const type = typeof value;

    // 4. Eğer typeof "object" diyorsa, artık bunun gerçek bir nesne (Object) olduğunu biliyoruz
    return type;
};

console.log("6. 'getType(value)' → 'null','array','object' ayrımı");
// --- TESTLER ---
console.log(getType(null));      // "null"
console.log(getType([1, 2]));    // "array"
console.log(getType({ a: 1 }));  // "object"
console.log(getType("Merhaba")); // "string"
console.log(getType(123));       // "number"
console.log(getType(undefined)); // "undefined"

/*
=========================================================================
 NEDEN BU AYRIM ÖNEMLİDİR?
=========================================================================

1. JAVASCRIPT'İN MİRAS HATASI:
   - JavaScript'in ilk versiyonlarından beri 'null' bir nesne (object) olarak 
     etiketlenmiştir. Bu teknik bir hatadır ama geriye dönük uyumluluk için değiştirilmez.

2. DİZİLER ASLINDA NESNEDİR:
   - JavaScript'te diziler özel birer nesnedir. Ancak iş mantığında bir listeyle 
     bir anahtar-değer sözlüğünü ayırmanız gerekir.

3. KESİN ÇÖZÜM (Alternatif):
   - Çok daha detaylı bir sonuç için Object.prototype.toString.call(value) 
     yöntemi de kullanılabilir. Bu yöntem "[object Array]" gibi sonuçlar verir.
=========================================================================
-------------------------------------------------------------------------
TİP KONTROL TABLOSU
------------------------------------------------
| Değer     | typeof Sonucu | getType() Sonucu |
|-----------|---------------|------------------|
| null      | "object"      | "null"           |
| []        | "object"      | "array"          |
| {}        | "object"      | "object"         |
| NaN       | "number"      | "number"         |
------------------------------------------------
*/