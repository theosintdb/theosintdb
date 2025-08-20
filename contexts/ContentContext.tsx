
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { NewsArticle, Resource, TrainingMaterial, HomepageContent, CorePagesContent, SiteSettings, UnitApplication, IntelligenceReport, SiteContent } from '../types';
import * as api from '../services/client';
import { useAuth } from './AuthContext';


interface ContentContextType {
    loading: boolean;
    newsArticles: NewsArticle[];
    addNewsArticle: (article: Omit<NewsArticle, 'id'>) => Promise<void>;
    updateNewsArticle: (article: NewsArticle) => Promise<void>;
    deleteNewsArticle: (id: number) => Promise<void>;
    
    resources: Resource[];
    addResource: (resource: Omit<Resource, 'id' | 'status'>) => Promise<void>;
    updateResourceStatus: (id: number, status: 'approved') => Promise<void>;
    deleteResource: (id: number) => Promise<void>;
    
    trainingMaterials: TrainingMaterial[];
    addTrainingMaterial: (material: Omit<TrainingMaterial, 'id'>) => Promise<void>;
    updateTrainingMaterial: (material: TrainingMaterial) => Promise<void>;
    deleteTrainingMaterial: (id: number) => Promise<void>;
    
    homepageContent: HomepageContent;
    updateHomepageContent: (content: HomepageContent) => Promise<void>;
    
    corePagesContent: CorePagesContent;
    updateCorePagesContent: (content: CorePagesContent) => Promise<void>;

    settings: SiteSettings;
    updateSettings: (settings: SiteSettings) => Promise<void>;

    applications: UnitApplication[];
    addApplication: (app: Omit<UnitApplication, 'id' | 'status' | 'submittedAt'>) => Promise<void>;
    updateApplicationStatus: (id: number, status: 'approved' | 'rejected') => Promise<void>;

    reports: IntelligenceReport[];
    addReport: (report: Omit<IntelligenceReport, 'id' | 'status' | 'submittedAt'>) => Promise<void>;
    updateReportStatus: (id: number, status: 'under_review' | 'archived') => Promise<void>;

    siteContent: SiteContent;
    updateSiteContent: (content: SiteContent) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [resources, setResources] = useState<Resource[]>([]);
    const [trainingMaterials, setTrainingMaterials] = useState<TrainingMaterial[]>([]);
    const [homepageContent, setHomepageContent] = useState<HomepageContent>({ briefings: [], toolOfMonth: { name: '', description: '', link: '' }, calendarEvents: [] });
    const [corePagesContent, setCorePagesContent] = useState<CorePagesContent>({ about: { mission: '', structure: '', principles: [] }, opsec: { intro: '', principles: [] } });
    const [settings, setSettings] = useState<SiteSettings>({ maintenanceMode: false });
    const [applications, setApplications] = useState<UnitApplication[]>([]);
    const [reports, setReports] = useState<IntelligenceReport[]>([]);
    const [siteContent, setSiteContent] = useState<SiteContent>({} as SiteContent);

    useEffect(() => {
        const loadPublicData = async () => {
            setLoading(true);
            try {
                const [newsData, resourcesData, trainingData, homepageData, corePagesData, settingsData, siteContentData] = await Promise.all([
                    api.getNewsArticles(),
                    api.getResources(),
                    api.getTrainingMaterials(),
                    api.getHomepageContent(),
                    api.getCorePagesContent(),
                    api.getSiteSettings(),
                    api.getSiteContent(),
                ]);
                setNewsArticles(newsData);
                setResources(resourcesData);
                setTrainingMaterials(trainingData);
                setHomepageContent(homepageData);
                setCorePagesContent(corePagesData);
                setSettings(settingsData);
                setSiteContent(siteContentData);
            } finally {
                setLoading(false);
            }
        };
        loadPublicData();
    }, []);

    useEffect(() => {
        const loadProtected = async () => {
            if (!user) {
                setApplications([]);
                setReports([]);
                return;
            }
            try {
                const [applicationsData, reportsData] = await Promise.all([
                    api.getApplications(),
                    api.getReports(),
                ]);
                setApplications(applicationsData);
                setReports(reportsData);
            } catch {
                setApplications([]);
                setReports([]);
            }
        };
        loadProtected();
    }, [user]);

    const value: ContentContextType = {
        loading,
        newsArticles,
        addNewsArticle: async (article) => setNewsArticles(await api.addNewsArticle(article)),
        updateNewsArticle: async (article) => setNewsArticles(await api.updateNewsArticle(article)),
        deleteNewsArticle: async (id) => setNewsArticles(await api.deleteNewsArticle(id)),
        
        resources,
        addResource: async (resource) => setResources(await api.addResource(resource)),
        updateResourceStatus: async (id, status) => setResources(await api.updateResourceStatus(id, status)),
        deleteResource: async (id) => setResources(await api.deleteResource(id)),
        
        trainingMaterials,
        addTrainingMaterial: async (material) => setTrainingMaterials(await api.addTrainingMaterial(material)),
        updateTrainingMaterial: async (material) => setTrainingMaterials(await api.updateTrainingMaterial(material)),
        deleteTrainingMaterial: async (id) => setTrainingMaterials(await api.deleteTrainingMaterial(id)),
        
        homepageContent,
        updateHomepageContent: async (content) => setHomepageContent(await api.updateHomepageContent(content)),
        
        corePagesContent,
        updateCorePagesContent: async (content) => setCorePagesContent(await api.updateCorePagesContent(content)),

        settings,
        updateSettings: async (s) => setSettings(await api.updateSiteSettings(s)),

        applications,
        addApplication: async (app) => setApplications(await api.addApplication(app)),
        updateApplicationStatus: async (id, status) => setApplications(await api.updateApplicationStatus(id, status)),

        reports,
        addReport: async (report) => setReports(await api.addReport(report)),
        updateReportStatus: async (id, status) => setReports(await api.updateReportStatus(id, status)),

        siteContent,
        updateSiteContent: async (content) => setSiteContent(await api.updateSiteContent(content)),
    };

    return (
        <ContentContext.Provider value={value}>
            {loading ? <div className="min-h-screen flex items-center justify-center text-gosid-gold">Loading GOSID Platform...</div> : children}
        </ContentContext.Provider>
    );
};

export const useContent = (): ContentContextType => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};