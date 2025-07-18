// src/components/AlgorithmInfoPanel.tsx
import React from 'react';
import type { AlgorithmInfo } from '../utils/algorithmInfo';
import { motion, AnimatePresence } from 'framer-motion';

interface AlgorithmInfoPanelProps {
  algorithm: AlgorithmInfo | null;
  onClose: () => void;
  isOpen: boolean;
}

const AlgorithmInfoPanel: React.FC<AlgorithmInfoPanelProps> = ({ algorithm, onClose, isOpen }) => {
  if (!algorithm) return null; // Algoritma bilgisi yoksa hiçbir şey render etme

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center p-4 z-50 overflow-auto"
        >
          <div className="bg-gray-800 rounded-lg p-6 shadow-2xl max-w-3xl w-full relative border border-blue-600">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold leading-none"
              aria-label="Kapat"
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold text-blue-400 mb-4">{algorithm.name}</h2>
            <p className="text-gray-300 mb-6">{algorithm.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-2">Nasıl Çalışır?</h3>
                <ol className="list-decimal list-inside text-gray-300 space-y-1">
                  {algorithm.howItWorks.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-2">Karmaşıklıklar</h3>
                <p className="text-gray-300">
                  <span className="font-semibold">Zaman Karmaşıklığı:</span>
                  <ul className="list-disc list-inside ml-4">
                    <li>En İyi: {algorithm.timeComplexity.best}</li>
                    <li>Ortalama: {algorithm.timeComplexity.average}</li>
                    <li>En Kötü: {algorithm.timeComplexity.worst}</li>
                  </ul>
                </p>
                <p className="text-gray-300 mt-2">
                  <span className="font-semibold">Alan Karmaşıklığı:</span> {algorithm.spaceComplexity}
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-blue-300 mb-2">Artıları ve Eksileri</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="list-disc list-inside text-green-400 space-y-1">
                  {algorithm.pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="list-disc list-inside text-red-400 space-y-1">
                  {algorithm.cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlgorithmInfoPanel;