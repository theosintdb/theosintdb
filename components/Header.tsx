import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { LogoutIcon } from '../pages/icons/Icons';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `block md:inline-block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive
                    ? 'bg-gosid-gold text-gosid-navy'
                    : 'text-gosid-light hover:bg-gosid-navy-light hover:text-white'
                }`
            }
        >
            {children}
        </NavLink>
    );
};

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const { siteContent } = useContent();
    const navigate = useNavigate();

    const { header } = siteContent;
    const { siteTitle, siteSubtitle, loginButton, primaryLinks, secondaryLinks } = header;

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    const allLinks = [...primaryLinks, ...secondaryLinks];

    return (
        <header className="bg-gosid-navy-light border-b-2 border-gosid-gold">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-24">
                    <NavLink to="/" className="flex items-center flex-shrink-0">
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold text-white tracking-wider">{siteTitle}</h1>
                            <p className="text-xs text-gosid-gray tracking-wider uppercase">{siteSubtitle}</p>
                        </div>
                    </NavLink>
                    
                    <div> {/* Wrapper for right-side items */}
                        <div className="hidden md:flex items-center">
                            <nav className="ml-10 flex items-baseline space-x-1">
                                {primaryLinks.map(link => <NavItem key={link.id} to={link.path}>{link.name}</NavItem>)}
                            </nav>
                            {user ? (
                                <div className="ml-4 flex items-center">
                                    <div className="text-right mr-3">
                                        <p className="text-sm font-medium text-white">Authenticated Agent</p>
                                        <p className="text-xs font-bold text-gosid-gold">{user.role}</p>
                                    </div>
                                    <button onClick={handleLogout} className="p-2 rounded-full text-gosid-gray hover:bg-gosid-navy hover:text-white transition-colors duration-200" aria-label="Logout">
                                        <LogoutIcon className="h-6 w-6" />
                                    </button>
                                </div>
                            ) : (
                                <NavLink to="/login" className="ml-4 px-4 py-2 rounded-md text-sm font-bold bg-gosid-gold text-gosid-navy hover:bg-gosid-gold-dark transition-colors duration-200">
                                    {loginButton}
                                </NavLink>
                            )}
                        </div>
                         <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gosid-gray hover:text-white hover:bg-gosid-navy-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gosid-navy-light focus:ring-white">
                                <span className="sr-only">Open main menu</span>
                                <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                 <div className="hidden md:block border-t border-gosid-navy-light/50">
                     <nav className="flex items-baseline space-x-1 py-2 justify-center">
                         {secondaryLinks.map(link => <NavItem key={link.id} to={link.path}>{link.name}</NavItem>)}
                     </nav>
                 </div>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {allLinks.map(link => <NavItem key={link.id} to={link.path}>{link.name}</NavItem>)}
                     <div className="mt-4 pt-4 border-t border-gosid-gray/20">
                        {user ? (
                             <div className="flex items-center justify-between px-3">
                                <div>
                                    <p className="text-sm font-bold text-white">AGENT: {user.role.toUpperCase()}</p>
                                    <p className="text-xs text-gosid-gold">{user.role}</p>
                                </div>
                                <button onClick={handleLogout} className="p-2 rounded-md text-gosid-gray hover:bg-gosid-navy hover:text-white transition-colors duration-200" aria-label="Logout">
                                    <LogoutIcon className="h-6 w-6" /> Logout
                                </button>
                            </div>
                        ) : (
                            <NavItem to="/login">{loginButton}</NavItem>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;