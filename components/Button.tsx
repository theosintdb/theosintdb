
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', className = '', disabled = false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-6 py-2 border border-gosid-gold text-gosid-gold font-semibold rounded-md transition-colors duration-300
            ${disabled
                ? 'bg-gosid-gray/20 text-gosid-gray cursor-not-allowed'
                : 'bg-transparent hover:bg-gosid-gold hover:text-gosid-navy'
            }
            ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
