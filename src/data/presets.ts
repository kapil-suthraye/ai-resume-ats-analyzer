import { ResumeData } from '../types';

export const PRESET_PROFILES: Record<string, ResumeData> = {
  '1': {
    id: '1',
    candidateName: 'Alex Chen',
    initials: 'AC',
    targetRole: 'Staff / Senior Full-Stack Engineer',
    fileName: 'alex_chen_senior_fullstack_resume.pdf',
    fileSize: '64 KB',
    wordCount: 742,
    sectionsCount: 4,
    overallScore: 87,
    percentileText: 'Top 8% Percentile',
    alignmentText: '91% Role Target Alignment vs. Senior Industry Baseline',
    synthesisText:
      'Candidate presents an exceptional foundational match for staff-grade execution with 96% structural ATS compliance and 92% technical domain relevance. The primary scoring penalties stem from under-quantified business outcomes in recent tenure bullets and omission of modern cloud FinOps/IaC tooling referenced in the target specification.',
    parsingErrorsCount: 0,
    missingMetricsCount: 3,
    keywordMatchPct: 82,
    jobDescription: `We are seeking a Staff/Senior Full-Stack Engineer to architect resilient distributed systems and scale web applications serving millions of active users. 
Key Requirements:
- Expert proficiency in TypeScript, React, Node.js, and GraphQL.
- Strong track record designing high-concurrency microservices and relational data schemas (PostgreSQL).
- Deep experience with AWS infrastructure (EKS, RDS, S3), Docker containerization, and automated CI/CD pipelines.
- Demonstrated technical mentorship, architectural code reviews, and cross-functional leadership.
- Focus on performance profiling, reducing P99 latency, and cloud infrastructure cost optimization.`,
    extractedText: {
      summary:
        'Staff Full-Stack Software Engineer with 8+ years architecting web applications, high-throughput microservices, and reactive user interfaces in TypeScript, React, and Node.js. Passionate about system observability, API design, and engineering mentorship.',
      experience: `TechCorp Inc. — Senior Full-Stack Engineer (2022 – Present)
• Architected core microservices handling 45,000 requests/sec with Node.js, TypeScript, and Redis caching.
• Led front-end migration from legacy single-page app to modular React architecture, improving Core Web Vitals and load times.
• Refactored relational PostgreSQL schemas and optimized queries, significantly reducing database query times for high-volume billing workloads.
• Spearheaded bi-weekly architectural design reviews and mentored 6 mid-level engineers across 2 cross-functional squads.

CloudScale Solutions — Full-Stack Engineer (2019 – 2022)
• Built customer-facing dashboard in React, GraphQL, and Tailwind CSS serving 120,000 monthly active enterprise users.
• Designed automated CI/CD deployment pipelines using Docker, GitHub Actions, and AWS infrastructure.
• Collaborated closely with Product and Security teams to ensure SOC 2 Type II compliance and zero downtime releases.`,
      skills:
        'Languages: TypeScript, JavaScript (ES6+), SQL, Python, Go\nFrontend: React, Next.js, Redux, Tailwind CSS, GraphQL Apollo, Webpack/Vite\nBackend: Node.js, Express, Fastify, PostgreSQL, Redis, REST APIs, Kafka\nDevOps & Cloud: AWS (S3, RDS, EC2), Docker, Kubernetes (EKS basics), GitHub Actions, Datadog',
      education: 'B.S. in Computer Science — University of California, Berkeley (2018)',
      fullText: `Alex Chen
San Francisco, CA • alex.chen@example.dev • github.com/alexchen-dev • linkedin.com/in/alexchen

SUMMARY
Staff Full-Stack Software Engineer with 8+ years architecting web applications, high-throughput microservices, and reactive user interfaces in TypeScript, React, and Node.js. Passionate about system observability, API design, and engineering mentorship.

TECHNICAL SKILLS
• Languages: TypeScript, JavaScript (ES6+), SQL, Python, Go
• Frontend: React, Next.js, Redux, Tailwind CSS, GraphQL Apollo, Webpack/Vite
• Backend: Node.js, Express, Fastify, PostgreSQL, Redis, REST APIs, Kafka
• DevOps & Cloud: AWS (S3, RDS, EC2), Docker, Kubernetes, GitHub Actions, Datadog

EXPERIENCE
TechCorp Inc. — Senior Full-Stack Engineer | 2022 – Present
• Architected core microservices handling 45,000 requests/sec with Node.js, TypeScript, and Redis caching.
• Led front-end migration from legacy single-page app to modular React architecture, improving Core Web Vitals and load times.
• Refactored relational PostgreSQL schemas and optimized queries, significantly reducing database query times for high-volume billing workloads.
• Spearheaded bi-weekly architectural design reviews and mentored 6 mid-level engineers across 2 cross-functional squads.

CloudScale Solutions — Full-Stack Engineer | 2019 – 2022
• Built customer-facing dashboard in React, GraphQL, and Tailwind CSS serving 120,000 monthly active enterprise users.
• Designed automated CI/CD deployment pipelines using Docker, GitHub Actions, and AWS infrastructure.
• Collaborated closely with Product and Security teams to ensure SOC 2 Type II compliance and zero downtime releases.

EDUCATION
B.S. in Computer Science — University of California, Berkeley | 2018`
    },
    radarAxes: [
      {
        label: 'Technical Match',
        key: 'technical',
        score: 92,
        benchmark: 75,
        description: 'TypeScript, React, Node.js, GraphQL, PostgreSQL and Docker matched with high density.'
      },
      {
        label: 'Domain Exp',
        key: 'domain',
        score: 88,
        benchmark: 75,
        description: '8+ years verified experience in enterprise SaaS and distributed web systems.'
      },
      {
        label: 'Leadership',
        key: 'leadership',
        score: 85,
        benchmark: 75,
        description: 'Mentored 6 engineers and drove cross-squad architectural design sessions.'
      },
      {
        label: 'Impact / Metrics',
        key: 'impact',
        score: 74,
        benchmark: 75,
        description: 'Several bullets describe technical actions without quantifying ARR, latency delta, or cost savings.'
      },
      {
        label: 'ATS Format',
        key: 'format',
        score: 96,
        benchmark: 75,
        description: 'Single-column structure, standard section headers, clean UTF-8 glyphs, and zero parsing friction.'
      }
    ],
    criteria: [
      {
        id: 'c1',
        name: 'ATS Structural Compliance',
        score: 96,
        maxScore: 100,
        status: 'pass',
        summary: 'Clean standard margins, no nested tables, standard header hierarchy validated.',
        details: [
          'Standard chronological format detected',
          'No complex multi-column tables or text box wrappers',
          'Contact links and phone numbers normalized without parsing artifacts',
          'Parser compatibility score: 98.4% across 4 enterprise engines'
        ]
      },
      {
        id: 'c2',
        name: 'Technical Skill Match',
        score: 92,
        maxScore: 100,
        status: 'pass',
        summary: 'Exact matches for TypeScript, React, Node.js, GraphQL, PostgreSQL, and Docker.',
        details: [
          'High relevance match in primary programming languages and backend frameworks',
          'Strong API architecture coverage (GraphQL, REST, Redis)',
          'Secondary gap: Target mentions EKS and FinOps optimization; resume only lists basic Kubernetes'
        ]
      },
      {
        id: 'c3',
        name: 'Domain & Experience Relevance',
        score: 88,
        maxScore: 100,
        status: 'pass',
        summary: 'Extensive tenure in high-scale SaaS with demonstrated seniority progression.',
        details: [
          'Clear progression from Full-Stack to Senior Engineer across top-tier environments',
          'Proven ownership of mission-critical billing workloads handling 45k req/sec',
          'Opportunity: Add details on multi-region failover and fault-tolerant architecture'
        ]
      },
      {
        id: 'c4',
        name: 'Quantified Impact & STAR Density',
        score: 74,
        maxScore: 100,
        status: 'gap',
        summary: '3 key bullet points lack quantifiable statistical proofs (e.g. latency, %, $).',
        details: [
          '"improving Core Web Vitals and load times" lacks percentage decrease or seconds saved',
          '"reducing database query times" missing exact P95/P99 latency improvement figure',
          'Recommend adding business outcomes ($ revenue protected, downtime avoided)'
        ]
      },
      {
        id: 'c5',
        name: 'Leadership & Engineering Culture',
        score: 85,
        maxScore: 100,
        status: 'pass',
        summary: 'Mentorship of 6 engineers and bi-weekly architecture ownership clearly demonstrated.',
        details: [
          'Cross-functional alignment with Product and Security explicitly cited',
          'Promotes engineering standards through structured architectural reviews',
          'Recommend adding hiring/interviewing contributions to round out staff profile'
        ]
      }
    ],
    rewrites: [
      {
        id: 'r1',
        section: 'TechCorp Experience',
        role: 'Senior Full-Stack Engineer',
        before: 'Led front-end migration from legacy single-page app to modular React architecture, improving Core Web Vitals and load times.',
        after: 'Architected migration of monolithic SPA to modular React 18 & Vite, decreasing P95 page load latency by 42% (2.8s to 1.6s) and lifting checkout conversion by 3.4% ($1.2M ARR impact).',
        improvementDelta: 16,
        rationale: 'Replaced passive verb with high-level architectural ownership, added hard latency metrics (42% reduction), and tied the result directly to $1.2M bottom-line business value.'
      },
      {
        id: 'r2',
        section: 'TechCorp Experience',
        role: 'Senior Full-Stack Engineer',
        before: 'Refactored relational PostgreSQL schemas and optimized queries, significantly reducing database query times for high-volume billing workloads.',
        after: 'Optimized PostgreSQL schemas with partial indexes and connection pooling, dropping billing query execution times from 840ms to 48ms (-94%) and eliminating P99 timeouts under 45k req/sec peak loads.',
        improvementDelta: 14,
        rationale: 'Replaces vague "significantly reducing" with precise before/after telemetry (840ms -> 48ms) and clarifies high-scale concurrency conditions.'
      },
      {
        id: 'r3',
        section: 'CloudScale Experience',
        role: 'Full-Stack Engineer',
        before: 'Designed automated CI/CD deployment pipelines using Docker, GitHub Actions, and AWS infrastructure.',
        after: 'Engineered zero-downtime CI/CD pipelines across AWS EKS using Docker and GitHub Actions, cutting mean release cycle time from 45m to 8m and decreasing cloud build compute costs by 28%.',
        improvementDelta: 12,
        rationale: 'Surfaces target specification keywords (AWS EKS, zero-downtime) and quantifies deployment velocity speedup (45m to 8m) plus cloud cost savings.'
      }
    ],
    keywords: {
      matched: [
        'TypeScript',
        'React',
        'Node.js',
        'GraphQL',
        'PostgreSQL',
        'Microservices',
        'Docker',
        'Redis',
        'REST APIs',
        'CI/CD',
        'Tailwind CSS',
        'Mentorship'
      ],
      missingHighPriority: ['AWS EKS', 'P99 Latency', 'Cloud FinOps / Cost Optimization'],
      missingRecommended: ['Terraform / IaC', 'System Observability (OpenTelemetry)', 'Distributed Tracing']
    },
    parsers: [
      {
        system: 'Workday ATS',
        compatibility: 98,
        status: 'passed',
        notes: 'Header structure matched standard schema. Zero dropped work history dates.'
      },
      {
        system: 'Greenhouse',
        compatibility: 100,
        status: 'passed',
        notes: 'Skills and role chronology ingested seamlessly without misaligned tokens.'
      },
      {
        system: 'Lever',
        compatibility: 96,
        status: 'passed',
        notes: 'Contact info and degree details extracted with 100% confidence.'
      },
      {
        system: 'Oracle Taleo',
        compatibility: 92,
        status: 'passed',
        notes: 'Slight penalty for bullet-point formatting; fully readable across text filters.'
      }
    ]
  },

  '2': {
    id: '2',
    candidateName: 'Sarah Jenkins',
    initials: 'SJ',
    targetRole: 'Senior Product Manager (B2B SaaS)',
    fileName: 'sarah_jenkins_lead_pm_resume.pdf',
    fileSize: '58 KB',
    wordCount: 810,
    sectionsCount: 4,
    overallScore: 92,
    percentileText: 'Top 4% Percentile',
    alignmentText: '95% Role Target Alignment vs. Senior PM Baseline',
    synthesisText:
      'Candidate is an elite product leader with exceptional business outcome quantification and deep Product-Led Growth (PLG) execution. ATS formatting is clean, and leadership metrics across ARR and retention are strong.',
    parsingErrorsCount: 0,
    missingMetricsCount: 1,
    keywordMatchPct: 91,
    jobDescription: `We are looking for a Senior Product Manager to spearhead our B2B SaaS platform monetization and enterprise onboarding workflows.
Key Requirements:
- 5+ years of PM experience in B2B SaaS with Product-Led Growth (PLG) focus.
- Demonstrated success scaling ARR from $5M to $25M+ through pricing and retention experiments.
- Strong analytical foundation with SQL, Amplitude, Mixpanel, and A/B test methodology.
- Deep collaboration with engineering, design, and enterprise customer success.
- Experience crafting clear PRDs, roadmaps, and executive OKR reporting.`,
    extractedText: {
      summary:
        'Senior Product Manager with 6+ years delivering high-impact B2B SaaS solutions, driving $18M+ net-new ARR through self-serve product-led growth, enterprise workflows, and data-driven customer discovery.',
      experience: `DataFlow Systems — Senior Product Manager, Growth (2021 – Present)
• Owned self-serve activation and monetization funnel, increasing trial-to-paid conversion from 4.2% to 7.9% and unlocking $6.8M in annual recurring revenue.
• Led cross-functional team of 8 engineers and 2 product designers to launch enterprise SSO and role-based permissions, closing 34 Fortune 500 contracts.
• Formulated quarterly OKRs, established telemetry dashboards in Amplitude/SQL, and ran 42 A/B experiments across user onboarding.

Nexus Cloud — Product Manager (2018 – 2021)
• Spearheaded redesign of customer onboarding workspace, decreasing time-to-first-value (TTFV) from 14 days to 3.5 days.
• Managed user feedback loop involving 60+ customer discovery interviews to prioritize 18-month product roadmap.`,
      skills:
        'Product Strategy: PLG, Monetization, Pricing Tiers, Roadmapping, PRDs, Jobs-To-Be-Done (JTBD)\nAnalytics & Tools: SQL, Amplitude, Mixpanel, Jira, Figma, Tableau, Google Analytics\nMethodologies: Agile/Scrum, User Research, Continuous Discovery, OKR Planning',
      education: 'B.A. in Economics & Informatics — University of Washington (2018)',
      fullText: `Sarah Jenkins
Seattle, WA • sarah.jenkins@example.com • linkedin.com/in/sarahjenkins-pm

SUMMARY
Senior Product Manager with 6+ years delivering high-impact B2B SaaS solutions, driving $18M+ net-new ARR through self-serve product-led growth, enterprise workflows, and data-driven customer discovery.

EXPERIENCE
DataFlow Systems — Senior Product Manager, Growth | 2021 – Present
• Owned self-serve activation and monetization funnel, increasing trial-to-paid conversion from 4.2% to 7.9% and unlocking $6.8M in annual recurring revenue.
• Led cross-functional team of 8 engineers and 2 product designers to launch enterprise SSO and role-based permissions, closing 34 Fortune 500 contracts.
• Formulated quarterly OKRs, established telemetry dashboards in Amplitude/SQL, and ran 42 A/B experiments across user onboarding.

Nexus Cloud — Product Manager | 2018 – 2021
• Spearheaded redesign of customer onboarding workspace, decreasing time-to-first-value (TTFV) from 14 days to 3.5 days.
• Managed user feedback loop involving 60+ customer discovery interviews to prioritize 18-month product roadmap.

EDUCATION
B.A. in Economics & Informatics — University of Washington | 2018`
    },
    radarAxes: [
      {
        label: 'Technical Match',
        key: 'technical',
        score: 88,
        benchmark: 75,
        description: 'Strong technical depth with SQL, Amplitude, and technical PRD workflows.'
      },
      {
        label: 'Domain Exp',
        key: 'domain',
        score: 95,
        benchmark: 75,
        description: 'Deep B2B SaaS background spanning PLG and enterprise contract expansion.'
      },
      {
        label: 'Leadership',
        key: 'leadership',
        score: 94,
        benchmark: 75,
        description: 'Proven multi-squad leadership across engineering, design, and sales.'
      },
      {
        label: 'Impact / Metrics',
        key: 'impact',
        score: 91,
        benchmark: 75,
        description: 'Excellent STAR metric coverage ($6.8M ARR, 4.2% to 7.9% conversion, 42 A/B tests).'
      },
      {
        label: 'ATS Format',
        key: 'format',
        score: 98,
        benchmark: 75,
        description: 'Flawless single-column hierarchy with clean typography and ATS-safe headers.'
      }
    ],
    criteria: [
      {
        id: 'c1',
        name: 'ATS Structural Compliance',
        score: 98,
        maxScore: 100,
        status: 'pass',
        summary: 'Exceptional ATS format with standard headers and zero parsing errors.',
        details: [
          'High compliance score across Greenhouse and Workday',
          'Standard title casing and clean chronological work history'
        ]
      },
      {
        id: 'c2',
        name: 'Technical Skill Match',
        score: 88,
        maxScore: 100,
        status: 'pass',
        summary: 'Matches SQL, Amplitude, Mixpanel, and experimental analysis criteria.',
        details: ['Comprehensive analytics tooling matched', 'Could emphasize API integration experience']
      },
      {
        id: 'c3',
        name: 'Domain & Experience Relevance',
        score: 95,
        maxScore: 100,
        status: 'pass',
        summary: '6+ years exclusively focused on B2B SaaS growth and enterprise customer lifecycle.',
        details: ['High relevance for monetization and enterprise enablement']
      },
      {
        id: 'c4',
        name: 'Quantified Impact & STAR Density',
        score: 91,
        maxScore: 100,
        status: 'pass',
        summary: 'Every bullet point is backed by statistical data and revenue impact.',
        details: ['$6.8M ARR lift, TTFV reduced from 14 to 3.5 days, 34 Fortune 500 contracts']
      },
      {
        id: 'c5',
        name: 'Leadership & Stakeholder Alignment',
        score: 94,
        maxScore: 100,
        status: 'pass',
        summary: 'Cross-functional leadership across 8 engineers, 2 designers, and executive OKR planning.',
        details: ['Demonstrated executive reporting and cross-team alignment']
      }
    ],
    rewrites: [
      {
        id: 'r1',
        section: 'DataFlow Systems',
        role: 'Senior PM',
        before: 'Managed user feedback loop involving 60+ customer discovery interviews to prioritize 18-month product roadmap.',
        after: 'Synthesized 60+ enterprise customer interviews into a validated 18-month roadmap, delivering 4 flagship features that decreased annual churn by 18% (saving $2.1M ARR).',
        improvementDelta: 11,
        rationale: 'Connects qualitative research directly to retention outcomes and bottom-line dollar value.'
      }
    ],
    keywords: {
      matched: ['B2B SaaS', 'Product-Led Growth', 'ARR', 'Conversion Rate', 'SQL', 'Amplitude', 'OKRs', 'A/B Testing', 'User Research'],
      missingHighPriority: ['Churn Mitigation', 'CAC/LTV Optimization'],
      missingRecommended: ['North Star Metric Framework', 'Customer Journey Mapping']
    },
    parsers: [
      { system: 'Workday ATS', compatibility: 100, status: 'passed', notes: 'Zero parsing flags.' },
      { system: 'Greenhouse', compatibility: 100, status: 'passed', notes: 'Perfect extraction.' },
      { system: 'Lever', compatibility: 98, status: 'passed', notes: 'Parsed all metrics accurately.' },
      { system: 'Oracle Taleo', compatibility: 96, status: 'passed', notes: 'Clear section detection.' }
    ]
  },

  '3': {
    id: '3',
    candidateName: 'Marcus Vance',
    initials: 'MV',
    targetRole: 'Growth Marketing Director',
    fileName: 'marcus_vance_growth_marketing_dir.pdf',
    fileSize: '71 KB',
    wordCount: 680,
    sectionsCount: 4,
    overallScore: 79,
    percentileText: 'Top 18% Percentile',
    alignmentText: '83% Role Target Alignment vs. Marketing Director Baseline',
    synthesisText:
      'Candidate shows solid multi-channel marketing experience and acquisition leadership. However, recent bullet points are heavy on operational duties rather than financial ROI metrics (CAC, LTV, ROAS). Addressing these gaps will immediately raise the score above 90.',
    parsingErrorsCount: 1,
    missingMetricsCount: 4,
    keywordMatchPct: 76,
    jobDescription: `We are hiring a Growth Marketing Director to lead performance marketing, organic acquisition, and lifecycle automation.
Key Requirements:
- 7+ years in B2B/B2C growth marketing managing $5M+ annual paid media budgets.
- Proven track record scaling qualified pipeline and lowering Blended CAC by 20%+.
- Expertise in Google Ads, Meta Ads, LinkedIn Ads, SEO strategies, and HubSpot automation.
- Deep understanding of attribution modeling, multi-touch analytics, and LTV:CAC ratios.
- Experience managing a team of 5+ marketers and collaborating with executive leadership.`,
    extractedText: {
      summary:
        'Growth Marketing Director with 7+ years scaling digital acquisition funnels, managing paid advertising spend, and executing SEO campaigns for fast-growing venture-backed tech startups.',
      experience: `Apex Brands — Head of Growth Marketing (2022 – Present)
• Supervised paid acquisition team across Google Ads, LinkedIn, and Meta campaigns.
• Overhauled company marketing website and content strategy to improve organic search traffic.
• Implemented automated email nurturing workflows in HubSpot for lead generation.
• Led weekly marketing status meetings and collaborated with sales leadership on lead qualification.

ScaleUp Media — Senior Growth Manager (2019 – 2022)
• Managed $3.2M annual performance advertising budget across search and social channels.
• Decreased customer acquisition cost while scaling weekly new subscriber volume.
• Spearheaded marketing attribution modeling setup in Google Analytics 4.`,
      skills:
        'Acquisition Channels: Paid Search (Google Ads), Paid Social (LinkedIn, Meta, TikTok), SEO, Content Strategy\nTools & Platforms: HubSpot, Google Analytics 4, Looker, SEMrush, Marketo, Salesforce\nCore Competencies: Budget Allocation, Campaign Optimization, Email Marketing, Team Leadership',
      education: 'B.S. in Business Administration & Marketing — Boston University (2017)',
      fullText: `Marcus Vance
New York, NY • marcus.vance@example.com • linkedin.com/in/marcusvance

SUMMARY
Growth Marketing Director with 7+ years scaling digital acquisition funnels, managing paid advertising spend, and executing SEO campaigns for fast-growing venture-backed tech startups.

EXPERIENCE
Apex Brands — Head of Growth Marketing | 2022 – Present
• Supervised paid acquisition team across Google Ads, LinkedIn, and Meta campaigns.
• Overhauled company marketing website and content strategy to improve organic search traffic.
• Implemented automated email nurturing workflows in HubSpot for lead generation.
• Led weekly marketing status meetings and collaborated with sales leadership on lead qualification.

ScaleUp Media — Senior Growth Manager | 2019 – 2022
• Managed $3.2M annual performance advertising budget across search and social channels.
• Decreased customer acquisition cost while scaling weekly new subscriber volume.
• Spearheaded marketing attribution modeling setup in Google Analytics 4.

EDUCATION
B.S. in Business Administration & Marketing — Boston University | 2017`
    },
    radarAxes: [
      {
        label: 'Technical Match',
        key: 'technical',
        score: 76,
        benchmark: 75,
        description: 'Mentions core ad platforms, but lacks multi-touch attribution and SQL analytics.'
      },
      {
        label: 'Domain Exp',
        key: 'domain',
        score: 86,
        benchmark: 75,
        description: '7+ years verified growth marketing experience across high-growth tech startups.'
      },
      {
        label: 'Leadership',
        key: 'leadership',
        score: 88,
        benchmark: 75,
        description: 'Managed paid acquisition squads and partnered closely with sales leadership.'
      },
      {
        label: 'Impact / Metrics',
        key: 'impact',
        score: 68,
        benchmark: 75,
        description: '4 bullets lack explicit numerical figures (CAC reduction %, ROAS, revenue pipeline generated).'
      },
      {
        label: 'ATS Format',
        key: 'format',
        score: 92,
        benchmark: 75,
        description: 'Minor styling issue in header spacing, otherwise fully parsable across standard ATS.'
      }
    ],
    criteria: [
      {
        id: 'c1',
        name: 'ATS Structural Compliance',
        score: 92,
        maxScore: 100,
        status: 'pass',
        summary: 'Parsable structure with standard chronological work timeline.',
        details: ['Single-column layout validated', 'Minor punctuation inconsistency in dates normalized']
      },
      {
        id: 'c2',
        name: 'Technical Skill Match',
        score: 76,
        maxScore: 100,
        status: 'review',
        summary: 'Covers core advertising channels but misses modern attribution modeling keywords.',
        details: ['High priority: Needs explicit mention of Blended CAC, LTV:CAC ratio, and ROAS']
      },
      {
        id: 'c3',
        name: 'Domain & Experience Relevance',
        score: 86,
        maxScore: 100,
        status: 'pass',
        summary: 'Strong pedigree across venture-backed technology companies.',
        details: ['Proven multi-channel leadership spanning organic and paid acquisition']
      },
      {
        id: 'c4',
        name: 'Quantified Impact & STAR Density',
        score: 68,
        maxScore: 100,
        status: 'gap',
        summary: 'Major vulnerability: Multiple bullets lack quantifiable ROI metrics.',
        details: [
          '"Decreased customer acquisition cost" must include exact percentage',
          'Missing qualified sales pipeline $ value produced from HubSpot nurture sequences'
        ]
      },
      {
        id: 'c5',
        name: 'Leadership & Stakeholder Alignment',
        score: 88,
        maxScore: 100,
        status: 'pass',
        summary: 'Strong experience leading performance marketing teams and partnering with sales.',
        details: ['Clear record of team management and weekly executive status leadership']
      }
    ],
    rewrites: [
      {
        id: 'r1',
        section: 'Apex Brands',
        role: 'Head of Growth Marketing',
        before: 'Supervised paid acquisition team across Google Ads, LinkedIn, and Meta campaigns.',
        after: 'Directed $4.8M paid acquisition budget across Google Ads, LinkedIn, and Meta, driving 1,840 SQLs at an average blended CAC of $142 (-26% YoY) and generating $8.2M in pipeline.',
        improvementDelta: 18,
        rationale: 'Replaces generic "supervised team" with exact budget scale ($4.8M), concrete pipeline outcome ($8.2M), and verified CAC efficiency (-26%).'
      },
      {
        id: 'r2',
        section: 'ScaleUp Media',
        role: 'Senior Growth Manager',
        before: 'Decreased customer acquisition cost while scaling weekly new subscriber volume.',
        after: 'Reduced blended CAC by 31% while scaling weekly subscriber acquisition by 140% across Search and Social, achieving an average ROAS of 3.8x.',
        improvementDelta: 15,
        rationale: 'Quantifies both sides of the growth equation: acquisition volume (+140%) and efficiency (-31% CAC, 3.8x ROAS).'
      }
    ],
    keywords: {
      matched: ['Google Ads', 'Meta', 'LinkedIn', 'SEO', 'HubSpot', 'Attribution', 'Performance Marketing', 'Lead Generation'],
      missingHighPriority: ['Blended CAC', 'LTV:CAC Ratio', 'ROAS', 'Pipeline Generation'],
      missingRecommended: ['Incrementality Testing', 'Looker / SQL Analytics', 'Product-Led Acquisition']
    },
    parsers: [
      { system: 'Workday ATS', compatibility: 94, status: 'passed', notes: 'Parsed all experience items successfully.' },
      { system: 'Greenhouse', compatibility: 96, status: 'passed', notes: 'Keywords mapped with 92% confidence.' },
      { system: 'Lever', compatibility: 94, status: 'passed', notes: 'Contact information clean.' },
      { system: 'Oracle Taleo', compatibility: 88, status: 'warning', notes: 'Header spacing flagged minor formatting recommendation.' }
    ]
  }
};
