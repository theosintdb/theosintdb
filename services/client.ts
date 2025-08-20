import { NewsArticle, Resource, TrainingMaterial, HomepageContent, CorePagesContent, SiteSettings, UnitApplication, IntelligenceReport, SiteContent } from '../types';

const API_BASE = '/api';
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
    authToken = token;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
    const res = await fetch(`${API_BASE}${path}`, { ...options, headers: { ...headers, ...(options.headers || {}) } });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
    }
    return res.json();
}

// GETTERS
export const getNewsArticles = async (): Promise<NewsArticle[]> => request<NewsArticle[]>('/news');
export const getResources = async (): Promise<Resource[]> => request<Resource[]>('/resources');
export const getTrainingMaterials = async (): Promise<TrainingMaterial[]> => request<TrainingMaterial[]>('/training');
export const getHomepageContent = async (): Promise<HomepageContent> => request<HomepageContent>('/homepage');
export const getCorePagesContent = async (): Promise<CorePagesContent> => request<CorePagesContent>('/core-pages');
export const getSiteSettings = async (): Promise<SiteSettings> => request<SiteSettings>('/settings');
export const getApplications = async (): Promise<UnitApplication[]> => request<UnitApplication[]>('/applications', { method: 'GET' });
export const getReports = async (): Promise<IntelligenceReport[]> => request<IntelligenceReport[]>('/reports', { method: 'GET' });
export const getSiteContent = async (): Promise<SiteContent> => request<SiteContent>('/site-content');

// MUTATIONS
// News
export const addNewsArticle = async (article: Omit<NewsArticle, 'id'>): Promise<NewsArticle[]> => request<NewsArticle[]>('/news', { method: 'POST', body: JSON.stringify(article) });
export const updateNewsArticle = async (updatedArticle: NewsArticle): Promise<NewsArticle[]> => request<NewsArticle[]>(`/news/${updatedArticle.id}`, { method: 'PUT', body: JSON.stringify(updatedArticle) });
export const deleteNewsArticle = async (id: number): Promise<NewsArticle[]> => request<NewsArticle[]>(`/news/${id}`, { method: 'DELETE' });

// Resources
export const addResource = async (resource: Omit<Resource, 'id' | 'status'>): Promise<Resource[]> => request<Resource[]>('/resources', { method: 'POST', body: JSON.stringify(resource) });
export const updateResourceStatus = async (id: number, status: 'approved'): Promise<Resource[]> => request<Resource[]>(`/resources/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
export const deleteResource = async (id: number): Promise<Resource[]> => request<Resource[]>(`/resources/${id}`, { method: 'DELETE' });

// Training
export const addTrainingMaterial = async (material: Omit<TrainingMaterial, 'id'>): Promise<TrainingMaterial[]> => request<TrainingMaterial[]>('/training', { method: 'POST', body: JSON.stringify(material) });
export const updateTrainingMaterial = async (updatedMaterial: TrainingMaterial): Promise<TrainingMaterial[]> => request<TrainingMaterial[]>(`/training/${updatedMaterial.id}`, { method: 'PUT', body: JSON.stringify(updatedMaterial) });
export const deleteTrainingMaterial = async (id: number): Promise<TrainingMaterial[]> => request<TrainingMaterial[]>(`/training/${id}`, { method: 'DELETE' });

// Homepage/Core
export const updateHomepageContent = async (content: HomepageContent): Promise<HomepageContent> => request<HomepageContent>('/homepage', { method: 'PUT', body: JSON.stringify(content) });
export const updateCorePagesContent = async (content: CorePagesContent): Promise<CorePagesContent> => request<CorePagesContent>('/core-pages', { method: 'PUT', body: JSON.stringify(content) });

// Settings
export const updateSiteSettings = async (settings: SiteSettings): Promise<SiteSettings> => request<SiteSettings>('/settings', { method: 'PUT', body: JSON.stringify(settings) });

// Applications
export const addApplication = async (app: Omit<UnitApplication, 'id' | 'status' | 'submittedAt'>): Promise<UnitApplication[]> => request<UnitApplication[]>('/applications', { method: 'POST', body: JSON.stringify(app) });
export const updateApplicationStatus = async (id: number, status: 'approved' | 'rejected'): Promise<UnitApplication[]> => request<UnitApplication[]>(`/applications/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });

// Reports
export const addReport = async (report: Omit<IntelligenceReport, 'id' | 'status' | 'submittedAt'>): Promise<IntelligenceReport[]> => request<IntelligenceReport[]>('/reports', { method: 'POST', body: JSON.stringify(report) });
export const updateReportStatus = async (id: number, status: 'under_review' | 'archived'): Promise<IntelligenceReport[]> => request<IntelligenceReport[]>(`/reports/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });

// Site Content (Owner)
export const updateSiteContent = async (content: SiteContent): Promise<SiteContent> => request<SiteContent>('/site-content', { method: 'PUT', body: JSON.stringify(content) });

// Auth
export const login = async (username: string, password: string): Promise<{ token: string; role: 'Admin' | 'Owner' }> => request<{ token: string; role: 'Admin' | 'Owner' }>(`/auth/login`, { method: 'POST', body: JSON.stringify({ username, password }) });

