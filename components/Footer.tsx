
import React from 'react';
import { useContent } from '../contexts/ContentContext';

const Footer: React.FC = () => {
    const { siteContent } = useContent();
    const { footer } = siteContent;

    return (
        <footer className="bg-gosid-navy-light border-t-2 border-gosid-gold mt-12">
            <div className="container mx-auto py-6 px-4 text-center text-gosid-gray text-sm">
                <p>{footer.copyrightText.replace('{year}', new Date().getFullYear().toString())}</p>
                <p className="mt-2 opacity-70">{footer.footerDisclaimer}</p>
            </div>
        </footer>
    );
};

export default Footer;