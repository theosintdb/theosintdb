
import React from 'react';

interface PageTitleProps {
    title: string;
    subtitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
    return (
        <div className="mb-8 pb-4 border-b border-gosid-navy-light">
            <h1 className="text-4xl font-bold text-white tracking-wide">{title}</h1>
            {subtitle && <p className="mt-2 text-lg text-gosid-gray">{subtitle}</p>}
        </div>
    );
};

export default PageTitle;
