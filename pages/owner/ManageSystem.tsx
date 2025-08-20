import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useContent } from '../../contexts/ContentContext';
import { SiteContent, NavLinkItem, DonatePageContent, ContactPageContent } from '../../types';

type PageKeys = keyof SiteContent['pages'];

const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gosid-navy rounded-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 bg-gosid-navy text-left"
            >
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && <div className="p-4 space-y-4">{children}</div>}
        </div>
    );
};

const FormField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; isTextarea?: boolean; rows?: number }> = ({ label, value, onChange, isTextarea, rows=3 }) => (
    <div>
        <label className="block text-sm font-medium text-gosid-gray mb-1">{label}</label>
        {isTextarea ? (
            <textarea rows={rows} value={value} onChange={onChange} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50 text-white" />
        ) : (
            <input type="text" value={value} onChange={onChange} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50 text-white" />
        )}
    </div>
);

const PageContentEditor: React.FC<{ pageKey: PageKeys; content: SiteContent['pages'][PageKeys]; onChange: (page: PageKeys, field: string, value: string) => void }> = ({ pageKey, content, onChange }) => (
    <>
        <FormField label="Title" value={content.title} onChange={e => onChange(pageKey, 'title', e.target.value)} />
        <FormField label="Subtitle" value={content.subtitle} onChange={e => onChange(pageKey, 'subtitle', e.target.value)} />
    </>
)

