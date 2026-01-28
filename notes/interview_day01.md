# Day 01 — Interview Notes (let/const/var)

## Soru: `let`, `const`, `var` farkı nedir? Hangi durumda hangisini seçersin?

Cevap:
İlk olarak aralarındaki en büyük fark kapsam (scope) farkı. Şöyle ki;
| Özellik | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Kapsam (Scope)** | Function Scope | Block Scope | Block Scope |
| **Yeniden Atama** | Evet | Evet | Hayır |
| **Tekrar Tanımlama** | Evet | Hayır | Hayır |
| **Hoisting** | `undefined` döner | Hata verir (TDZ) | Hata verir (TDZ) |
| **Global Nesne** | `window.degisken` | Erişilemez | Erişilemez |

`var` aynı değişkeni tekrar tekrar tanımlamama izin verir. Hatalara çok müsait olduğundan dolayı kullanmayı tercih etmem. 
Bir değişkenin erişimini sınırlamak ya da geçici olarak tanımlamak için değişkenler `let` ile oluşturulur. Döngüler veya bir sayaç gibi değeri güncellenecek durumlarda `let` kullanırım.
`const` bir kez değer atanır ve değiştirilemez. Değerin değişmesini istemediğim durumlarda `const` kullanırım.
