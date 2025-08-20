
import React from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import { useContent } from '../contexts/ContentContext';

const About: React.FC = () => {
    const { corePagesContent, siteContent } = useContent();
    const pageText = siteContent.pages.about;
    const { about } = corePagesContent;

    return (
        <div>
            <PageTitle title={pageText.title} subtitle={pageText.subtitle} />

            <div className="space-y-8">
                <Card>
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold text-gosid-gold mb-4">Our Mission</h2>
                        <p className="text-gosid-light leading-relaxed whitespace-pre-wrap">{about.mission}</p>
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gosid-gold mb-4">Structure & Authority</h2>
                            <p className="text-gosid-light whitespace-pre-wrap">{about.structure}</p>
                        </div>
                    </Card>
                     <Card>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gosid-gold mb-4">Core Principles</h2>
                             <ul className="list-disc list-inside text-gosid-light space-y-2">
                                {about.principles.map(p => (
                                    <li key={p.id}><strong>{p.title}:</strong> {p.text}</li>
                                ))}
                            </ul>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default About;