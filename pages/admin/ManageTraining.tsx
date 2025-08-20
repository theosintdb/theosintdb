import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useContent } from '../../contexts/ContentContext';
import { TrainingMaterial } from '../../types';

// Simple Modal Component
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-gosid-navy-light rounded-lg shadow-xl w-full max-w-2xl border-2 border-gosid-gold/50">
                <div className="p-6 border-b border-gosid-navy">
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

const ManageTraining: React.FC = () => {
    const { trainingMaterials, addTrainingMaterial, updateTrainingMaterial, deleteTrainingMaterial } = useContent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState<TrainingMaterial | Omit<TrainingMaterial, 'id'> | null>(null);

    const openModalForNew = () => {
        setEditingMaterial({ title: '', type: 'Guide', description: '', link: '', duration: '' });
        setIsModalOpen(true);
    };

    const openModalForEdit = (material: TrainingMaterial) => {
        setEditingMaterial(material);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingMaterial(null);
        setIsModalOpen(false);
    };

    const handleSave = async () => {
        if (!editingMaterial) return;
        if ('id' in editingMaterial) {
            await updateTrainingMaterial(editingMaterial);
        } else {
            await addTrainingMaterial(editingMaterial);
        }
        closeModal();
    };
    
    const handleDelete = async (id: number) => {
        if(window.confirm("Are you sure you want to delete this training material?")) {
            await deleteTrainingMaterial(id);
        }
    };

    const handleFieldChange = (field: keyof Omit<TrainingMaterial, 'id'>, value: string) => {
        if (editingMaterial) {
            setEditingMaterial({ ...editingMaterial, [field]: value });
        }
    };

    return (
        <div>
            <PageTitle title="Manage Training Materials" subtitle="Add, edit, or remove content from the Learn page." />
            <div className="flex justify-end mb-4">
                <Button onClick={openModalForNew}>Add New Material</Button>
            </div>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gosid-navy">
                            <tr>
                                <th className="p-4 font-semibold">Title</th>
                                <th className="p-4 font-semibold">Type</th>
                                <th className="p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainingMaterials.map(material => (
                                <tr key={material.id} className="border-t border-gosid-navy">
                                    <td className="p-4">{material.title}</td>
                                    <td className="p-4">{material.type}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <Button onClick={() => openModalForEdit(material)} className="px-3 py-1 text-sm">Edit</Button>
                                            <Button onClick={() => handleDelete(material.id)} className="px-3 py-1 text-sm border-red-500/50 text-red-500/80 hover:bg-red-500 hover:text-white">Delete</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingMaterial && 'id' in editingMaterial ? 'Edit Material' : 'Create Material'}>
                {editingMaterial && (
                    <div className="space-y-4">
                        <input type="text" placeholder="Title" value={editingMaterial.title} onChange={e => handleFieldChange('title', e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50"/>
                        <select value={editingMaterial.type} onChange={e => handleFieldChange('type', e.target.value as TrainingMaterial['type'])} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50">
                            <option>Guide</option>
                            <option>Tutorial</option>
                            <option>Video</option>
                        </select>
                         <input type="text" placeholder="Link" value={editingMaterial.link} onChange={e => handleFieldChange('link', e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50"/>
                         <input type="text" placeholder="Duration (e.g., 45 Min)" value={editingMaterial.duration || ''} onChange={e => handleFieldChange('duration', e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50"/>
                        <textarea rows={4} placeholder="Description" value={editingMaterial.description} onChange={e => handleFieldChange('description', e.target.value)} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50"></textarea>
                        <div className="flex justify-end gap-4">
                            <Button onClick={closeModal} className="border-gosid-gray/50 text-gosid-gray/80 hover:bg-gosid-gray hover:text-gosid-navy">Cancel</Button>
                            <Button onClick={handleSave}>Save Material</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ManageTraining;