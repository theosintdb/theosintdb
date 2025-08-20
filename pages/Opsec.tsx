
import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import { ShieldCheckIcon } from './icons/Icons';
import { useContent } from '../contexts/ContentContext';

const Opsec: React.FC = () => {
    const { corePagesContent, siteContent } = useContent();
    const pageText = siteContent.pages.opsec;
    const { opsec } = corePagesContent;

    return (
        <div>
            <PageTitle title={pageText.title} subtitle={pageText.subtitle} />

            <Card>
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gosid-gold mb-4">Core Tenets of GOSID OPSEC</h2>
                    <p className="text-gosid-light mb-6 whitespace-pre-wrap">
                        {opsec.intro}
                    </p>
                    <div className="space-y-6">
                        {opsec.principles.map((p) => (
                            <div key={p.id} className="flex items-start space-x-4">
                                <ShieldCheckIcon className="h-8 w-8 text-gosid-gold flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-white">{p.title}</h3>
                                    <p className="text-gosid-light whitespace-pre-wrap">{p.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Opsec;