export const initialNews = [
  { id: 1, title: 'Geopolitical Flashpoint Analysis: South China Sea', date: '28 JUL 2024', category: 'Geopolitics', summary: 'Increased naval activity detected via satellite imagery analysis suggests a heightened state of alert. Commercial shipping routes show minor deviations. GOSID is monitoring all open-source channels for further developments.', imageUrl: 'https://images.unsplash.com/photo-1569018295593-e35a1a067a29?q=80&w=800' },
  { id: 2, title: 'Cyber Threat Advisory: Phishing Campaign Targets Financial Sector', date: '26 JUL 2024', category: 'Cyber Intelligence', summary: 'A sophisticated phishing campaign impersonating regulatory bodies is targeting financial institutions. IOCs have been distributed to relevant partners. All personnel should exercise extreme caution with unsolicited communications.' },
  { id: 3, title: 'Disinformation Watch: Coordinated Inauthentic Behavior Detected', date: '25 JUL 2024', category: 'Disinformation', summary: 'A network of social media accounts has been identified promoting divisive narratives regarding upcoming elections. The network demonstrates tactics consistent with known state-level actors. Analysis is ongoing to determine the full scope of the operation.', imageUrl: 'https://images.unsplash.com/photo-1614036125134-b78b9c3ab803?q=80&w=800' },
];

export const initialResources = [
  { id: 1, title: 'Shodan', description: 'Search engine for Internet-connected devices. Crucial for network reconnaissance and identifying vulnerable systems.', type: 'Database', link: 'https://www.shodan.io/', status: 'approved' },
  { id: 2, title: 'theHarvester', description: 'Gathers emails, subdomains, hosts, employee names, open ports and banners from different public sources.', type: 'Tool', link: 'https://github.com/laramies/theHarvester', status: 'approved' },
  { id: 3, title: 'Bellingcat', description: 'An independent international collective of researchers, investigators and citizen journalists using open source and social media investigation to probe a variety of subjects.', type: 'Article', link: 'https://www.bellingcat.com/', status: 'approved' },
];

export const initialTrainingMaterials = [
  { id: 1, title: 'Introduction to OSINT Methodology', type: 'Guide', description: 'A foundational document covering the intelligence cycle, data collection strategies, and ethical considerations.', link: 'https://www.bellingcat.com/resources/2021/01/18/how-to-do-geolocation-in-the-blink-of-an-eye/' },
  { id: 2, title: 'Advanced Social Media Analysis (SOCMINT)', type: 'Video', description: 'A video tutorial on techniques for extracting actionable intelligence from social media platforms.', duration: '45 Min', link: '#' },
  { id: 3, title: 'Geolocation Verification: From Image to Coordinate', type: 'Tutorial', description: 'A step-by-step interactive tutorial on verifying the location of a photograph using satellite imagery.', link: '#' },
];

