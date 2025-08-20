
import React, { useState } from 'react';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useContent } from '../../contexts/ContentContext';
import { NewsArticle } from '../../types';

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

const ManageNews: React.FC = () => {
    const { newsArticles, addNewsArticle, updateNewsArticle, deleteNewsArticle } = useContent();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<NewsArticle | Omit<NewsArticle, 'id'> | null>(null);
    const [status, setStatus] = useState('');

    const openModalForNew = () => {
        setEditingArticle({ title: '', date: new Date().toISOString().split('T')[0], category: '', summary: '', imageUrl: '' });
        setIsModalOpen(true);
    };

    const openModalForEdit = (article: NewsArticle) => {
        setEditingArticle(article);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditingArticle(null);
        setIsModalOpen(false);
    };

    const handleSave = async () => {
        if (!editingArticle) return;
        if ('id' in editingArticle) {
            await updateNewsArticle(editingArticle);
            setStatus(`Article "${editingArticle.title}" updated.`);
        } else {
            await addNewsArticle(editingArticle);
             setStatus(`Article "${editingArticle.title}" created.`);
        }
        closeModal();
        setTimeout(() => setStatus(''), 3000);
    };
    
    const handleDelete = async (id: number) => {
        if(window.confirm("Are you sure you want to delete this article?")) {
            const articleTitle = newsArticles.find(a => a.id === id)?.title;
            await deleteNewsArticle(id);
            setStatus(`Article "${articleTitle}" deleted.`);
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return (
        <div>
            <PageTitle title="Manage News Bulletins" subtitle="Create, edit, and publish intelligence bulletins." />
            <div className="flex justify-end mb-4">
                <Button onClick={openModalForNew}>Add New Bulletin</Button>
            </div>
             {status && <p className="text-sm text-gosid-gold mb-4 text-right">{status}</p>}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gosid-navy">
                            <tr>
                                <th className="p-4 font-semibold">Title</th>
                                <th className="p-4 font-semibold">Category</th>
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newsArticles.map(article => (
                                <tr key={article.id} className="border-t border-gosid-navy">
                                    <td className="p-4">{article.title}</td>
                                    <td className="p-4">{article.category}</td>
                                    <td className="p-4">{article.date}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <Button onClick={() => openModalForEdit(article)} className="px-3 py-1 text-sm">Edit</Button>
                                            <Button onClick={() => handleDelete(article.id)} className="px-3 py-1 text-sm border-red-500/50 text-red-500/80 hover:bg-red-500 hover:text-white">Delete</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={editingArticle && 'id' in editingArticle ? 'Edit Bulletin' : 'Create Bulletin'}>
                {editingArticle && (
                    <div className="space-y-4">
                        <input type="text" placeholder="Title" value={editingArticle.title} onChange={e => setEditingArticle({...editingArticle, title: e.target.value})} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50"/>
                        <input type="text" placeholder="Category" value={editingArticle.category} onChange={e => setEditingArticle({...editingArticle, category: e.target.value})} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50"/>
                        <input type="date" value={editingArticle.date} onChange={e => setEditingArticle({...editingArticle, date: e.target.value})} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50"/>
                        <input type="url" placeholder="Image URL (Optional)" value={editingArticle.imageUrl || ''} onChange={e => setEditingArticle({...editingArticle, imageUrl: e.target.value})} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50"/>
                        <textarea rows={6} placeholder="Summary" value={editingArticle.summary} onChange={e => setEditingArticle({...editingArticle, summary: e.target.value})} className="w-full bg-gosid-navy p-2 rounded border border-gosid-gray/50"></textarea>
                        <div className="flex justify-end gap-4">
                            <Button onClick={closeModal} className="border-gosid-gray/50 text-gosid-gray/80 hover:bg-gosid-gray hover:text-gosid-navy">Cancel</Button>
                            <Button onClick={handleSave}>Save Bulletin</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ManageNews;