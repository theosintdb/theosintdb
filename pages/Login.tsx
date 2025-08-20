
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import Button from '../components/Button';
import { LockClosedIcon } from './icons/Icons';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { siteContent } = useContent();
    const pageText = siteContent.pages.login;
    const [selectedRole, setSelectedRole] = useState<UserRole>('Admin');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const username = (form.querySelector('#agent-id') as HTMLInputElement).value;
        const password = (form.querySelector('#password') as HTMLInputElement).value;
        try {
            const role = await login(username, password);
            if (role === 'Owner') {
                navigate('/owner/dashboard');
            } else {
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setError('Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <PageTitle title={pageText.title} subtitle={pageText.subtitle} />
            <div className="max-w-md mx-auto">
                <Card>
                    <div className="p-8">
                        <div className="text-center mb-6">
                            <LockClosedIcon className="h-12 w-12 text-gosid-gold mx-auto mb-2" />
                            <h2 className="text-2xl font-semibold text-gosid-gold">{pageText.formTitle}</h2>
                        </div>
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="agent-id" className="block text-sm font-medium text-gosid-gray">{pageText.agentIdLabel}</label>
                                <input type="text" id="agent-id" required className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold" placeholder="username" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gosid-gray">{pageText.passwordLabel}</label>
                                <input type="password" id="password" required className="mt-1 block w-full bg-gosid-navy border border-gosid-gray/50 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-gosid-gold focus:border-gosid-gold" placeholder="password" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gosid-gray mb-2">{pageText.roleLabel}</label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center">
                                        <input type="radio" name="role" value="Admin" checked={selectedRole === 'Admin'} onChange={() => setSelectedRole('Admin')} className="h-4 w-4 bg-gosid-navy border-gosid-gray/50 text-gosid-gold focus:ring-gosid-gold" />
                                        <span className="ml-2 text-white">Admin</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="role" value="Owner" checked={selectedRole === 'Owner'} onChange={() => setSelectedRole('Owner')} className="h-4 w-4 bg-gosid-navy border-gosid-gold/50 text-gosid-gold focus:ring-gosid-gold" />
                                        <span className="ml-2 text-white">Owner</span>
                                    </label>
                                </div>
                            </div>
                            <div className="pt-2">
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? 'Authenticating...' : pageText.submitButton}
                                </Button>
                                {error && <p className="text-red-400 text-center mt-2 text-sm">{error}</p>}
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;