export const initialHomepageContent = {
  briefings: [
    { id: 1, title: 'Directive 001-Alpha: The Evolving Threat Landscape', content: 'Operatives, the digital terrain is in constant flux. Emerging state-sponsored disinformation campaigns and decentralized extremist networks demand a new paradigm of vigilance. Our mandate is to cut through the noise, identify credible threats, and provide actionable intelligence. Stay sharp, verify your sources, and trust your training. The mission continues.', author: 'The Director', date: '24 JUL 2024', imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800' },
  ],
  toolOfMonth: { name: 'Maltego', description: "For its unparalleled ability in link analysis and data visualization, Maltego is designated as this month's highlighted tool.", link: 'https://www.maltego.com/' },
  calendarEvents: [
    { id: 1, date: 'AUG 05, 2024', event: 'Briefing: Dark Web Monitoring Techniques' },
    { id: 2, date: 'AUG 19, 2024', event: 'Workshop: Advanced Geolocation & Imagery Analysis' },
  ],
};

export const initialCorePagesContent = {
  about: {
    mission: 'The Global Open Source Intelligence Dashboard (GOSID) exists to provide clarity in an increasingly opaque world. We are an independent, non-state entity dedicated to the ethical collection, rigorous analysis, and responsible dissemination of open-source intelligence. Our primary mandate is to identify and illuminate threats to global stability, human rights, and civil society, empowering decision-makers and the public with verified, actionable information.',
    structure: 'GOSID is organized into specialized divisions, each with a specific intelligence focus, including counter-terrorism (CTU) and anti-human trafficking (AHTU). Our authority is not derived from any single nation-state, but from the credibility of our analysis and the dedication of our global network of vetted analysts. We operate with disciplined autonomy, free from political or corporate influence.',
    principles: [
      { id: 1, title: 'Objectivity', text: 'Analysis free from bias or agenda.' },
      { id: 2, title: 'Accuracy', text: 'Intelligence rigorously vetted and verified.' },
      { id: 3, title: 'Security', text: 'Uncompromising operational security for our personnel and data.' },
      { id: 4, title: 'Impact', text: 'Focus on intelligence that can effect positive change and mitigate harm.' },
    ],
  },
  opsec: {
    intro: 'Operational security is a non-negotiable discipline. The threats we monitor are sophisticated and persistent. Any lapse in security not only compromises the mission but places our operatives and assets at risk. Adherence to these protocols is mandatory.',
    principles: [
      { id: 1, title: 'Information Compartmentalization', text: 'Never cross-contaminate your personal and operational digital footprints. Use dedicated devices, browsers, and accounts for all GOSID-related activities.' },
      { id: 2, title: 'Minimize Digital Footprint', text: 'Every action online leaves a trace. Before conducting any search or visiting any site, consider the footprint you are leaving. Use VPNs, anonymizing networks (Tor), and sterile virtual machines.' },
      { id: 3, title: 'Counter-Analysis & Misdirection', text: 'Assume you are being watched. Periodically introduce plausible but incorrect information into your public-facing profiles to mislead any potential observers.' },
    ],
  },
};

export const initialSiteSettings = { maintenanceMode: false };

export const initialSiteContent = {
  header: {
    siteTitle: 'GOSID',
    siteSubtitle: 'The Global Open Source Intelligence Dashboard',
    loginButton: 'Login',
    primaryLinks: [
      { id: 1, path: '/', name: 'Home' },
      { id: 2, path: '/news', name: 'News' },
      { id: 3, path: '/ctu', name: 'CTU' },
      { id: 4, path: '/ahtu', name: 'AHTU' },
      { id: 5, path: '/resources', name: 'Resources' },
      { id: 6, path: '/learn', name: 'Learn' },
    ],
    secondaryLinks: [
      { id: 7, path: '/opsec', name: 'OPSEC' },
      { id: 8, path: '/about', name: 'About' },
      { id: 9, path: '/donate', name: 'Donate' },
      { id: 10, path: '/report', name: 'Report' },
      { id: 11, path: '/contact', name: 'Contact' },
    ],
  },
  footer: {
    copyrightText: '© {year} The Global Open Source Intelligence Dashboard (GOSID). All Rights Reserved.',
    footerDisclaimer: 'This platform is an independent, private intelligence entity. Information is provided for situational awareness and operational use. Discretion is advised.',
  },
  pages: {
    home: { title: 'GOSID Command Center', subtitle: 'Situational Awareness & Operational Directives', briefingTitle: "Director's Briefing", resourceTitle: 'Field Resource Highlight', calendarTitle: 'Operational Calendar', accessButton: 'Access Tool' },
    news: { title: 'Intelligence Bulletins', subtitle: 'Global OSINT News & Analysis' },
    learn: { title: 'Operative Training & Doctrine', subtitle: 'Enhance your intelligence gathering and analysis capabilities.' },
    opsec: { title: 'Operational Security (OPSEC)', subtitle: 'Vigilance is not optional. It is the cornerstone of survival.' },
    about: { title: 'Mandate & Charter', subtitle: 'Understanding The Global Open Source Intelligence Dashboard' },
    ctu: {
      title: 'TGOSID-CTU', subtitle: 'Counter Terrorism Unit', mandateTitle: 'Unit Mandate',
      mandateText: 'The Global Open Source Intelligence Dashboard - Counter Terrorism Unit (TGOSID-CTU) is dedicated to the identification, monitoring, and disruption of terrorist activities and extremist networks worldwide through the exclusive use of open-source intelligence.',
      operationsTitle: 'Areas of Operation',
      operations: [
        'Tracking online radicalization pathways and recruitment propaganda.',
        'Analyzing social media and dark web forums for threat indicators.',
        'Mapping network structures and identifying key nodes of influence.',
        'Monitoring financial transactions through publicly available blockchain data.',
        'Providing actionable intelligence briefs to appropriate partners.',
      ],
      noteText: 'Note: TGOSID-CTU operates strictly within the legal framework of publicly available information. All activities are passive and non-intrusive.',
      formTitle: 'Membership Protocol',
      formDescription: 'Access to the CTU is restricted to vetted individuals with a demonstrated background in intelligence, law enforcement, or relevant academic fields. Applicants undergo a rigorous screening process.',
      form: { nameLabel: 'Full Name / Alias', emailLabel: 'Contact Email (Secure)', statementLabel: 'Statement of Experience', submitButton: 'Submit Application for Vetting', submittingButton: 'Transmitting...' },
    },
    ahtu: {
      title: 'TGOSID-AHTU', subtitle: 'Anti-Human Trafficking Unit', mandateTitle: 'Unit Mandate',
      mandateText: 'The Global Open Source Intelligence Dashboard - Anti-Human Trafficking Unit (TGOSID-AHTU) is committed to combating modern slavery by leveraging OSINT to identify trafficking networks, support victim identification, and provide intelligence to vetted non-governmental organizations on the front lines.',
      operationsTitle: 'Core Functions',
      operations: [
        'Analyzing online advertisements and forums for indicators of trafficking.',
        'Using geolocation data from public sources to identify potential trafficking locations.',
        'Mapping the financial trails of trafficking organizations through open cryptocurrency ledgers.',
        'Building detailed profiles of trafficking networks and their methods of operation.',
      ],
      noteText: 'Mission Priority: The safety and anonymity of potential victims are paramount in all AHTU operations. Strict data handling and OPSEC protocols are enforced.',
      formTitle: 'Join the Fight',
      formDescription: 'AHTU seeks dedicated analysts, researchers, and data scientists. If you have the skills and the will to make a difference, submit your application.',
      form: { nameLabel: 'Full Name / Alias', emailLabel: 'Contact Email (Secure)', statementLabel: 'Relevant Skills & Motivation', submitButton: 'Request Membership Vetting', submittingButton: 'Submitting...' },
    },
    resources: {
      title: 'TGOSID-R', subtitle: 'Resource & Intelligence Support Division',
      formTitle: 'Submit a Resource',
      formDescription: 'All submitted resources are reviewed by GOSID analysts for validity and operational security before being added to the database.',
      form: { nameLabel: 'Resource Name', urlLabel: 'URL', typeLabel: 'Type', descLabel: 'Brief Description', submitButton: 'Submit for Review', submittingButton: 'Submitting...' },
    },
    donate: {
      title: 'Support GOSID Operations', subtitle: 'Ensuring Independence and Efficacy',
      independenceTitle: 'Operational Independence',
      independenceText: "GOSID's effectiveness is contingent upon its autonomy. We accept no funding from government or corporate entities to ensure our intelligence analysis remains unbiased and uncompromised. Operations are sustained solely through private, anonymous contributions from individuals who support our mission.",
      warningText: 'To maintain the operational security of our supporters, we accept donations exclusively in cryptocurrency.',
      wallets: [
        { id: 1, name: 'Bitcoin (BTC)', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh' },
        { id: 2, name: 'Ethereum (ETH)', address: '0x1234567890ABCDEF1234567890ABCDEF12345678' },
        { id: 3, name: 'Monero (XMR)', address: '44AFFq5k7114cfB2A53e8A2B3CcaD8A4f2A56E2B18E... ' },
      ],
    },
    report: {
      title: 'Submit Intelligence', subtitle: 'Secure Intake & Triage Channel',
      protocolTitle: 'Secure Submission Protocol',
      protocolDescription: 'This form is for reporting suspicious activities, potential threats, or human trafficking cases. Provide as much detail as possible. Your identity will be protected.',
      safetyWarning: 'For your own safety, consider using a VPN or the Tor network when submitting sensitive information.',
      form: {
        natureLabel: 'Nature of Report',
        summaryLabel: 'Summary of Information',
        summaryPlaceholder: 'Provide a detailed, objective summary. Include dates, times, locations, individuals involved, and any other relevant data. Do not include personal opinions.',
        linksLabel: 'Supporting Links / Data (Optional)',
        linksPlaceholder: 'Paste relevant URLs, social media profiles, transaction IDs, etc. one per line.',
        contactLabel: 'Secure Contact (Optional)',
        contactPlaceholder: 'ProtonMail, Session ID, etc. Do not use a personal email.',
        submitButton: 'Transmit Securely',
        submittingButton: 'Transmitting...',
      },
    },
    contact: {
      title: 'Official Communications', subtitle: 'Channels for General Inquiries',
      formTitle: 'General Contact Form',
      formDescription: 'For general, non-sensitive inquiries only. For intelligence submission, use the secure {reportLink} channel.',
      form: { nameLabel: 'Name', emailLabel: 'Email', messageLabel: 'Message', submitButton: 'Send Message' },
      channelsTitle: 'Public Channels',
      channelsDescription: 'Official GOSID announcements and public-facing analysis are disseminated through the following verified channels. Beware of impersonators.',
      channels: [
        { id: 1, platform: 'X (Twitter)', handle: '@GOSID_Official', link: '#' },
        { id: 2, platform: 'Telegram', handle: 't.me/GOSID_Announce', link: '#' },
        { id: 3, platform: 'Secure Email', handle: 'contact@gosid.proton.me', link: 'mailto:contact@gosid.proton.me' },
      ],
      warningTitle: 'Warning',
      warningText: 'Do not send unsolicited sensitive information to these public channels. GOSID will never request personal data or operational details via social media or unencrypted email.',
    },
    login: {
      title: 'Secure Access',
      subtitle: 'Agent Authentication Required',
      formTitle: 'Admin Control Panel',
      agentIdLabel: 'Agent ID',
      passwordLabel: 'Password',
      roleLabel: 'Select Role',
      submitButton: 'Authenticate & Proceed',
    },
  },
};

