import React, { forwardRef } from 'react';
import './card.css';

interface CardProps {
  elevation?: number;
  width?: string;
  maxWidth?: string; // Nuevo prop
  height?: string;
  backgroundColor?: string;
  shadowColor?: string;
  blurRadius?: number;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void; 
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  elevation = 1,
  width = '380px',         // Cambia a 100% para responsividad
  maxWidth = '400px',     // Nuevo valor por defecto
  height,
  backgroundColor = 'white',
  shadowColor = 'rgba(44, 92, 168, 0.3)', // Color del shadow
  blurRadius = 10,
  children,
  className = '',
  onClick, 
}, ref) => {
  const boxShadow = `0 ${elevation}px ${blurRadius}px ${shadowColor}`;

  return (
    <div
      ref={ref}
      className={`card ${className}`}
      style={{
        width,
        maxWidth,
        height,
        backgroundColor,
        boxShadow,
      }}
      onClick={onClick} 
    >
      {children}
    </div>
  );
});

export default Card;
