# Day 01 — Interview Notes (Scope)

## Soru: Scope nedir? `var` neden problem çıkarır? Hoisting’i nasıl açıklarsın?

Cevap:

1. Scope (Kapsam) Nedir?
   Scope, bir değişkenin veya fonksiyonun kodun hangi bölümlerinden erişilebilir olduğunu belirleyen "etki alanı"dır. JavaScript'te temel olarak üç tür scope vardır:
   - Global Scope: Kodun her yerinden erişilebilen değişkenler.
   - Function (Local) Scope: Sadece tanımlandığı fonksiyonun içinden erişilebilen değişkenler.
   - Block Scope (ES6): Sadece bir `{ }` bloğu (if, for, while gibi) içinde yaşayan değişkenler. (`let` ve `const` ile sağlanır).

2. `var` Neden Problem Çıkarır?
   Modern JavaScript'te `var` yerine `let` ve `const` kullanılmasının çok geçerli sebepleri var:
   - Block Scope Desteği Yoktur: `var`, blok kapsamını tanımaz. Bir `if` bloğu içinde `var` ile değişken tanımlarsanız, o değişken bloğun dışına "taşar".
   - Aynı İsimle Tekrar Tanımlanabilir: Aynı kapsamda `var x = 1;` ve sonra `var x = 2;` derseniz hata almazsınız. Bu, büyük projelerde kazara verilerin üzerine yazılmasına neden olur.
   - Hoisting Davranışı: `var` ile tanımlanan değişkenler "tanımsız" (`undefined`) olarak yukarı taşınır, bu da mantıksal hatalara yol açar.

3. Hoisting (Yukarı Çekme) Nasıl Açıklanır?
   Hoisting, JavaScript motorunun kodu çalıştırmadan önce tüm değişken ve fonksiyon tanımlamalarını bulundukları kapsamın en üstüne taşıyormuş gibi davranmasıdır.

   Önemli: Sadece tanımlamalar (declarations) yukarı taşınır, atamalar (assignments) olduğu yerde kalır.

   `var` vs `let/const` Hoisting Farkı:
   - `var`: Yukarı taşınır ve başlangıç değeri olarak `undefined` atanır. Tanımlamadan önce çağırsanız bile hata vermez, `undefined` döner.
   - `let` ve `const`: Onlar da aslında hoisting'e uğrar ama TDZ (Temporal Dead Zone) denilen bir "ölü bölge"de tutulurlar. Tanımlanmadan önce onlara erişmeye çalışırsanız `ReferenceError` alırsınız. Bu çok daha güvenlidir.

```js
console.log(name); // Çıktı: undefined (Hata vermez! Çünkü var hoisting oldu)
var name = "Gemini";

// ---

console.log(age); // Hata: ReferenceError (let TDZ'de bekliyor, güvenli!)
let age = 2;

// ---

if (true) {
  var status = "active";
  let score = 100;
}
console.log(status); // Çıktı: "active" (var blok dışına sızdı - Problem!)
console.log(score); // Hata: ReferenceError (let blok içinde hapsoldu - Güvenli!)
```
