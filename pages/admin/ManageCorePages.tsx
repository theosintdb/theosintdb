
import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useContent } from '../../contexts/ContentContext';
import { CorePagesContent } from '../../types';

const ManageCorePages: React.FC = () => {
    const { corePagesContent, updateCorePagesContent } = useContent();
    const [content, setContent] = useState<CorePagesContent>(corePagesContent);
    const [status, setStatus] = useState('');

    const handleAboutChange = (field: keyof CorePagesContent['about'], value: string) => {
        setContent(prev => ({ ...prev, about: { ...prev.about, [field]: value } }));
    };

    const handleAboutPrincipleChange = (id: number, field: 'title' | 'text', value: string) => {
        setContent(prev => ({
            ...prev,
            about: {
                ...prev.about,
                principles: prev.about.principles.map(p => p.id === id ? { ...p, [field]: value } : p),
            },
        }));
    }

    const handleOpsecIntroChange = (value: string) => {
        setContent(prev => ({ ...prev, opsec: { ...prev.opsec, intro: value } }));
    };

    const handleOpsecPrincipleChange = (id: number, field: 'title' | 'text', value: string) => {
        setContent(prev => ({
            ...prev,
            opsec: {
                ...prev.opsec,
                principles: prev.opsec.principles.map(p => p.id === id ? { ...p, [field]: value } : p),
            },
        }));
    };
    
    const handleSave = async () => {
        await updateCorePagesContent(content);
        setStatus('Core page content updated successfully.');
        setTimeout(() => setStatus(''), 3000);
    };
    
    return (
        <div>
            <PageTitle title="Manage Core Pages" subtitle="Edit content for About, OPSEC, and other static pages." />

            <div className="space-y-8">
                <Card>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gosid-gold mb-4">About Page Content</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gosid-gray mb-1">Mission Statement</label>
                                <textarea rows={5} value={content.about.mission} onChange={e => handleAboutChange('mission', e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gosid-gray mb-1">Structure & Authority</label>
                                <textarea rows={5} value={content.about.structure} onChange={e => handleAboutChange('structure', e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white mt-4 mb-2">Core Principles</h4>
                                {content.about.principles.map(p => (
                                    <div key={p.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                                        <input type="text" value={p.title} onChange={e => handleAboutPrincipleChange(p.id, 'title', e.target.value)} className="md:col-span-1 bg-gosid-navy p-2 rounded border border-gosid-gray/50" />
                                        <input type="text" value={p.text} onChange={e => handleAboutPrincipleChange(p.id, 'text', e.target.value)} className="md:col-span-2 bg-gosid-navy p-2 rounded border border-gosid-gray/50" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gosid-gold mb-4">OPSEC Page Principles</h3>
                         <div>
                            <label className="block text-sm font-medium text-gosid-gray mb-1">Introductory Text</label>
                            <textarea rows={3} value={content.opsec.intro} onChange={e => handleOpsecIntroChange(e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50" />
                        </div>
                        <div className="space-y-4 mt-4">
                            {content.opsec.principles.map(principle => (
                                <div key={principle.id}>
                                    <label className="block text-sm font-medium text-white mb-1">{principle.title}</label>
                                    <textarea rows={2} value={principle.text} onChange={e => handleOpsecPrincipleChange(principle.id, 'text', e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50" />
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                <div className="text-right">
                    <Button onClick={handleSave}>Save Core Content</Button>
                     {status && <p className="text-sm text-gosid-gold mt-4 text-right">{status}</p>}
                </div>
            </div>
        </div>
    );
};

export default ManageCorePages;