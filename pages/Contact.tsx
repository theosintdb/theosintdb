
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import { useContent } from '../contexts/ContentContext';

const Contact: React.FC = () => {
    const { siteContent } = useContent();
    const pageText = siteContent.pages.contact;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setMessage('');

        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setMessage('Message sent. We will respond to your inquiry if a reply is deemed necessary.');
        (e.target as HTMLFormElement).reset();

        setTimeout(() => setMessage(''), 10000);
    };

    const descriptionParts = pageText.formDescription.split('{reportLink}');

    return (
        <div>
            <PageTitle title={pageText.title} subtitle={pageText.subtitle} />

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold text-gosid-gold mb-4">{pageText.formTitle}</h2>
                        <p className="text-gosid-light mb-4 whitespace-pre-wrap">
                            {descriptionParts[0]}
                            {descriptionParts.length > 1 && (
                                <>
                                    <Link to="/report" className="text-gosid-gold underline">Report</Link>
                                    {descriptionParts[1]}
                                </>
                            )}
                        </p>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="contact-name" className="block text-sm font-medium text-gosid-gray">{pageText.form.nameLabel}</label>
                                <input type="text" id="contact-name" required className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold" />
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="block text-sm font-medium text-gosid-gray">{pageText.form.emailLabel}</label>
                                <input type="email" id="contact-email" required className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold" />
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium text-gosid-gray">{pageText.form.messageLabel}</label>
                                <textarea id="contact-message" rows={5} required className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold"></textarea>
                            </div>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : pageText.form.submitButton}
                            </Button>
                            {message && <p className="text-sm text-gosid-gold mt-4">{message}</p>}
                        </form>
                    </div>
                </Card>

                <Card>
                     <div className="p-6">
                        <h2 className="text-2xl font-semibold text-gosid-gold mb-4">{pageText.channelsTitle}</h2>
                         <p className="text-gosid-light mb-4 whitespace-pre-wrap">
                            {pageText.channelsDescription}
                        </p>
                        <div className="space-y-4">
                            {pageText.channels.map(channel => (
                                <div key={channel.id} className="flex items-center space-x-3">
                                    <span className="font-bold text-white w-28 flex-shrink-0">{channel.platform}:</span>
                                    <a href={channel.link} className="text-gosid-gold hover:underline break-all">{channel.handle}</a>
                                </div>
                            ))}
                        </div>
                         <div className="mt-6 border-t border-gosid-gray/20 pt-6">
                            <h3 className="text-xl font-bold text-white mb-2">{pageText.warningTitle}</h3>
                            <p className="text-sm text-gosid-gray whitespace-pre-wrap">
                                {pageText.warningText}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Contact;