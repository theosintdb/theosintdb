
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { PresentationChartLineIcon, KeyIcon } from '../icons/Icons';

const OwnerLayout: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Owner Dashboard', path: '/owner/dashboard', icon: <PresentationChartLineIcon className="h-5 w-5 mr-3" /> },
        { name: 'System Config', path: '/owner/system', icon: <KeyIcon className="h-5 w-5 mr-3" /> },
    ];
    
    return (
        <div className="flex flex-col md:flex-row gap-8 flex-1">
            <aside className="md:w-64 flex-shrink-0">
                <div className="bg-gosid-navy-light rounded-lg p-4 border-2 border-gosid-gold">
                    <h2 className="text-lg font-bold text-gosid-gold mb-4">Owner Panel</h2>
                    <nav className="space-y-1">
                        {navItems.map(item => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                // use location to check for dashboard to avoid active style on parent route
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
                         <NavLink
                            to="/admin/dashboard"
                            className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 mt-4 bg-gosid-navy hover:text-white"
                        >
                            &larr; Back to Admin
                        </NavLink>
                    </nav>
                </div>
            </aside>
            <div className="flex-grow min-w-0">
                <Outlet />
            </div>
        </div>
    );
};

export default OwnerLayout;