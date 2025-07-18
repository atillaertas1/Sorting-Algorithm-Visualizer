// src/utils/sortingAlgorithms.ts

export type Step = { // 'type' anahtar kelimesi ile dışa aktarıldı
  array: number[];
  highlightedIndices: {
    comparing?: number[];
    minIndex?: number;
    sorted?: number[];
    swapping?: number[]; // Yeni: Yer değiştirilen elemanlar için
  };
  description?: string;
  codeHighlightLine?: number; // Vurgulanacak kod satırı (1 tabanlı)
};

export const selectionSort = (originalArray: number[]): Step[] => {
  const array = [...originalArray];
  const steps: Step[] = [];
  const n = array.length;

  steps.push({
    array: [...array],
    highlightedIndices: {},
    description: `Seçmeli Sıralama başladı.`,
    codeHighlightLine: 1 // function selectionSort(arr) {
  });
  steps.push({
    array: [...array],
    highlightedIndices: {},
    description: `Dizinin uzunluğu belirleniyor.`,
    codeHighlightLine: 2 // let n = arr.length;
  });

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    steps.push({
      array: [...array],
      highlightedIndices: { sorted: Array.from({ length: i }, (_, k) => k) },
      description: `Dış döngü başladı: i = ${i}. Sıralanmamış kısım: [${array.slice(i).join(', ')}].`,
      codeHighlightLine: 3 // for (let i = 0; ... )
    });
    steps.push({
      array: [...array],
      highlightedIndices: { sorted: Array.from({ length: i }, (_, k) => k) },
      description: `Minimum eleman başlangıçta ${array[i]} (index ${i}) olarak varsayıldı.`,
      codeHighlightLine: 4 // let minIndex = i;
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...array],
        highlightedIndices: {
          comparing: [j, minIndex],
          minIndex: minIndex,
          sorted: Array.from({ length: i }, (_, k) => k)
        },
        description: `İç döngü başladı: j = ${j}. Karşılaştırılıyor: ${array[j]} ve ${array[minIndex]}.`,
        codeHighlightLine: 5 // for (let j = i + 1; ...)
      });
      steps.push({
        array: [...array],
        highlightedIndices: {
          comparing: [j, minIndex],
          minIndex: minIndex,
          sorted: Array.from({ length: i }, (_, k) => k)
        },
        description: `Karşılaştırma koşulu kontrol ediliyor: ${array[j]} < ${array[minIndex]}?`,
        codeHighlightLine: 6 // if (arr[j] < arr[minIndex])
      });


      if (array[j] < array[minIndex]) {
        minIndex = j;
        steps.push({
          array: [...array],
          highlightedIndices: {
            comparing: [j, minIndex],
            minIndex: minIndex,
            sorted: Array.from({ length: i }, (_, k) => k)
          },
          description: `Yeni minimum bulundu: ${array[minIndex]} (index ${minIndex}).`,
          codeHighlightLine: 7 // minIndex = j;
        });
      }
    }

    // En küçük elemanı doğru pozisyona yerleştir
    steps.push({
      array: [...array],
      highlightedIndices: {
        comparing: [i, minIndex],
        minIndex: minIndex,
        sorted: Array.from({ length: i }, (_, k) => k)
      },
      description: `Sıralanmamış kısmın ilk elemanı (${array[i]}) ve bulunan en küçük eleman (${array[minIndex]}) yer değiştirmeye hazırlanıyor.`,
      codeHighlightLine: 10 // if (minIndex !== i)
    });

    if (minIndex !== i) {
      steps.push({
        array: [...array],
        highlightedIndices: {
          comparing: [i, minIndex],
          sorted: Array.from({ length: i }, (_, k) => k)
        },
        description: `Yer değiştiriliyor: ${array[i]} (index ${i}) ve ${array[minIndex]} (index ${minIndex}).`,
        codeHighlightLine: 11 // [arr[i], arr[minIndex]] = ...
      });
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }

    steps.push({
      array: [...array],
      highlightedIndices: {
        sorted: Array.from({ length: i + 1 }, (_, k) => k)
      },
      description: `Eleman ${array[i]} (index ${i}) doğru konumuna yerleşti. Dış döngü devam ediyor.`,
      codeHighlightLine: 3 // Dış döngünün bir sonraki iterasyonuna hazırlanmak
    });
  }

  // Son eleman da sıralanmış kabul edilir
  steps.push({
    array: [...array],
    highlightedIndices: { sorted: Array.from({ length: n }, (_, k) => k) },
    description: `Sıralama tamamlandı!`,
    codeHighlightLine: 14 // return arr;
  });

  return steps;
};


// Algoritmanın gösterilecek kodu
export const selectionSortCode = `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}`;

