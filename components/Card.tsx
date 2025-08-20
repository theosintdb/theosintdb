
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-gosid-navy-light border border-gosid-navy-light/50 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-gosid-gold/20 hover:border-gosid-gold/30 ${className}`}>
            {children}
        </div>
    );
};

export default Card;
