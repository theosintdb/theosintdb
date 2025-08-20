
import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import { useContent } from '../contexts/ContentContext';

const AHTU: React.FC = () => {
    const { addApplication, siteContent } = useContent();
    const pageText = siteContent.pages.ahtu;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setMessage('');
        
        const formData = new FormData(e.target as HTMLFormElement);
        const newApplication = {
            unit: 'AHTU' as const,
            name: formData.get('ahtu-name') as string,
            email: formData.get('ahtu-email') as string,
            statement: formData.get('ahtu-skills') as string,
        };
        
        addApplication(newApplication);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setMessage('Application received. Your credentials are being reviewed by AHTU command. We will make contact if your profile is selected for the next stage.');
        (e.target as HTMLFormElement).reset();

        setTimeout(() => setMessage(''), 10000);
    };

    return (
        <div>
            <PageTitle title={pageText.title} subtitle={pageText.subtitle} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <Card>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gosid-gold mb-4">{pageText.mandateTitle}</h2>
                            <p className="text-gosid-light mb-4 leading-relaxed whitespace-pre-wrap">
                                {pageText.mandateText}
                            </p>
                            <h3 className="text-xl font-bold text-white mb-2">{pageText.operationsTitle}</h3>
                            <ul className="list-disc list-inside text-gosid-light space-y-2 mb-4">
                                {pageText.operations.map((op, index) => <li key={index}>{op}</li>)}
                            </ul>
                            <p className="text-sm text-gosid-gray italic">
                                {pageText.noteText}
                            </p>
                        </div>
                    </Card>
                </div>

                <div className="md:col-span-1">
                    <Card>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gosid-gold mb-4">{pageText.formTitle}</h2>
                            <p className="text-gosid-light mb-4">
                                {pageText.formDescription}
                            </p>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="ahtu-name" className="block text-sm font-medium text-gosid-gray">{pageText.form.nameLabel}</label>
                                    <input type="text" id="ahtu-name" name="ahtu-name" required className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold" />
                                </div>
                                <div>
                                    <label htmlFor="ahtu-email" className="block text-sm font-medium text-gosid-gray">{pageText.form.emailLabel}</label>
                                    <input type="email" id="ahtu-email" name="ahtu-email" required className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold" />
                                </div>
                                <div>
                                    <label htmlFor="ahtu-skills" className="block text-sm font-medium text-gosid-gray">{pageText.form.statementLabel}</label>
                                    <textarea id="ahtu-skills" name="ahtu-skills" rows={4} required className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold"></textarea>
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

export default AHTU;