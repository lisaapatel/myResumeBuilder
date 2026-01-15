/**
 * Resume data structure
 * Content is never mutated by the layout engine
 */

export interface BulletItem {
  text: string;
  subSection?: string; // For sub-sections like "Platform Analytics", "Subscription Analytics"
}

export interface Role {
  title: string;
  startDate: string;
  endDate: string;
  bullets: BulletItem[];
}

export interface Experience {
  company: string;
  location: string;
  roles: Role[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface Contact {
  email: string;
  phone: string;
  location: string;
  links: {
    label: string;
    url: string;
  }[];
}

export interface ResumeData {
  name: string;
  contact: Contact;
  experiences: Experience[];
  education: Education[];
  skills: {
    category: string;
    items: string[];
  }[];
  projects: {
    title: string;
    description: string;
  }[];
  certifications: string[];
}

export const resumeData: ResumeData = {
  name: 'Jane Doe',
  contact: {
    email: 'jane.doe@example.com',
    phone: '(555) 019-2048',
    location: 'Austin, TX',
    links: [
      { label: 'Website', url: 'https://example.com' },
      { label: 'LinkedIn', url: 'https://example.com/linkedin' },
      { label: 'Github', url: 'https://example.com/github' },
    ],
  },
  experiences: [
    {
      company: 'Acme Payments (Example)',
      location: 'Remote',
      roles: [
        {
          title: 'Senior Product Manager, Growth',
          startDate: '2023',
          endDate: 'Present',
          bullets: [
            {
              subSection: 'Activation',
              text: 'Redesigned onboarding (KYC, funding, first-value) and improved activation from 42% → 55% by simplifying steps, clarifying fees, and adding proactive nudges.',
            },
            {
              subSection: 'Monetization',
              text: 'Launched tiered pricing and usage-based limits for SMB plans; improved ARPA by 12% while holding churn flat through coordinated experimentation and in-app education.',
            },
            {
              subSection: 'Experimentation',
              text: 'Established an experimentation playbook (metrics, guardrails, analysis templates) and increased monthly test velocity from 4 → 12 without degrading reliability.',
            },
            {
              subSection: 'Cross-functional delivery',
              text: 'Owned roadmap for growth surfaces across web + mobile; partnered with design, data, and engineering to ship 10+ iterations per quarter with clear success criteria.',
            },
          ],
        },
        {
          title: 'Product Manager',
          startDate: '2021',
          endDate: '2023',
          bullets: [
            {
              subSection: 'Payments UX',
              text: 'Shipped a new checkout and receipts experience with clear fee disclosure and fallback flows; reduced payment-related support tickets by 18%.',
            },
            {
              subSection: 'Risk & trust',
              text: 'Partnered with risk and fraud teams to introduce step-up verification and anomaly detection; reduced fraud loss rate by 22% while maintaining conversion.',
            },
          ],
        },
        {
          title: 'Associate Product Manager',
          startDate: '2019',
          endDate: '2021',
          bullets: [
            {
              text: 'Owned PRDs and execution for dashboard analytics used by ops and support; improved time-to-resolution by standardizing workflows and surfacing the right context.',
            },
            {
              text: 'Built KPI definitions and self-serve reporting for core funnel metrics, enabling weekly product reviews and faster decision-making.',
            },
          ],
        },
      ],
    },
    {
      company: 'Northwind Health (Example)',
      location: 'Austin, TX',
      roles: [
        {
          title: 'Product Analyst (Internship)',
          startDate: '2018',
          endDate: '2019',
          bullets: [
            {
              subSection: 'Insights',
              text: 'Performed cohort analysis to identify drop-offs in care-plan completion; informed a rework of reminders and content sequencing.',
            },
            {
              subSection: 'Reporting',
              text: 'Automated weekly dashboards for acquisition, retention, and conversion using SQL + BI tooling, reducing manual reporting time by ~6 hours/week.',
            },
            {
              subSection: 'Experiment support',
              text: 'Supported A/B test analysis (primary metrics + guardrails) and helped document learnings and follow-up actions for the product team.',
            },
          ],
        },
      ],
    },
    {
      company: 'Contoso Cloud (Example)',
      location: 'Seattle, WA',
      roles: [
        {
          title: 'Product Management Intern',
          startDate: 'Jun 2017',
          endDate: 'Aug 2017',
          bullets: [
            {
              subSection: 'Discovery',
              text: 'Interviewed 10+ users and synthesized feedback into a problem statement and prioritization rubric for an admin workflow refresh.',
            },
            {
              subSection: 'Execution',
              text: 'Wrote lightweight PRDs and partnered with engineering on scoped MVP delivery, acceptance criteria, and release notes.',
            },
            {
              subSection: 'Metrics',
              text: 'Defined success metrics and instrumented key events to measure time-on-task and funnel completion for the new flow.',
            },
          ],
        },
      ],
    },
  ],
  education: [
    {
      degree: 'M.B.A.',
      school: 'UNIVERSITY OF TEXAS AT AUSTIN, MCCombs School of Business',
      year: '2021',
    },
    {
      degree: 'B.S. in Business Administration',
      school: 'UNIVERSITY OF CALIFORNIA, BERKELEY',
      year: '2019',
    },
  ],
  skills: [
    {
      category: 'Product',
      items: [
        'Product Strategy',
        'Roadmapping',
        'User Research',
        'PRDs',
        'Experiment Design',
        'A/B Testing',
        'Go-to-Market',
      ],
    },
    {
      category: 'Analytics',
      items: ['SQL', 'Funnel Analysis', 'Cohort Analysis', 'North Star Metrics', 'Dashboarding'],
    },
    {
      category: 'Tools',
      items: ['Amplitude (or similar)', 'Google Analytics', 'Looker/Tableau', 'Jira', 'Figma'],
    },
    {
      category: 'Technical',
      items: ['APIs', 'Webhooks', 'Data Modeling (basic)', 'Payment flows', 'Compliance basics'],
    },
  ],
  projects: [
    {
      title: 'Onboarding Simplification',
      description:
        'Designed an onboarding flow with progressive disclosure and clearer requirements; validated with usability tests and staged rollouts.',
    },
    {
      title: 'Pricing & Packaging Refresh',
      description:
        'Created a pricing proposal with value metrics and guardrails; partnered with sales/support to update messaging and in-product education.',
    },
    {
      title: 'Support Workflow Automation',
      description:
        'Built a lightweight triage workflow to route issues and surface the right account context, improving resolution speed and consistency.',
    },

  ],
  certifications: ['CSPO (Example)'],
};


