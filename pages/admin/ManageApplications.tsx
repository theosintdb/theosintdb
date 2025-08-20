
import React from 'react';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useContent } from '../../contexts/ContentContext';

const ManageApplications: React.FC = () => {
    const { applications, updateApplicationStatus } = useContent();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-500/20 text-green-400';
            case 'rejected': return 'bg-red-500/20 text-red-400';
            default: return 'bg-yellow-500/20 text-yellow-400';
        }
    };

    return (
        <div>
            <PageTitle title="Manage Unit Applications" subtitle="Vet and process applications for CTU and AHTU." />
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gosid-navy">
                            <tr>
                                <th className="p-4 font-semibold">Applicant / Unit</th>
                                <th className="p-4 font-semibold">Statement</th>
                                <th className="p-4 font-semibold">Submitted</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map(app => (
                                <tr key={app.id} className="border-t border-gosid-navy">
                                    <td className="p-4">
                                        <p className="font-bold text-white">{app.name} ({app.unit})</p>
                                        <p className="text-xs text-gosid-gray">{app.email}</p>
                                    </td>
                                    <td className="p-4 text-sm text-gosid-light max-w-sm">{app.statement}</td>
                                    <td className="p-4 text-sm">{new Date(app.submittedAt).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {app.status === 'pending' && (
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <Button onClick={() => updateApplicationStatus(app.id, 'approved')} className="px-3 py-1 text-sm border-green-500/50 text-green-500/80 hover:bg-green-500 hover:text-white">Approve</Button>
                                                <Button onClick={() => updateApplicationStatus(app.id, 'rejected')} className="px-3 py-1 text-sm border-red-500/50 text-red-500/80 hover:bg-red-500 hover:text-white">Reject</Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {applications.length === 0 && <div className="p-6 text-center text-gosid-gray">No applications pending review.</div>}
                </div>
            </Card>
        </div>
    );
};

export default ManageApplications;
