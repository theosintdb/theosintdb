
import React from 'react';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useContent } from '../../contexts/ContentContext';

const ManageResources: React.FC = () => {
    const { resources, updateResourceStatus, deleteResource } = useContent();

    return (
        <div>
            <PageTitle title="Manage Resources" subtitle="Review and approve user-submitted OSINT tools and guides." />
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gosid-navy">
                            <tr>
                                <th className="p-4 font-semibold">Title</th>
                                <th className="p-4 font-semibold">Type</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resources.map(resource => (
                                <tr key={resource.id} className="border-t border-gosid-navy">
                                    <td className="p-4">
                                        <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gosid-gold hover:underline">{resource.title}</a>
                                        <p className="text-xs text-gosid-gray mt-1">{resource.description}</p>
                                    </td>
                                    <td className="p-4">{resource.type}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${resource.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                            {resource.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            {resource.status === 'pending' && (
                                                <Button onClick={() => updateResourceStatus(resource.id, 'approved')} className="px-3 py-1 text-sm border-green-500/50 text-green-500/80 hover:bg-green-500 hover:text-white">Approve</Button>
                                            )}
                                            <Button onClick={() => deleteResource(resource.id)} className="px-3 py-1 text-sm border-red-500/50 text-red-500/80 hover:bg-red-500 hover:text-white">Delete</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ManageResources;