export const bubbleSort = (originalArray: number[]): Step[] => {
  const array = [...originalArray];
  const steps: Step[] = [];
  const n = array.length;
  let swapped;

  steps.push({
    array: [...array],
    highlightedIndices: {},
    description: `Kabarcık Sıralaması başladı.`,
    codeHighlightLine: 1 // function bubbleSort(arr) {
  });
  steps.push({
    array: [...array],
    highlightedIndices: {},
    description: `Dizinin uzunluğu belirleniyor.`,
    codeHighlightLine: 2 // let n = arr.length;
  });

  for (let i = 0; i < n - 1; i++) {
    swapped = false; // Her geçişte yer değiştirme olup olmadığını kontrol etmek için
    steps.push({
      array: [...array],
      highlightedIndices: { sorted: Array.from({ length: i }, (_, k) => n - 1 - k).reverse() },
      description: `Dış döngü başladı: i = ${i}. Sıralanacak elemanlara odaklanılıyor.`,
      codeHighlightLine: 3 // for (let i = 0; ...)
    });
    steps.push({
      array: [...array],
      highlightedIndices: { sorted: Array.from({ length: i }, (_, k) => n - 1 - k).reverse() },
      description: `Bu geçişte herhangi bir yer değiştirme olup olmadığı kontrol edilecek.`,
      codeHighlightLine: 4 // swapped = false;
    });


    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        array: [...array],
        highlightedIndices: {
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k).reverse()
        },
        description: `İç döngü başladı: j = ${j}. Karşılaştırılıyor: ${array[j]} ve ${array[j + 1]}.`,
        codeHighlightLine: 5 // for (let j = 0; ...)
      });
      steps.push({
        array: [...array],
        highlightedIndices: {
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k).reverse()
        },
        description: `Karşılaştırma koşulu kontrol ediliyor: ${array[j]} > ${array[j + 1]}?`,
        codeHighlightLine: 6 // if (arr[j] > arr[j + 1])
      });

      if (array[j] > array[j + 1]) {
        steps.push({
          array: [...array],
          highlightedIndices: {
            swapping: [j, j + 1], // Yer değiştirilenleri vurgula
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k).reverse()
          },
          description: `Yer değiştiriliyor: ${array[j]} ve ${array[j + 1]}.`,
          codeHighlightLine: 7 // [arr[j], arr[j + 1]] = ...
        });
        [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Yer değiştirme
        swapped = true;
        steps.push({
          array: [...array],
          highlightedIndices: {
            swapping: [j, j + 1], // Yer değiştirme sonrası durum
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k).reverse()
          },
          description: `Yer değiştirme tamamlandı. 'swapped' true yapıldı.`,
          codeHighlightLine: 8 // swapped = true;
        });
      }
    }

    steps.push({
      array: [...array],
      highlightedIndices: {
        sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k).reverse() // Sıralanmış elemanı işaretle
      },
      description: `Geçiş ${i + 1} tamamlandı. En büyük eleman ${array[n - 1 - i]} yerine yerleşti.`,
      codeHighlightLine: 10 // if (!swapped)
    });

    if (!swapped) {
      steps.push({
        array: [...array],
        highlightedIndices: { sorted: Array.from({ length: n }, (_, k) => k) },
        description: `Bu geçişte hiçbir yer değiştirme olmadı. Dizi sıralanmış demektir.`,
        codeHighlightLine: 11 // break;
      });
      break; // Dizi zaten sıralanmışsa döngüden çık
    }
  }

  steps.push({
    array: [...array],
    highlightedIndices: { sorted: Array.from({ length: n }, (_, k) => k) },
    description: `Kabarcık Sıralaması tamamlandı!`,
    codeHighlightLine: 13 // return arr;
  });

  return steps;
};

// Kabarcık Sıralaması Kodu String'i - YENİ
export const bubbleSortCode = `function bubbleSort(arr) {
  let n = arr.length;
  let swapped; // Bu geçişte yer değiştirme olup olmadığını kontrol eder

  for (let i = 0; i < n - 1; i++) {
    swapped = false; // Her geçişin başında sıfırla
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) { // Yanlış sıradalarsa
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Yer değiştir
        swapped = true; // Yer değiştirme oldu
      }
    }
    // Bu geçişte hiç eleman yer değiştirmediyse, dizi sıralanmıştır
    if (!swapped) {
      break;
    }
  }
  return arr;
}`;

// Tüm algoritma kodlarını içeren bir Map (App.tsx için)
export const allAlgorithmCodes: { [key: string]: string } = {
  selectionSort: selectionSortCode,
  bubbleSort: bubbleSortCode,
};