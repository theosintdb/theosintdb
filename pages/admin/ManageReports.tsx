
import React from 'react';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useContent } from '../../contexts/ContentContext';

const ManageReports: React.FC = () => {
    const { reports, updateReportStatus } = useContent();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'under_review': return 'bg-blue-500/20 text-blue-400';
            case 'archived': return 'bg-gray-500/20 text-gray-400';
            default: return 'bg-yellow-500/20 text-yellow-400';
        }
    };
    
    return (
        <div>
            <PageTitle title="Triage Incoming Reports" subtitle="Analyze and manage securely submitted intelligence." />
            <div className="space-y-4">
                {reports.length > 0 ? (
                    reports.map(report => (
                        <Card key={report.id}>
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{report.type}</h3>
                                        <p className="text-sm text-gosid-gray">Submitted: {new Date(report.submittedAt).toLocaleString()}</p>
                                        {report.contact && <p className="text-sm text-gosid-gray">Contact: {report.contact}</p>}
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                                        {report.status}
                                    </span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gosid-navy">
                                    <h4 className="font-semibold text-gosid-gold">Summary:</h4>
                                    <p className="text-gosid-light whitespace-pre-wrap">{report.summary}</p>
                                    
                                    {report.links && (
                                        <>
                                            <h4 className="font-semibold text-gosid-gold mt-4">Links:</h4>
                                            <p className="text-gosid-light whitespace-pre-wrap font-mono text-sm">{report.links}</p>
                                        </>
                                    )}
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    {report.status === 'new' && (
                                         <Button onClick={() => updateReportStatus(report.id, 'under_review')} className="px-3 py-1 text-sm border-blue-500/50 text-blue-500/80 hover:bg-blue-500 hover:text-white">Mark as Under Review</Button>
                                    )}
                                     {report.status !== 'archived' && (
                                        <Button onClick={() => updateReportStatus(report.id, 'archived')} className="px-3 py-1 text-sm border-gray-500/50 text-gray-500/80 hover:bg-gray-500 hover:text-white">Archive</Button>
                                     )}
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Card><div className="p-6 text-center text-gosid-gray">No reports in the triage queue.</div></Card>
                )}
            </div>
        </div>
    );
};

export default ManageReports;
