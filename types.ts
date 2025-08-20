export interface NewsArticle {
  id: number;
  title: string;
  date: string;
  summary: string;
  category: string;
  imageUrl?: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'Tool' | 'Database' | 'Article' | 'Guide';
  link: string;
  status: 'pending' | 'approved';
}

export interface TrainingMaterial {
  id: number;
  title: string;
  type: 'Video' | 'Guide' | 'Tutorial';
  description: string;
  duration?: string;
  link: string;
}

export interface Briefing {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
}

export interface HomepageContent {
  briefings: Briefing[];
  toolOfMonth: { name: string; description: string; link: string };
  calendarEvents: { id: number; date: string; event: string }[];
}

export interface CorePagesContent {
  about: { 
    mission: string; 
    structure: string;
    principles: { id: number; title: string; text: string }[];
  };
  opsec: { 
    intro: string;
    principles: { id: number; title: string; text: string }[] 
  };
}

export interface SiteSettings {
  maintenanceMode: boolean;
}

export interface UnitApplication {
  id: number;
  unit: 'CTU' | 'AHTU';
  name: string;
  email: string;
  statement: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface IntelligenceReport {
  id: number;
  type: string;
  summary: string;
  links: string;
  contact: string;
  submittedAt: Date;
  status: 'new' | 'under_review' | 'archived';
}

// New comprehensive site content structure for owner management
export interface NavLinkItem {
  id: number;
  path: string;
  name: string;
}

export interface HeaderContent {
  siteTitle: string;
  siteSubtitle: string;
  loginButton: string;
  primaryLinks: NavLinkItem[];
  secondaryLinks: NavLinkItem[];
}

export interface FooterContent {
  copyrightText: string;
  footerDisclaimer: string;
}

export interface HomePageText {
    title: string;
    subtitle: string;
    briefingTitle: string;
    resourceTitle: string;
    calendarTitle: string;
    accessButton: string;
}

export interface PageContent {
    title: string;
    subtitle: string;
}

export interface FormContent {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitButton: string;
}

export interface UnitPageContent extends PageContent {
    mandateTitle: string;
    mandateText: string;
    operationsTitle: string;
    operations: string[];
    noteText: string;
    formTitle: string;
    formDescription: string;
    form: {
        nameLabel: string;
        emailLabel: string;
        statementLabel: string;
        submitButton: string;
        submittingButton: string;
    }
}

export interface ResourcesPageContent extends PageContent {
    formTitle: string;
    formDescription: string;
    form: {
        nameLabel: string;
        urlLabel: string;
        typeLabel: string;
        descLabel: string;
        submitButton: string;
        submittingButton: string;
    }
}

export interface DonatePageContent extends PageContent {
    independenceTitle: string;
    independenceText: string;
    warningText: string;
    wallets: { id: number; name: string; address: string }[];
}

export interface ReportPageContent extends PageContent {
    protocolTitle: string;
    protocolDescription: string;
    safetyWarning: string;
    form: {
        natureLabel: string;
        summaryLabel: string;
        summaryPlaceholder: string;
        linksLabel: string;
        linksPlaceholder: string;
        contactLabel: string;
        contactPlaceholder: string;
        submitButton: string;
        submittingButton: string;
    }
}

export interface ContactPageContent extends PageContent {
    formTitle: string;
    formDescription: string;
    form: FormContent;
    channelsTitle: string;
    channelsDescription: string;
    channels: { id: number; platform: string; handle: string; link: string }[];
    warningTitle: string;
    warningText: string;
}

export interface LoginPageContent extends PageContent {
    formTitle: string;
    agentIdLabel: string;
    passwordLabel: string;
    roleLabel: string;
    submitButton: string;
}

export interface SiteContent {
  header: HeaderContent;
  footer: FooterContent;
  pages: {
    home: HomePageText;
    news: PageContent;
    ctu: UnitPageContent;
    ahtu: UnitPageContent;
    resources: ResourcesPageContent;
    learn: PageContent;
    opsec: PageContent;
    about: PageContent;
    donate: DonatePageContent;
    report: ReportPageContent;
    contact: ContactPageContent;
    login: LoginPageContent;
  };
}
