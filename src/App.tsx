import React, { useState, useEffect, useRef, useCallback } from 'react';
import ArrayDisplay from './components/ArrayDisplay';
import CodeBlock from './components/CodeBlock';
import AlgorithmInfoPanel from './components/AlgorithmInfoPanel';
import SortingControls from './components/SortingControls';

import { selectionSort, bubbleSort, allAlgorithmCodes, type Step } from './utils/sortingAlgorithms'; // bubbleSort ve allAlgorithmCodes eklendi
import { algorithmData } from './utils/algorithmInfo';
import { generateRandomArray } from './utils/arrayUtils';

function App() {
  const [array, setArray] = useState<number[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(500); // ms
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState<boolean>(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('selectionSort'); // Yeni state

  const intervalRef = useRef<number | null>(null);

  // Mevcut algoritmaların seçeneklerini oluştur
  const algorithmOptions = Object.keys(algorithmData).map(key => ({
    value: key,
    label: algorithmData[key].name
  }));

  // Yeni dizi oluşturma fonksiyonu
  const handleGenerateNewArray = useCallback(() => {
    const newArray = generateRandomArray(15, 10, 100);
    setArray(newArray);
    setIsPlaying(false);
    setSteps([]);
    setCurrentStepIndex(0);
  }, []);

  // Bileşen yüklendiğinde ve yeni dizi oluşturulduğunda ilk diziyi ayarla
  useEffect(() => {
    if (array.length === 0) {
      handleGenerateNewArray();
    }
  }, [array.length, handleGenerateNewArray]);

  // Sıralamayı başlatma fonksiyonu
  const handleSort = () => {
    let sortedSteps: Step[] = [];
    if (selectedAlgorithm === 'selectionSort') {
      sortedSteps = selectionSort(array);
    } else if (selectedAlgorithm === 'bubbleSort') {
      sortedSteps = bubbleSort(array);
    }
    // Gelecekte diğer algoritmalar için buraya 'else if' ekle

    setSteps(sortedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  // Otomatik oynatma/duraklatma mantığı
  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex((prevIndex) => prevIndex + 1);
      }, animationSpeed) as unknown as number;
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      if (currentStepIndex >= steps.length - 1 && steps.length > 0) {
        setIsPlaying(false); // Animasyon bitince duraklat
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, steps.length, animationSpeed]);

  // Mevcut adımın verilerini al
  const currentStep = steps[currentStepIndex];
  const currentDisplayedArray = currentStep ? currentStep.array : array;
  const currentHighlightedIndices = currentStep ? currentStep.highlightedIndices : {};
  const currentDescription = currentStep ? currentStep.description : "Başlamak için 'Sıralamayı Başlat'a tıklayın.";
  const currentCodeHighlightLine = currentStep ? currentStep.codeHighlightLine : null;
  const currentCodeToDisplay = allAlgorithmCodes[selectedAlgorithm]; // Seçilen algoritmanın kodunu al

  // Kontrol butonları için disabled durumları
  const isSortDisabled = steps.length > 0 && currentStepIndex < steps.length - 1;
  const isBackDisabled = currentStepIndex === 0 || steps.length === 0;
  const isPlayPauseDisabled = steps.length === 0 || currentStepIndex === steps.length - 1;
  const isForwardDisabled = currentStepIndex === steps.length - 1 || steps.length === 0;

  // Algoritma değiştiğinde dizi ve adımları sıfırla
  useEffect(() => {
    handleGenerateNewArray(); // Yeni bir dizi oluştur
  }, [selectedAlgorithm, handleGenerateNewArray]); // selectedAlgorithm değiştiğinde tetikle

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">Sıralama Algoritması Görselleştiricisi</h1>

      <div className="flex flex-col md:flex-row w-full max-w-5xl gap-8 mb-8">
        {/* ArrayDisplay (Sol Kısım) */}
        <div className="flex-1 flex flex-col items-center">
          <ArrayDisplay
            array={currentDisplayedArray}
            highlightedIndices={currentHighlightedIndices}
          />
          <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full text-center">
            <p className="text-lg italic">{currentDescription}</p>
          </div>
        </div>

        {/* CodeBlock (Sağ Kısım) */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Algoritma Kodu</h2>
          <CodeBlock
            code={currentCodeToDisplay}
            highlightedLine={currentCodeHighlightLine}
          />
        </div>
      </div>

      <SortingControls
        onGenerateNewArray={handleGenerateNewArray}
        onSort={handleSort}
        onStepBack={() => {
          setIsPlaying(false);
          setCurrentStepIndex((prev) => Math.max(0, prev - 1));
        }}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onStepForward={() => {
          setIsPlaying(false);
          setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
        }}
        onSpeedChange={setAnimationSpeed}
        onToggleInfoPanel={() => setIsInfoPanelOpen(true)}
        
        isPlaying={isPlaying}
        animationSpeed={animationSpeed}
        isSortDisabled={isSortDisabled}
        isBackDisabled={isBackDisabled}
        isPlayPauseDisabled={isPlayPauseDisabled}
        isForwardDisabled={isForwardDisabled}

        selectedAlgorithm={selectedAlgorithm}
        onAlgorithmChange={setSelectedAlgorithm}
        algorithmOptions={algorithmOptions}
      />

      <AlgorithmInfoPanel
        algorithm={algorithmData[selectedAlgorithm]} // Seçilen algoritmanın bilgisini göster
        isOpen={isInfoPanelOpen}
        onClose={() => setIsInfoPanelOpen(false)}
      />
    </div>
  );
}

export default App;