const ManageSystem: React.FC = () => {
    const { siteContent, updateSiteContent } = useContent();
    const [content, setContent] = useState<SiteContent>(siteContent);
    const [status, setStatus] = useState('');

    const handleSave = async () => {
        await updateSiteContent(content);
        setStatus('Site content updated successfully.');
        setTimeout(() => setStatus(''), 3000);
    };

    const handleHeaderChange = (field: keyof SiteContent['header'], value: string) => {
        setContent(prev => ({ ...prev, header: { ...prev.header, [field]: value } }));
    };

    const handleNavLinkChange = (type: 'primaryLinks' | 'secondaryLinks', index: number, field: keyof NavLinkItem, value: string) => {
         setContent(prev => {
            const newLinks = [...prev.header[type]];
            newLinks[index] = { ...newLinks[index], [field]: value };
            return { ...prev, header: { ...prev.header, [type]: newLinks } };
        });
    };

    const handleFooterChange = (field: keyof SiteContent['footer'], value: string) => {
        setContent(prev => ({ ...prev, footer: { ...prev.footer, [field]: value } }));
    };

    const handlePageContentChange = (page: PageKeys, field: string, value: any) => {
        setContent(prev => ({ ...prev, pages: { ...prev.pages, [page]: { ...prev.pages[page], [field]: value } } }));
    };

    const handleFormContentChange = (page: PageKeys, formField: string, value: string) => {
        setContent(prev => ({ ...prev, pages: { ...prev.pages, [page]: { ...(prev.pages[page] as any), form: { ...(prev.pages[page] as any).form, [formField]: value } } } }));
    };
    
    return (
        <div>
            <PageTitle title="System & Site Configuration" subtitle="OWNER ACCESS: Manage global site text and content." />
            <Card>
                <div className="p-6 space-y-4">
                    <Accordion title="Global - Header">
                        <FormField label="Site Title" value={content.header.siteTitle} onChange={e => handleHeaderChange('siteTitle', e.target.value)} />
                        <FormField label="Site Subtitle" value={content.header.siteSubtitle} onChange={e => handleHeaderChange('siteSubtitle', e.target.value)} isTextarea/>
                        <FormField label="Login Button Text" value={content.header.loginButton} onChange={e => handleHeaderChange('loginButton', e.target.value)} />
                         <h4 className="text-lg font-bold text-white mt-4 mb-2">Primary Navigation Links</h4>
                        {content.header.primaryLinks.map((link, index) => (
                             <div key={link.id} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                <FormField label={`Link ${index + 1} Name`} value={link.name} onChange={e => handleNavLinkChange('primaryLinks', index, 'name', e.target.value)} />
                                <FormField label={`Link ${index + 1} Path`} value={link.path} onChange={e => handleNavLinkChange('primaryLinks', index, 'path', e.target.value)} />
                             </div>
                        ))}
                         <h4 className="text-lg font-bold text-white mt-4 mb-2">Secondary Navigation Links</h4>
                        {content.header.secondaryLinks.map((link, index) => (
                             <div key={link.id} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                <FormField label={`Link ${index + 1} Name`} value={link.name} onChange={e => handleNavLinkChange('secondaryLinks', index, 'name', e.target.value)} />
                                <FormField label={`Link ${index + 1} Path`} value={link.path} onChange={e => handleNavLinkChange('secondaryLinks', index, 'path', e.target.value)} />
                             </div>
                        ))}
                    </Accordion>
                    
                    <Accordion title="Global - Footer">
                        <FormField label="Copyright Text ({year} is a placeholder)" value={content.footer.copyrightText} onChange={e => handleFooterChange('copyrightText', e.target.value)} />
                        <FormField label="Disclaimer Text" value={content.footer.footerDisclaimer} onChange={e => handleFooterChange('footerDisclaimer', e.target.value)} isTextarea/>
                    </Accordion>

                    <Accordion title="Page - Home">
                        <PageContentEditor pageKey="home" content={content.pages.home} onChange={handlePageContentChange} />
                        <FormField label="Briefing Section Title" value={content.pages.home.briefingTitle} onChange={e => handlePageContentChange('home', 'briefingTitle', e.target.value)} />
                        <FormField label="Resource Section Title" value={content.pages.home.resourceTitle} onChange={e => handlePageContentChange('home', 'resourceTitle', e.target.value)} />
                        <FormField label="Calendar Section Title" value={content.pages.home.calendarTitle} onChange={e => handlePageContentChange('home', 'calendarTitle', e.target.value)} />
                        <FormField label="Access Button Text" value={content.pages.home.accessButton} onChange={e => handlePageContentChange('home', 'accessButton', e.target.value)} />
                    </Accordion>
                    
                    <Accordion title="Page - News">
                        <PageContentEditor pageKey="news" content={content.pages.news} onChange={handlePageContentChange} />
                    </Accordion>
                    
                    <Accordion title="Page - CTU (Counter Terrorism Unit)">
                        <PageContentEditor pageKey="ctu" content={content.pages.ctu} onChange={handlePageContentChange} />
                        <FormField label="Mandate Title" value={content.pages.ctu.mandateTitle} onChange={e => handlePageContentChange('ctu', 'mandateTitle', e.target.value)} />
                        <FormField label="Mandate Text" value={content.pages.ctu.mandateText} onChange={e => handlePageContentChange('ctu', 'mandateText', e.target.value)} isTextarea />
                        <FormField label="Operations Title" value={content.pages.ctu.operationsTitle} onChange={e => handlePageContentChange('ctu', 'operationsTitle', e.target.value)} />
                        <FormField label="Operations List (one per line)" value={content.pages.ctu.operations.join('\n')} onChange={e => handlePageContentChange('ctu', 'operations', e.target.value.split('\n'))} isTextarea />
                        <FormField label="Note Text" value={content.pages.ctu.noteText} onChange={e => handlePageContentChange('ctu', 'noteText', e.target.value)} isTextarea />
                        <h4 className="text-lg font-bold text-white mt-4 mb-2">Application Form</h4>
                        <FormField label="Form Title" value={content.pages.ctu.formTitle} onChange={e => handlePageContentChange('ctu', 'formTitle', e.target.value)} />
                        <FormField label="Form Description" value={content.pages.ctu.formDescription} onChange={e => handlePageContentChange('ctu', 'formDescription', e.target.value)} isTextarea />
                        <FormField label="Name Label" value={content.pages.ctu.form.nameLabel} onChange={e => handleFormContentChange('ctu', 'nameLabel', e.target.value)} />
                        <FormField label="Email Label" value={content.pages.ctu.form.emailLabel} onChange={e => handleFormContentChange('ctu', 'emailLabel', e.target.value)} />
                        <FormField label="Statement Label" value={content.pages.ctu.form.statementLabel} onChange={e => handleFormContentChange('ctu', 'statementLabel', e.target.value)} />
                        <FormField label="Submit Button Text" value={content.pages.ctu.form.submitButton} onChange={e => handleFormContentChange('ctu', 'submitButton', e.target.value)} />
                        <FormField label="Submitting Button Text" value={content.pages.ctu.form.submittingButton} onChange={e => handleFormContentChange('ctu', 'submittingButton', e.target.value)} />
                    </Accordion>

                    <Accordion title="Page - AHTU (Anti-Human Trafficking Unit)">
                        <PageContentEditor pageKey="ahtu" content={content.pages.ahtu} onChange={handlePageContentChange} />
                        <FormField label="Mandate Title" value={content.pages.ahtu.mandateTitle} onChange={e => handlePageContentChange('ahtu', 'mandateTitle', e.target.value)} />
                        <FormField label="Mandate Text" value={content.pages.ahtu.mandateText} onChange={e => handlePageContentChange('ahtu', 'mandateText', e.target.value)} isTextarea />
                        <FormField label="Operations Title" value={content.pages.ahtu.operationsTitle} onChange={e => handlePageContentChange('ahtu', 'operationsTitle', e.target.value)} />
                        <FormField label="Operations List (one per line)" value={content.pages.ahtu.operations.join('\n')} onChange={e => handlePageContentChange('ahtu', 'operations', e.target.value.split('\n'))} isTextarea />
                        <FormField label="Note Text" value={content.pages.ahtu.noteText} onChange={e => handlePageContentChange('ahtu', 'noteText', e.target.value)} isTextarea />
                        <h4 className="text-lg font-bold text-white mt-4 mb-2">Application Form</h4>
                        <FormField label="Form Title" value={content.pages.ahtu.formTitle} onChange={e => handlePageContentChange('ahtu', 'formTitle', e.target.value)} />
                        <FormField label="Form Description" value={content.pages.ahtu.formDescription} onChange={e => handlePageContentChange('ahtu', 'formDescription', e.target.value)} isTextarea />
                        <FormField label="Name Label" value={content.pages.ahtu.form.nameLabel} onChange={e => handleFormContentChange('ahtu', 'nameLabel', e.target.value)} />
                        <FormField label="Email Label" value={content.pages.ahtu.form.emailLabel} onChange={e => handleFormContentChange('ahtu', 'emailLabel', e.target.value)} />
                        <FormField label="Statement Label" value={content.pages.ahtu.form.statementLabel} onChange={e => handleFormContentChange('ahtu', 'statementLabel', e.target.value)} />
                        <FormField label="Submit Button Text" value={content.pages.ahtu.form.submitButton} onChange={e => handleFormContentChange('ahtu', 'submitButton', e.target.value)} />
                        <FormField label="Submitting Button Text" value={content.pages.ahtu.form.submittingButton} onChange={e => handleFormContentChange('ahtu', 'submittingButton', e.target.value)} />
                    </Accordion>

                    <Accordion title="Page - Resources">
                        <PageContentEditor pageKey="resources" content={content.pages.resources} onChange={handlePageContentChange} />
                         <h4 className="text-lg font-bold text-white mt-4 mb-2">Submission Form</h4>
                        <FormField label="Form Title" value={content.pages.resources.formTitle} onChange={e => handlePageContentChange('resources', 'formTitle', e.target.value)} />
                        <FormField label="Form Description" value={content.pages.resources.formDescription} onChange={e => handlePageContentChange('resources', 'formDescription', e.target.value)} isTextarea />
                        <FormField label="Name Label" value={content.pages.resources.form.nameLabel} onChange={e => handleFormContentChange('resources', 'nameLabel', e.target.value)} />
                        <FormField label="URL Label" value={content.pages.resources.form.urlLabel} onChange={e => handleFormContentChange('resources', 'urlLabel', e.target.value)} />
                        <FormField label="Type Label" value={content.pages.resources.form.typeLabel} onChange={e => handleFormContentChange('resources', 'typeLabel', e.target.value)} />
                        <FormField label="Description Label" value={content.pages.resources.form.descLabel} onChange={e => handleFormContentChange('resources', 'descLabel', e.target.value)} />
                        <FormField label="Submit Button Text" value={content.pages.resources.form.submitButton} onChange={e => handleFormContentChange('resources', 'submitButton', e.target.value)} />
                        <FormField label="Submitting Button Text" value={content.pages.resources.form.submittingButton} onChange={e => handleFormContentChange('resources', 'submittingButton', e.target.value)} />
                    </Accordion>
                    
                    <Accordion title="Page - Learn, OPSEC, About">
                         <h4 className="text-lg font-bold text-white mt-4 mb-2">Learn Page</h4>
                        <PageContentEditor pageKey="learn" content={content.pages.learn} onChange={handlePageContentChange} />
                        <h4 className="text-lg font-bold text-white mt-4 mb-2">OPSEC Page</h4>
                        <PageContentEditor pageKey="opsec" content={content.pages.opsec} onChange={handlePageContentChange} />
                        <h4 className="text-lg font-bold text-white mt-4 mb-2">About Page</h4>
                        <PageContentEditor pageKey="about" content={content.pages.about} onChange={handlePageContentChange} />
                    </Accordion>

                     <Accordion title="Page - Donate">
                        <PageContentEditor pageKey="donate" content={content.pages.donate} onChange={handlePageContentChange} />
                        <FormField label="Independence Title" value={content.pages.donate.independenceTitle} onChange={e => handlePageContentChange('donate', 'independenceTitle', e.target.value)} />
                        <FormField label="Independence Text" value={content.pages.donate.independenceText} onChange={e => handlePageContentChange('donate', 'independenceText', e.target.value)} isTextarea />
                        <FormField label="Warning Text" value={content.pages.donate.warningText} onChange={e => handlePageContentChange('donate', 'warningText', e.target.value)} isTextarea />
                        <h4 className="text-lg font-bold text-white mt-4 mb-2">Crypto Wallets</h4>
                        {content.pages.donate.wallets.map((wallet, index) => (
                            <div key={wallet.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                                <input type="text" value={wallet.name} readOnly className="md:col-span-1 bg-gosid-navy-light p-2 rounded border border-gosid-gray/50 text-gosid-gray" />
                                <input type="text" value={wallet.address} onChange={e => {
                                    const newWallets = [...content.pages.donate.wallets];
                                    newWallets[index].address = e.target.value;
                                    handlePageContentChange('donate', 'wallets', newWallets);
                                }} className="md:col-span-2 bg-gosid-navy p-2 rounded border border-gosid-gray/50 text-white" />
                            </div>
                        ))}
                    </Accordion>

                     <Accordion title="Page - Report">
                        <PageContentEditor pageKey="report" content={content.pages.report} onChange={handlePageContentChange} />
                        <FormField label="Protocol Title" value={content.pages.report.protocolTitle} onChange={e => handlePageContentChange('report', 'protocolTitle', e.target.value)} />
                        <FormField label="Protocol Description" value={content.pages.report.protocolDescription} onChange={e => handlePageContentChange('report', 'protocolDescription', e.target.value)} isTextarea />
                        <FormField label="Safety Warning" value={content.pages.report.safetyWarning} onChange={e => handlePageContentChange('report', 'safetyWarning', e.target.value)} isTextarea />
                        <h4 className="text-lg font-bold text-white mt-4 mb-2">Report Form</h4>
                        <FormField label="Nature Label" value={content.pages.report.form.natureLabel} onChange={e => handleFormContentChange('report', 'natureLabel', e.target.value)} />
                        <FormField label="Summary Label" value={content.pages.report.form.summaryLabel} onChange={e => handleFormContentChange('report', 'summaryLabel', e.target.value)} />
                        <FormField label="Summary Placeholder" value={content.pages.report.form.summaryPlaceholder} onChange={e => handleFormContentChange('report', 'summaryPlaceholder', e.target.value)} />
                        <FormField label="Links Label" value={content.pages.report.form.linksLabel} onChange={e => handleFormContentChange('report', 'linksLabel', e.target.value)} />
                        <FormField label="Links Placeholder" value={content.pages.report.form.linksPlaceholder} onChange={e => handleFormContentChange('report', 'linksPlaceholder', e.target.value)} />
                        <FormField label="Contact Label" value={content.pages.report.form.contactLabel} onChange={e => handleFormContentChange('report', 'contactLabel', e.target.value)} />
                        <FormField label="Contact Placeholder" value={content.pages.report.form.contactPlaceholder} onChange={e => handleFormContentChange('report', 'contactPlaceholder', e.target.value)} />
                        <FormField label="Submit Button Text" value={content.pages.report.form.submitButton} onChange={e => handleFormContentChange('report', 'submitButton', e.target.value)} />
                        <FormField label="Submitting Button Text" value={content.pages.report.form.submittingButton} onChange={e => handleFormContentChange('report', 'submittingButton', e.target.value)} />
                    </Accordion>

                     <Accordion title="Page - Contact">
                        <PageContentEditor pageKey="contact" content={content.pages.contact} onChange={handlePageContentChange} />
                        <FormField label="Form Title" value={content.pages.contact.formTitle} onChange={e => handlePageContentChange('contact', 'formTitle', e.target.value)} />
                        <FormField label="Form Description" value={content.pages.contact.formDescription} onChange={e => handlePageContentChange('contact', 'formDescription', e.target.value)} isTextarea />
                        <FormField label="Name Label" value={content.pages.contact.form.nameLabel} onChange={e => handleFormContentChange('contact', 'nameLabel', e.target.value)} />
                        <FormField label="Email Label" value={content.pages.contact.form.emailLabel} onChange={e => handleFormContentChange('contact', 'emailLabel', e.target.value)} />
                        <FormField label="Message Label" value={content.pages.contact.form.messageLabel} onChange={e => handleFormContentChange('contact', 'messageLabel', e.target.value)} />
                        <FormField label="Submit Button" value={content.pages.contact.form.submitButton} onChange={e => handleFormContentChange('contact', 'submitButton', e.target.value)} />
                        <h4 className="text-lg font-bold text-white mt-4 mb-2">Channels</h4>
                        <FormField label="Channels Title" value={content.pages.contact.channelsTitle} onChange={e => handlePageContentChange('contact', 'channelsTitle', e.target.value)} />
                        <FormField label="Channels Description" value={content.pages.contact.channelsDescription} onChange={e => handlePageContentChange('contact', 'channelsDescription', e.target.value)} isTextarea />
                        {content.pages.contact.channels.map((channel, index) => (
                             <div key={channel.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                                <input type="text" value={channel.platform} onChange={e => {
                                    const newChannels = [...content.pages.contact.channels];
                                    newChannels[index].platform = e.target.value;
                                    handlePageContentChange('contact', 'channels', newChannels);
                                }} className="md:col-span-1 bg-gosid-navy p-2 rounded border border-gosid-gray/50 text-white" />
                                <input type="text" value={channel.handle} onChange={e => {
                                    const newChannels = [...content.pages.contact.channels];
                                    newChannels[index].handle = e.target.value;
                                    handlePageContentChange('contact', 'channels', newChannels);
                                }} className="md:col-span-1 bg-gosid-navy p-2 rounded border border-gosid-gray/50 text-white" />
                                <input type="text" value={channel.link} onChange={e => {
                                    const newChannels = [...content.pages.contact.channels];
                                    newChannels[index].link = e.target.value;
                                    handlePageContentChange('contact', 'channels', newChannels);
                                }} className="md:col-span-1 bg-gosid-navy p-2 rounded border border-gosid-gray/50 text-white" />
                            </div>
                        ))}
                        <FormField label="Warning Title" value={content.pages.contact.warningTitle} onChange={e => handlePageContentChange('contact', 'warningTitle', e.target.value)} />
                        <FormField label="Warning Text" value={content.pages.contact.warningText} onChange={e => handlePageContentChange('contact', 'warningText', e.target.value)} isTextarea />
                    </Accordion>
                    
                    <Accordion title="Page - Login">
                        <PageContentEditor pageKey="login" content={content.pages.login} onChange={handlePageContentChange} />
                        <FormField label="Form Title" value={content.pages.login.formTitle} onChange={e => handlePageContentChange('login', 'formTitle', e.target.value)} />
                        <FormField label="Agent ID Label" value={content.pages.login.agentIdLabel} onChange={e => handlePageContentChange('login', 'agentIdLabel', e.target.value)} />
                        <FormField label="Password Label" value={content.pages.login.passwordLabel} onChange={e => handlePageContentChange('login', 'passwordLabel', e.target.value)} />
                        <FormField label="Role Label" value={content.pages.login.roleLabel} onChange={e => handlePageContentChange('login', 'roleLabel', e.target.value)} />
                        <FormField label="Submit Button" value={content.pages.login.submitButton} onChange={e => handlePageContentChange('login', 'submitButton', e.target.value)} />
                    </Accordion>


                    <div className="text-right pt-4">
                        <Button onClick={handleSave}>Save ALL Site Content</Button>
                        {status && <p className="text-sm text-gosid-gold mt-4 text-right">{status}</p>}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ManageSystem;