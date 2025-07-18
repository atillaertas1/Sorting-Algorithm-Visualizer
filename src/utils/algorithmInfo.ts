// src/utils/algorithmInfo.ts

export interface AlgorithmInfo {
  name: string;
  description: string;
  howItWorks: string[];
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  pros: string[];
  cons: string[];
}

export const algorithmData: { [key: string]: AlgorithmInfo } = {
  "selectionSort": {
    name: "Seçmeli Sıralama (Selection Sort)",
    description: "Seçmeli sıralama, bir diziyi sıralamak için her iterasyonda sıralanmamış kısmın en küçük (veya en büyük) elemanını bulup, onu sıralanmamış kısmın başına yerleştiren basit bir karşılaştırmalı sıralama algoritmasıdır.",
    howItWorks: [
      "1. Diziyi iki kısma ayır: sıralanmış kısım ve sıralanmamış kısım. Başlangıçta tüm dizi sıralanmamış kabul edilir.",
      "2. Sıralanmamış kısımda bulunan en küçük elemanı bul.",
      "3. Bulunan en küçük elemanı, sıralanmamış kısmın ilk elemanı (yani doğru yerleştirilmesi gereken konum) ile yer değiştir.",
      "4. Sıralanmış kısmı bir eleman büyüt ve işlemi sıralanmamış kısım kalmayana kadar tekrarla."
    ],
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1) (yerinde sıralama)",
    pros: [
      "Yerinde (in-place) bir sıralama algoritmasıdır, ek bellek alanı gerektirmez.",
      "Küçük listeler için nispeten kolay anlaşılır ve uygulanabilir."
    ],
    cons: [
      "Büyük veri setleri için verimsizdir; her zaman O(n²) zaman karmaşıklığına sahiptir.",
      "Diğer basit algoritmalar (örn. eklemeli sıralama) kadar hızlı değildir, çünkü her elemanı yerleştirmek için tarama yapmak zorundadır."
    ]
  },
  // ===============================================
  // KABARCIK SIRALAMASI BİLGİLERİ - YENİ
  // ===============================================
  "bubbleSort": {
    name: "Kabarcık Sıralaması (Bubble Sort)",
    description: "Kabarcık sıralaması, dizideki komşu elemanları tekrar tekrar karşılaştırıp yanlış sıradaysalar yerlerini değiştirerek diziyi sıralayan basit bir algoritmadır. Her geçişte en büyük eleman sonuna 'kabarcık gibi' yükselir.",
    howItWorks: [
      "1. Diziyi baştan sona gezmeye başla.",
      "2. Her adımda, mevcut elemanı bir sonraki komşu elemanla karşılaştır.",
      "3. Eğer mevcut eleman komşu elemandan büyükse (artandan sıralama için), yerlerini değiştir.",
      "4. Dizinin sonuna kadar bu işlemi tekrarla. Bu, en büyük elemanın en sona yerleşmesini sağlar.",
      "5. Bir sonraki geçişte, son yerleşen elemanı hariç tutarak aynı işlemi tekrarla. Hiçbir yer değiştirme yapılmayana kadar bu geçişlere devam et, bu da dizinin tamamen sıralandığını gösterir."
    ],
    timeComplexity: {
      best: "O(n) (Zaten sıralıysa)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    spaceComplexity: "O(1) (yerinde sıralama)",
    pros: [
      "Mantığı son derece basit ve anlaşılırdır.",
      "Uygulaması kolaydır.",
      "Yerinde (in-place) bir sıralama algoritmasıdır, ek bellek alanı gerektirmez."
    ],
    cons: [
      "Çok büyük veri setleri için son derece verimsizdir (zaman karmaşıklığı).",
      "Genellikle gerçek dünya uygulamalarında tercih edilmez.",
      "Dizi kısmen sıralı olsa bile hala birçok karşılaştırma ve yer değiştirme yapabilir (optimize edilmemiş hali)."
    ]
  }
};