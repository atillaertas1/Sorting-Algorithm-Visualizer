// src/components/ArrayDisplay.tsx
import React from 'react';
import ArrayBar from './ArrayBar';
import { AnimatePresence } from 'framer-motion';

interface ArrayDisplayProps {
  array: number[];
  highlightedIndices: {
    comparing?: number[];
    minIndex?: number;
    sorted?: number[];
    swapping?: number[]; // <-- YENİ
  };
}

const ArrayDisplay: React.FC<ArrayDisplayProps> = ({ array, highlightedIndices }) => {
  const { comparing = [], minIndex = -1, sorted = [], swapping = [] } = highlightedIndices; // <-- YENİ: swapping eklendi

  return (
    <div className="flex justify-center items-end h-96 my-8 border-b-2 border-gray-600 pb-2 w-full">
      <AnimatePresence mode="popLayout">
        {array.map((value, index) => (
          <ArrayBar
            key={index}
            value={value}
            index={index}
            color="skyblue"
            isComparing={comparing.includes(index)}
            isMin={index === minIndex}
            isSorted={sorted.includes(index)}
            isSwapping={swapping.includes(index)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ArrayDisplay;