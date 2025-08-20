import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import { CogIcon, KeyIcon } from '../icons/Icons';
import { useAuth } from '../../contexts/AuthContext';

const OwnerDashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div>
            <PageTitle title="Owner Control Panel" subtitle={`Highest-level access | Role: ${user?.role}`} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="flex flex-col transition-all duration-300 hover:shadow-gosid-gold/10 hover:border-gosid-gold/30">
                    <div className="p-6 flex-grow">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1"><CogIcon className="h-8 w-8 text-gosid-gold" /></div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Admin Dashboard</h3>
                                <p className="text-gosid-light text-sm">Access the standard administrative panel for daily content management (news, reports, applications, etc.).</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gosid-navy-light/50 px-6 py-3 mt-auto">
                        <Link to="/admin/dashboard" className="font-semibold text-gosid-gold hover:text-white transition-colors duration-200">
                            Go to Admin Panel &rarr;
                        </Link>
                    </div>
                </Card>
                <Card className="flex flex-col transition-all duration-300 hover:shadow-gosid-gold/10 hover:border-gosid-gold/30 border-gosid-gold/50">
                    <div className="p-6 flex-grow">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1"><KeyIcon className="h-8 w-8 text-gosid-gold" /></div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">System & Site Configuration</h3>
                                <p className="text-gosid-light text-sm">Manage global settings and edit all core site text content, from header navigation to footer disclaimers.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gosid-navy-light/50 px-6 py-3 mt-auto">
                        <Link to="/owner/system" className="font-semibold text-gosid-gold hover:text-white transition-colors duration-200">
                            Manage System &rarr;
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default OwnerDashboard;
