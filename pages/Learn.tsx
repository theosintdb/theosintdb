
import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import { TrainingMaterial } from '../types';
import { PlayIcon, DocumentTextIcon } from './icons/Icons';
import { useContent } from '../contexts/ContentContext';

const Learn: React.FC = () => {
    const { trainingMaterials, siteContent } = useContent();
    const pageText = siteContent.pages.learn;

    const getIcon = (type: TrainingMaterial['type']) => {
        switch (type) {
            case 'Video':
                return <PlayIcon className="h-6 w-6 text-gosid-gold" />;
            case 'Guide':
            case 'Tutorial':
                return <DocumentTextIcon className="h-6 w-6 text-gosid-gold" />;
            default:
                return null;
        }
    };

    return (
        <div>
            <PageTitle title={pageText.title} subtitle={pageText.subtitle} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingMaterials.map((material) => (
                    <Card key={material.id} className="flex flex-col">
                        <div className="p-6 flex-grow">
                            <div className="flex items-start justify-between">
                                <h3 className="text-xl font-bold text-white mb-2">{material.title}</h3>
                                {getIcon(material.type)}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gosid-gold mb-3">
                                <span>{material.type}</span>
                                {material.duration && <><span>•</span><span>{material.duration}</span></>}
                            </div>
                            <p className="text-gosid-light">{material.description}</p>
                        </div>
                        <div className="bg-gosid-navy-light/50 px-6 py-3 mt-auto">
                           <a href={material.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-gosid-gold hover:text-white transition-colors duration-200">
                                Access Material &rarr;
                            </a>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Learn;