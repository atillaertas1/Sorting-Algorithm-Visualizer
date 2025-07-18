// src/components/CodeBlock.tsx
import React from 'react';
import classNames from 'classnames';

interface CodeBlockProps {
  code: string;
  highlightedLine: number | null | undefined;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, highlightedLine }) => {
  const lines = code.split('\n');

  return (
    <pre className="bg-gray-800 text-gray-200 p-4 rounded-lg text-sm font-mono overflow-auto max-h-96">
      {lines.map((line, index) => {
        const lineNumber = index + 1; // Satır numaraları 1'den başlar
        const isHighlighted = lineNumber === highlightedLine;

        return (
          <div
            key={index}
            className={classNames(
              'flex items-center whitespace-pre-wrap py-0.5 px-2 transition-colors duration-200',
              {
                'bg-blue-700/50': isHighlighted, // Vurgulanmış satırın arka planı
              }
            )}
          >
            <span className="text-gray-500 w-6 text-right mr-3 flex-shrink-0">{lineNumber}.</span>
            <span>{line}</span>
          </div>
        );
      })}
    </pre>
  );
};

export default CodeBlock;