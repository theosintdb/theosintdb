
import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useContent } from '../../contexts/ContentContext';
import { HomepageContent } from '../../types';

const ManageHomepage: React.FC = () => {
    const { homepageContent, updateHomepageContent } = useContent();
    const [content, setContent] = useState<HomepageContent>(homepageContent);
    const [status, setStatus] = useState('');

    const handleBriefingChange = (index: number, field: string, value: string) => {
        const newBriefings = [...content.briefings];
        newBriefings[index] = { ...newBriefings[index], [field]: value };
        setContent({ ...content, briefings: newBriefings });
    };
    
    const handleToolChange = (field: string, value: string) => {
        setContent({ ...content, toolOfMonth: { ...content.toolOfMonth, [field]: value } });
    };
    
    const handleCalendarChange = (index: number, field: string, value: string) => {
        const newEvents = [...content.calendarEvents];
        newEvents[index] = { ...newEvents[index], [field]: value };
        setContent({ ...content, calendarEvents: newEvents });
    };

    const handleSave = async () => {
        await updateHomepageContent(content);
        setStatus('Homepage content updated successfully.');
        setTimeout(() => setStatus(''), 3000);
    };

    return (
        <div>
            <PageTitle title="Manage Homepage Content" subtitle="Update briefings, resources, and calendar events." />

            <div className="space-y-8">
                <Card>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gosid-gold mb-4">Director's Briefing</h3>
                        {content.briefings.map((briefing, index) => (
                            <div key={briefing.id} className="space-y-4 mb-6 pb-6 border-b border-gosid-navy">
                                <input type="text" value={briefing.title} placeholder="Briefing Title" onChange={e => handleBriefingChange(index, 'title', e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50" />
                                <input type="url" value={briefing.imageUrl || ''} placeholder="Image URL (Optional)" onChange={e => handleBriefingChange(index, 'imageUrl', e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50" />
                                <textarea rows={5} value={briefing.content} placeholder="Briefing Content" onChange={e => handleBriefingChange(index, 'content', e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50"></textarea>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gosid-gold mb-4">Field Resource Highlight</h3>
                        <div className="space-y-4">
                            <input type="text" value={content.toolOfMonth.name} onChange={e => handleToolChange('name', e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50" placeholder="Tool Name"/>
                            <textarea rows={3} value={content.toolOfMonth.description} onChange={e => handleToolChange('description', e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50" placeholder="Description"></textarea>
                            <input type="url" value={content.toolOfMonth.link} onChange={e => handleToolChange('link', e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50" placeholder="URL"/>
                        </div>
                    </div>
                </Card>
                
                <Card>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gosid-gold mb-4">Operational Calendar</h3>
                        {content.calendarEvents.map((event, index) => (
                            <div key={event.id} className="flex gap-4 mb-2">
                                <input type="text" value={event.date} onChange={e => handleCalendarChange(index, 'date', e.target.value)} className="w-1/3 bg-gosid-navy p-2 rounded border border-gosid-gray/50"/>
                                <input type="text" value={event.event} onChange={e => handleCalendarChange(index, 'event', e.target.value)} className="w-2/3 bg-gosid-navy p-2 rounded border border-gosid-gray/50"/>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="text-right">
                    <Button onClick={handleSave}>Save Homepage Changes</Button>
                    {status && <p className="text-sm text-gosid-gold mt-4 text-right">{status}</p>}
                </div>
            </div>
        </div>
    );
};

export default ManageHomepage;