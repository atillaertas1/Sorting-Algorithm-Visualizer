// src/components/SortingControls.tsx
import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

interface SortingControlsProps {
  onGenerateNewArray: () => void;
  onSort: () => void;
  onStepBack: () => void;
  onPlayPause: () => void;
  onStepForward: () => void;
  onSpeedChange: (speed: number) => void;
  onToggleInfoPanel: () => void;
  
  isPlaying: boolean;
  animationSpeed: number;
  isSortDisabled: boolean;
  isBackDisabled: boolean;
  isPlayPauseDisabled: boolean;
  isForwardDisabled: boolean;

  // Yeni eklenen prop'lar
  selectedAlgorithm: string;
  onAlgorithmChange: (algoKey: string) => void;
  algorithmOptions: { value: string; label: string }[]; // Algoritma seçenekleri
}

const SortingControls: React.FC<SortingControlsProps> = ({
  onGenerateNewArray,
  onSort,
  onStepBack,
  onPlayPause,
  onStepForward,
  onSpeedChange,
  onToggleInfoPanel,
  
  isPlaying,
  animationSpeed,
  isSortDisabled,
  isBackDisabled,
  isPlayPauseDisabled,
  isForwardDisabled,

  selectedAlgorithm, // Yeni
  onAlgorithmChange, // Yeni
  algorithmOptions,  // Yeni
}) => {
  return (
    <div className="flex flex-col items-center w-full max-w-3xl">
      {/* Algoritma Seçimi - YENİ */}
      <div className="mb-6 flex items-center justify-center space-x-2">
        <label htmlFor="algorithm-select" className="text-lg font-medium text-gray-200">Algoritma Seç:</label>
        <select
          id="algorithm-select"
          value={selectedAlgorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
          className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {algorithmOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Ana Kontrol Butonları */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <button
          onClick={onGenerateNewArray}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-lg font-semibold transition-colors duration-200"
        >
          Yeni Dizi Oluştur
        </button>
        <button
          onClick={onSort}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-lg font-semibold transition-colors duration-200"
          disabled={isSortDisabled}
        >
          Sıralamayı Başlat
        </button>
        <button
          onClick={onToggleInfoPanel}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-colors duration-200 flex items-center space-x-2 justify-center"
        >
          <FaInfoCircle />
          <span>Algoritma Bilgisi</span>
        </button>
      </div>

      {/* Navigasyon Butonları */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onStepBack}
          disabled={isBackDisabled}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-semibold transition-colors duration-200 disabled:opacity-50"
        >
          Geri
        </button>
        <button
          onClick={onPlayPause}
          disabled={isPlayPauseDisabled}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-colors duration-200 disabled:opacity-50"
        >
          {isPlaying ? 'Duraklat' : 'Oynat'}
        </button>
        <button
          onClick={onStepForward}
          disabled={isForwardDisabled}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-semibold transition-colors duration-200 disabled:opacity-50"
        >
          İleri
        </button>
      </div>

      {/* Hız Ayarı */}
      <div className="w-full max-w-md flex flex-col items-center">
        <label htmlFor="speed-slider" className="text-lg mb-2">Animasyon Hızı: {animationSpeed}ms</label>
        <input
          id="speed-slider"
          type="range"
          min="50"
          max="1000"
          step="50"
          value={animationSpeed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg"
        />
      </div>
    </div>
  );
};

export default SortingControls;