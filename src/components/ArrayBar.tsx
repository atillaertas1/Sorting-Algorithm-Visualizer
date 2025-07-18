// src/components/ArrayBar.tsx
import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

interface ArrayBarProps {
  value: number;
  index: number;
  color: string;
  isComparing?: boolean;
  isMin?: boolean;
  isSorted?: boolean;
  isSwapping?: boolean; // <-- YENİ: Yer değiştirilen eleman mı?
}

const ArrayBar: React.FC<ArrayBarProps> = ({ value, index, color, isComparing, isMin, isSorted, isSwapping }) => {
  const barHeight = value * 3;

  const barClasses = classNames(
    'relative w-8 mx-0.5 flex items-end justify-center text-xs font-bold text-gray-900 transition-colors duration-200',
    {
      'bg-blue-500': !isComparing && !isMin && !isSorted && !isSwapping, // Varsayılan renk
      'bg-yellow-400': isComparing, // Karşılaştırılan
      'bg-purple-500': isMin,      // O anki en küçük (Selection Sort'a özel)
      'bg-green-500': isSorted,    // Sıralanmış
      'bg-red-500': isSwapping,    // <-- YENİ: Yer değiştirilen
    }
  );

  return (
    <motion.div
      layout
      key={index}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={barClasses}
      style={{ height: `${barHeight}px` }}
    >
      <span className="absolute bottom-1">{value}</span>
    </motion.div>
  );
};

export default ArrayBar;