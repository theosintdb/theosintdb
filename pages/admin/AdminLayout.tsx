
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { NewspaperIcon, UsersIcon, CogIcon, InboxIcon, DocumentChartBarIcon, PresentationChartLineIcon, KeyIcon, AcademicCapIcon } from '../icons/Icons';

const AdminLayout: React.FC = () => {
    const { user } = useAuth();

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <PresentationChartLineIcon className="h-5 w-5 mr-3" />, roles: ['Admin', 'Owner'] },
        { name: 'Homepage', path: '/admin/homepage', icon: <PresentationChartLineIcon className="h-5 w-5 mr-3" />, roles: ['Admin', 'Owner'] },
        { name: 'News Bulletins', path: '/admin/news', icon: <NewspaperIcon className="h-5 w-5 mr-3" />, roles: ['Admin', 'Owner'] },
        { name: 'Resources', path: '/admin/resources', icon: <DocumentChartBarIcon className="h-5 w-5 mr-3" />, roles: ['Admin', 'Owner'] },
        { name: 'Training', path: '/admin/training', icon: <AcademicCapIcon className="h-5 w-5 mr-3" />, roles: ['Admin', 'Owner'] },
        { name: 'Applications', path: '/admin/applications', icon: <UsersIcon className="h-5 w-5 mr-3" />, roles: ['Admin', 'Owner'] },
        { name: 'Reports', path: '/admin/reports', icon: <InboxIcon className="h-5 w-5 mr-3" />, roles: ['Admin', 'Owner'] },
        { name: 'Core Pages', path: '/admin/core-pages', icon: <CogIcon className="h-5 w-5 mr-3" />, roles: ['Admin', 'Owner'] },
    ];
    
    const accessibleNavItems = navItems.filter(item => user && item.roles.includes(user.role));

    return (
        <div className="flex flex-col md:flex-row gap-8 flex-1">
            <aside className="md:w-64 flex-shrink-0">
                <div className="bg-gosid-navy-light rounded-lg p-4">
                    <h2 className="text-lg font-bold text-white mb-4">Admin Menu</h2>
                    <nav className="space-y-1">
                        {accessibleNavItems.map(item => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path.endsWith('dashboard')}
                                className={({ isActive }) =>
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
                                        ? 'bg-gosid-gold text-gosid-navy'
                                        : 'text-gosid-light hover:bg-gosid-navy hover:text-white'
                                    }`
                                }
                            >
                                {item.icon}
                                {item.name}
                            </NavLink>
                        ))}
                         {user?.role === 'Owner' && (
                             <NavLink
                                to="/owner/dashboard"
                                className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 mt-4 bg-gosid-gold/10 text-gosid-gold hover:bg-gosid-gold hover:text-gosid-navy"
                            >
                                <KeyIcon className="h-5 w-5 mr-3" />
                                Owner Panel
                            </NavLink>
                         )}
                    </nav>
                </div>
            </aside>
            <div className="flex-grow min-w-0">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;