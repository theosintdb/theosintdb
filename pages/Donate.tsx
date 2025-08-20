
import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import { BtcIcon, EthIcon, XmrIcon } from './icons/Icons';
import { useContent } from '../contexts/ContentContext';

const iconMap: { [key: string]: React.ReactNode } = {
    'Bitcoin (BTC)': <BtcIcon className="h-12 w-12 text-gosid-gold" />,
    'Ethereum (ETH)': <EthIcon className="h-12 w-12 text-gosid-gold" />,
    'Monero (XMR)': <XmrIcon className="h-12 w-12 text-gosid-gold" />,
};

const CryptoWallet: React.FC<{ name: string; address: string; }> = ({ name, address }) => (
    <Card className="text-center">
        <div className="p-6">
            <div className="flex justify-center mb-4">{iconMap[name] || null}</div>
            <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
            <div className="bg-gosid-navy p-2 rounded-md">
                <p className="text-sm text-gosid-light break-all font-mono">{address}</p>
            </div>
            <button
                onClick={() => navigator.clipboard.writeText(address)}
                className="mt-4 text-xs text-gosid-gold hover:text-white transition-colors"
            >
                Copy Address
            </button>
        </div>
    </Card>
);


const Donate: React.FC = () => {
    const { siteContent } = useContent();
    const pageText = siteContent.pages.donate;

    return (
        <div>
            <PageTitle title={pageText.title} subtitle={pageText.subtitle} />

            <Card>
                <div className="p-6 text-center">
                    <h2 className="text-2xl font-semibold text-gosid-gold mb-4">{pageText.independenceTitle}</h2>
                    <p className="text-gosid-light max-w-3xl mx-auto leading-relaxed whitespace-pre-wrap">
                        {pageText.independenceText}
                    </p>
                    <p className="mt-4 text-sm text-gosid-gray whitespace-pre-wrap">
                        {pageText.warningText}
                    </p>
                </div>
            </Card>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {pageText.wallets.map(wallet => (
                    <CryptoWallet 
                        key={wallet.id}
                        name={wallet.name}
                        address={wallet.address}
                    />
                ))}
            </div>
        </div>
    );
};

export default Donate;