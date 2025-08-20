
import React, { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import { LockClosedIcon } from './icons/Icons';
import { useContent } from '../contexts/ContentContext';

const Report: React.FC = () => {
    const { addReport, siteContent } = useContent();
    const pageText = siteContent.pages.report;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setMessage('');

        const formData = new FormData(e.target as HTMLFormElement);
        const newReport = {
            type: formData.get('report-type') as string,
            summary: formData.get('report-summary') as string,
            links: formData.get('report-links') as string,
            contact: formData.get('report-contact') as string,
        };

        addReport(newReport);

        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSubmitting(false);
        setMessage('Transmission complete. Your report has been securely received and is being triaged. Thank you for your contribution to global security.');
        (e.target as HTMLFormElement).reset();

        setTimeout(() => setMessage(''), 10000);
    };

    return (
        <div>
            <PageTitle title={pageText.title} subtitle={pageText.subtitle} />

            <div className="max-w-4xl mx-auto">
                <Card>
                    <div className="p-6">
                        <div className="text-center mb-6">
                            <LockClosedIcon className="h-12 w-12 text-gosid-gold mx-auto mb-2" />
                            <h2 className="text-2xl font-semibold text-gosid-gold">{pageText.protocolTitle}</h2>
                             <p className="text-gosid-gray mt-2 whitespace-pre-wrap">
                                {pageText.protocolDescription}
                            </p>
                             <p className="text-sm text-red-400 mt-2 whitespace-pre-wrap">
                                {pageText.safetyWarning}
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="report-type" className="block text-sm font-medium text-gosid-gray">{pageText.form.natureLabel}</label>
                                <select id="report-type" name="report-type" required className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold">
                                    <option value="">Select a category...</option>
                                    <option>Counter-Terrorism Tip</option>
                                    <option>Human Trafficking Concern</option>
                                    <option>Cybersecurity Threat</option>
                                    <option>Disinformation Campaign</option>
                                    <option>General Intelligence</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="report-summary" className="block text-sm font-medium text-gosid-gray">{pageText.form.summaryLabel}</label>
                                <textarea id="report-summary" name="report-summary" rows={6} required placeholder={pageText.form.summaryPlaceholder} className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold"></textarea>
                            </div>
                            
                            <div>
                                <label htmlFor="report-links" className="block text-sm font-medium text-gosid-gray">{pageText.form.linksLabel}</label>
                                <textarea id="report-links" name="report-links" rows={3} placeholder={pageText.form.linksPlaceholder} className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold"></textarea>
                            </div>

                             <div>
                                <label htmlFor="report-contact" className="block text-sm font-medium text-gosid-gray">{pageText.form.contactLabel}</label>
                                <input type="text" id="report-contact" name="report-contact" placeholder={pageText.form.contactPlaceholder} className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold" />
                            </div>

                            <div className="text-center pt-4">
                                <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                                    {isSubmitting ? pageText.form.submittingButton : pageText.form.submitButton}
                                </Button>
                            </div>
                             {message && <p className="text-sm text-gosid-gold mt-4 text-center">{message}</p>}
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Report;