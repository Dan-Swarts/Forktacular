import { useState } from 'react';

interface ButtonProps {
    text?: string;
    onClick?: () => void;
}

export default function Button({ text = "Click me!", onClick }: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <button
      className={`
        relative overflow-hidden px-6 py-3 group rounded-full
        bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500
        text-white font-bold text-lg
        transform transition-all duration-200 ease-in-out
        hover:scale-105 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75
        ${isPressed ? 'scale-95' : ''}
      `}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      aria-label={text}
      onClick={onClick}
    >
      <span className="relative z-10">{text}</span>
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200 ease-in-out" />
      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
        <svg className="w-6 h-6 text-white animate-ping" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </span>
    </button>
  )
}