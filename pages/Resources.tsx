
import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import { Resource } from '../types';
import { useContent } from '../contexts/ContentContext';

const Resources: React.FC = () => {
    const { resources, addResource, siteContent } = useContent();
    const pageText = siteContent.pages.resources;
    const approvedResources = resources.filter(r => r.status === 'approved');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setMessage('');

        const formData = new FormData(e.target as HTMLFormElement);
        const newResource: Omit<Resource, 'id' | 'status'> = {
            title: formData.get('res-title') as string,
            link: formData.get('res-link') as string,
            description: formData.get('res-desc') as string,
            type: formData.get('res-type') as 'Tool' | 'Database' | 'Article' | 'Guide',
        };
        
        addResource(newResource);

        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSubmitting(false);
        setMessage('Resource submitted. It will be reviewed by our analysts for accuracy, relevance, and operational security before being added to the database.');
        (e.target as HTMLFormElement).reset();

        setTimeout(() => setMessage(''), 10000);
    };

    return (
        <div>
            <PageTitle title={pageText.title} subtitle={pageText.subtitle} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        {approvedResources.length > 0 ? (
                            approvedResources.map(res => (
                                <Card key={res.id}>
                                    <div className="p-4 sm:p-6">
                                        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                            <h3 className="text-xl font-bold text-white mb-2 sm:mb-0">{res.title}</h3>
                                            <span className="text-sm bg-gosid-gold/20 text-gosid-gold px-2 py-1 rounded-full self-start sm:self-center">{res.type}</span>
                                        </div>
                                        <p className="mt-2 text-gosid-light">{res.description}</p>
                                        <div className="mt-4">
                                           <Button onClick={() => window.open(res.link, '_blank', 'noopener,noreferrer')}>
                                                Access Resource
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <Card><div className="p-6 text-center text-gosid-gray">No approved resources available.</div></Card>
                        )}
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <Card>
                        <div className="p-6">
                             <h2 className="text-2xl font-semibold text-gosid-gold mb-4">{pageText.formTitle}</h2>
                             <p className="text-gosid-light mb-4">
                                {pageText.formDescription}
                            </p>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="res-title" className="block text-sm font-medium text-gosid-gray">{pageText.form.nameLabel}</label>
                                    <input type="text" id="res-title" name="res-title" required className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold" />
                                </div>
                                <div>
                                    <label htmlFor="res-link" className="block text-sm font-medium text-gosid-gray">{pageText.form.urlLabel}</label>
                                    <input type="url" id="res-link" name="res-link" required className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold" />
                                </div>
                                <div>
                                    <label htmlFor="res-type" className="block text-sm font-medium text-gosid-gray">{pageText.form.typeLabel}</label>
                                    <select id="res-type" name="res-type" required className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold">
                                        <option>Tool</option>
                                        <option>Database</option>
                                        <option>Article</option>
                                        <option>Guide</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="res-desc" className="block text-sm font-medium text-gosid-gray">{pageText.form.descLabel}</label>
                                    <textarea id="res-desc" name="res-desc" rows={3} required className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold"></textarea>
                                </div>
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? pageText.form.submittingButton : pageText.form.submitButton}
                                </Button>
                                {message && <p className="text-sm text-gosid-gold mt-4 text-center">{message}</p>}
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Resources;