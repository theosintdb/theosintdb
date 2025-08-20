
import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import { NewspaperIcon, UsersIcon, CogIcon, InboxIcon, DocumentChartBarIcon, PresentationChartLineIcon, AcademicCapIcon } from '../icons/Icons';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardCardProps {
    title: string;
    description: string;
    link: string;
    icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, link, icon }) => (
    <Card className="flex flex-col transition-all duration-300 hover:shadow-gosid-gold/10 hover:border-gosid-gold/30">
        <div className="p-6 flex-grow">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">{icon}</div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-gosid-light text-sm">{description}</p>
                </div>
            </div>
        </div>
        <div className="bg-gosid-navy-light/50 px-6 py-3 mt-auto">
            <Link to={link} className="font-semibold text-gosid-gold hover:text-white transition-colors duration-200">
                Manage &rarr;
            </Link>
        </div>
    </Card>
);

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();

    const adminSections: DashboardCardProps[] = [
        {
            title: 'Homepage Content',
            description: "Update the Director's Briefing, Field Resource Highlight, and Operational Calendar.",
            link: '/admin/homepage',
            icon: <PresentationChartLineIcon className="h-8 w-8 text-gosid-gold" />,
        },
        {
            title: 'News Bulletins',
            description: 'Create, edit, and publish new intelligence bulletins for the News page.',
            link: '/admin/news',
            icon: <NewspaperIcon className="h-8 w-8 text-gosid-gold" />,
        },
        {
            title: 'Resource Database',
            description: 'Approve, edit, or deny user-submitted resources for the TGOSID-R page.',
            link: '/admin/resources',
            icon: <DocumentChartBarIcon className="h-8 w-8 text-gosid-gold" />,
        },
        {
            title: 'Unit Applications',
            description: 'Review and vet membership applications for the CTU and AHTU specialized units.',
            link: '/admin/applications',
            icon: <UsersIcon className="h-8 w-8 text-gosid-gold" />,
        },
        {
            title: 'Incoming Reports',
            description: 'Triage and analyze intelligence reports submitted through the secure intake channel.',
            link: '/admin/reports',
            icon: <InboxIcon className="h-8 w-8 text-gosid-gold" />,
        },
        {
            title: 'Core Page Content',
            description: 'Manage text content on pages like About and OPSEC principles.',
            link: '/admin/core-pages',
            icon: <CogIcon className="h-8 w-8 text-gosid-gold" />,
        },
        {
            title: 'Training Materials',
            description: 'Manage the guides, videos, and tutorials available on the Learn page.',
            link: '/admin/training',
            icon: <AcademicCapIcon className="h-8 w-8 text-gosid-gold" />,
        },
    ];


    return (
        <div>
            <PageTitle title="Admin Control Panel" subtitle={`GOSID Management | Role: ${user?.role}`} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminSections.map(section => (
                    <DashboardCard key={section.title} {...section} />
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;