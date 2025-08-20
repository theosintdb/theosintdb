
import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useContent } from '../contexts/ContentContext';

const Home: React.FC = () => {
    const { homepageContent, siteContent } = useContent();
    const { briefings, toolOfMonth, calendarEvents } = homepageContent;
    const pageText = siteContent.pages.home;

    return (
        <div>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white tracking-wide">{pageText.title}</h1>
                <p className="mt-2 text-lg text-gosid-gray">{pageText.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Director's Briefing */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-semibold text-gosid-gold mb-4 border-b-2 border-gosid-gold/30 pb-2">{pageText.briefingTitle}</h2>
                    <div className="space-y-6">
                        {briefings.map(briefing => (
                             <Card key={briefing.id}>
                                {briefing.imageUrl && <img src={briefing.imageUrl} alt={briefing.title} className="w-full h-48 object-cover" />}
                                <div className="p-6">
                                    <p className="text-sm text-gosid-gray mb-1">CLASSIFICATION: UNCLASSIFIED</p>
                                    <h3 className="text-xl font-bold text-white mb-2">{briefing.title}</h3>
                                    <p className="text-gosid-light mb-4 whitespace-pre-wrap">{briefing.content}</p>
                                    <p className="text-xs text-gosid-gray text-right">- {briefing.author} | Posted: {briefing.date}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Right Side: Sidebar */}
                <div className="lg:col-span-1">
                    <div className="space-y-8">
                        {/* Field Resource Highlight */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gosid-gold mb-4 border-b-2 border-gosid-gold/30 pb-2">{pageText.resourceTitle}</h2>
                             <Card>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{toolOfMonth.name}</h3>
                                     <p className="text-gosid-light mb-4">{toolOfMonth.description}</p>
                                    <Button onClick={() => window.open(toolOfMonth.link, '_blank')}>{pageText.accessButton}</Button>
                                </div>
                            </Card>
                        </div>

                        {/* Operational Calendar */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gosid-gold mb-4 border-b-2 border-gosid-gold/30 pb-2">{pageText.calendarTitle}</h2>
                             <Card>
                                <div className="p-6 divide-y divide-gosid-navy-light/50">
                                   {calendarEvents.map((item, index) => (
                                       <div key={item.id} className={index === 0 ? 'pb-3' : 'py-3'}>
                                            <p className="font-bold text-white">{item.date}</p>
                                            <p className="text-gosid-light">{item.event}</p>
                                       </div>
                                   ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;