import React from 'react';
import { resumeData } from '../data/resume.data';
import { Header } from './Header';
import { TwoColumnLayout } from './TwoColumnLayout';
import { Section } from './Section';
import { SidebarSection } from './SidebarSection';
import { RoleBlock } from './RoleBlock';
import { getEffectiveFontSize, getEffectiveSpacing } from '../layout/constraints';
import { TYPOGRAPHY } from '../tokens/typography';
import { PAGE } from '../tokens/page';
import { LayoutConstraints } from '../layout/constraints';
import {
  BarChart2,
  BookOpen,
  Briefcase,
  Cpu,
  GitHub,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Folder,
  Link2,
} from 'react-feather';

interface ResumePageProps {
  constraints: LayoutConstraints;
  searchTerm?: string;
}

const highlightText = (text: string, searchTerm?: string): boolean => {
  if (!searchTerm) return false;
  return text.toLowerCase().includes(searchTerm.toLowerCase());
};

export const ResumePage: React.FC<ResumePageProps> = ({
  constraints,
  searchTerm,
}) => {
  const smallSize = getEffectiveFontSize('SIZE_SM', constraints);
  const bodySize = getEffectiveFontSize('SIZE_MD', constraints);
  const companyRoleSize = Math.max(TYPOGRAPHY.MIN_BODY_SIZE, bodySize - 0.5);
  const companyNameSize = companyRoleSize + 0.5; // Slight bump for company names only
  const sectionIconSize = Math.max(10, Math.round(bodySize - 2));
  const expEduIconSize = sectionIconSize + 3; // Slightly larger than sidebar section icons
  const contactIconSize = Math.max(10, Math.round(smallSize + 2));
  const contactIconProps = { size: contactIconSize, color: '#000', strokeWidth: 2 };
  const contactIconSlot: React.CSSProperties = { width: '16px', display: 'flex', justifyContent: 'center' };
  const linkStyle: React.CSSProperties = { textDecoration: 'none', color: '#000' };
  const toTelHref = (phone: string): string => {
    const digits = phone.replace(/[^\d+]/g, '');
    return `tel:${digits}`;
  };
  // (Template preference) Education schools render uppercase; no case-normalization needed.
  const websiteLink =
    resumeData.contact.links.find((l) => {
      const label = l.label.toLowerCase();
      return label === 'website' || label === 'portfolio';
    }) ?? null;
  const otherLinks = resumeData.contact.links.filter((l) => l !== websiteLink);
  
  const mainContent = (
    <>
      <Section
        title="Experience"
        constraints={constraints}
        highlight={highlightText('Experience', searchTerm)}
        customSpacing={getEffectiveSpacing('BLOCK_TIGHT', constraints)}
        icon={<Briefcase size={expEduIconSize} color="#000" strokeWidth={2} />}
        titleSizeDelta={-1}
        uppercase={false}
      >
        <div style={{ marginTop: `${getEffectiveSpacing('INLINE_SMALL', constraints)}px` }}>
          {resumeData.experiences.map((exp, expIdx) => {
            return (
              <div
                key={expIdx}
                style={{
                  marginBottom:
                    getEffectiveSpacing('BASELINE', constraints) +
                    getEffectiveSpacing('TINY', constraints), // Slightly more space between companies
                  backgroundColor: 'transparent',
                }}
              >
                {/* Company + roles (left) | dates + location (right) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `1fr ${PAGE.DATE_COLUMN_WIDTH}px`,
                    columnGap: getEffectiveSpacing('INLINE_MEDIUM', constraints), // Reduced from INLINE_LARGE for tighter layout
                    rowGap: getEffectiveSpacing('TINY', constraints), // 2px baseline-aligned
                  }}
                >
                  {/* Roles */}
                  {exp.roles.map((role, roleIdx) => {
                    return (
                      <React.Fragment key={roleIdx}>
                        {/* Left: Company name (only for first role) */}
                        {roleIdx === 0 && (
                          <>
                            <div
                              style={{
                                fontWeight: TYPOGRAPHY.WEIGHT_BOLD,
                                fontSize: `${companyNameSize}px`,
                                textTransform: 'none',
                                letterSpacing: 0,
                              }}
                            >
                              {exp.company}
                            </div>
                            {/* Right: Location aligned with company */}
                            <div
                              style={{
                                textAlign: 'right',
                                color: '#000',
                                fontSize: `${smallSize}px`,
                                paddingLeft: `${PAGE.METADATA_GUTTER + getEffectiveSpacing('INLINE_SMALL', constraints)}px`, // Internal gutter between left content + metadata (keep tight)
                                paddingRight: '7px', // Extra breathing room from the sidebar edge
                              }}
                            >
                              {exp.location}
                            </div>
                          </>
                        )}
                        
                        {/* Job title (italic, semibold) */}
                        <div
                          style={{
                            fontStyle: 'italic',
                            fontWeight: TYPOGRAPHY.WEIGHT_SEMIBOLD,
                            fontSize: `${companyRoleSize}px`,
                            textTransform: 'none',
                            letterSpacing: 0,
                            marginTop: roleIdx === 0 ? `${getEffectiveSpacing('TINY', constraints)}px` : 0, // Separate company from first role title
                          }}
                        >
                          {role.title}
                        </div>
                        {/* Dates (right column, below location) */}
                        <div
                          style={{
                            textAlign: 'right',
                            fontStyle: 'italic',
                            color: '#000',
                            fontSize: `${smallSize}px`,
                            paddingLeft: `${PAGE.METADATA_GUTTER + getEffectiveSpacing('INLINE_SMALL', constraints)}px`, // Internal gutter between left content + metadata (keep tight)
                            paddingRight: '7px', // Extra breathing room from the sidebar edge
                          }}
                        >
                          {role.startDate} - {role.endDate}
                        </div>

                        {/* Bullets span full width but align under left column */}
                        <div style={{ gridColumn: '1 / -1' }}>
                          <RoleBlock
                            role={role}
                            constraints={constraints}
                          />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <div style={{ marginTop: `${getEffectiveSpacing('INLINE_SMALL', constraints)}px` }}>
        <Section
          title="Education"
          constraints={constraints}
          highlight={highlightText('Education', searchTerm)}
          customSpacing={getEffectiveSpacing('BASELINE', constraints)}
          titleWeight={TYPOGRAPHY.WEIGHT_SEMIBOLD}
          icon={<BookOpen size={expEduIconSize} color="#000" strokeWidth={2} />}
          titleSizeDelta={-1}
          uppercase={false}
        >
          {resumeData.education.map((edu, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: idx < resumeData.education.length - 1 
                  ? (getEffectiveSpacing('BLOCK_MINIMAL', constraints) + getEffectiveSpacing('INLINE_SMALL', constraints) + getEffectiveSpacing('TINY', constraints)) // Slightly more separation between schools
                  : 0, // No bottom margin on last item
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  columnGap: `${getEffectiveSpacing('INLINE_SMALL', constraints)}px`,
                  gridTemplateRows: 'auto auto',
                  alignItems: 'baseline',
                }}
              >
                {/* Row 1: Degree + Year (year aligns with degree, not school) */}
                <div style={{ fontWeight: TYPOGRAPHY.WEIGHT_SEMIBOLD, fontSize: `${bodySize}px` }}>
                  {edu.degree}
                </div>
                <div
                  style={{
                    color: '#000',
                    fontSize: `${smallSize}px`,
                    fontWeight: TYPOGRAPHY.WEIGHT_NORMAL,
                    textAlign: 'right',
                    fontStyle: 'italic',
                    paddingRight: '7px', // Extra breathing room from sidebar
                  }}
                >
                  {edu.year}
                </div>

                {/* Row 2: School (left only) */}
                <div
                  style={{
                    gridColumn: '1 / 2',
                    color: '#000',
                    fontSize: `${bodySize}px`,
                    fontWeight: TYPOGRAPHY.WEIGHT_NORMAL,
                    textTransform: 'uppercase',
                    letterSpacing: '0.3px',
                    marginTop: `${getEffectiveSpacing('MICRO', constraints)}px`,
                  }}
                >
                  {edu.school}
                </div>
              </div>
            </div>
          ))}
        </Section>
      </div>
    </>
  );
  
  const sidebar = (
    <>
      <SidebarSection
        title="Website"
        constraints={constraints}
        highlight={highlightText('Website', searchTerm)}
        isFirst={true}
        hideTitle={true}
        extraBottomSpacing={getEffectiveSpacing('INLINE_LARGE', constraints)}
      >
        {websiteLink && (
          <div style={{ marginBottom: `${getEffectiveSpacing('MICRO', constraints)}px`, display: 'flex', alignItems: 'center', gap: `${getEffectiveSpacing('INLINE_SMALL', constraints)}px`, lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px` }}>
            <span style={contactIconSlot}><Globe {...contactIconProps} /></span>
            <a href={websiteLink.url} style={linkStyle} target="_blank" rel="noreferrer">
              {websiteLink.label}
            </a>
          </div>
        )}
        {otherLinks.map((link, idx) => {
          const iconNode =
            link.label === 'LinkedIn' ? <Linkedin {...contactIconProps} /> :
            link.label === 'Github' ? <GitHub {...contactIconProps} /> :
            link.label === 'Tableau' ? <BarChart2 {...contactIconProps} /> :
            <Link2 {...contactIconProps} />;
          return (
            <div key={idx} style={{ marginBottom: `${getEffectiveSpacing('MICRO', constraints)}px`, display: 'flex', alignItems: 'center', gap: `${getEffectiveSpacing('INLINE_SMALL', constraints)}px`, lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px` }}>
              <span style={contactIconSlot}>{iconNode}</span>
              <a href={link.url} style={linkStyle} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </div>
          );
        })}
        <div style={{ marginTop: `${getEffectiveSpacing('MICRO', constraints)}px`, display: 'flex', alignItems: 'center', gap: `${getEffectiveSpacing('INLINE_SMALL', constraints)}px`, lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px` }}>
          <span style={contactIconSlot}><Mail {...contactIconProps} /></span>
          <a href={`mailto:${resumeData.contact.email}`} style={linkStyle}>
            {resumeData.contact.email}
          </a>
        </div>
        <div style={{ marginBottom: `${getEffectiveSpacing('MICRO', constraints)}px`, display: 'flex', alignItems: 'center', gap: `${getEffectiveSpacing('INLINE_SMALL', constraints)}px`, lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px` }}>
          <span style={contactIconSlot}><Phone {...contactIconProps} /></span>
          <a href={toTelHref(resumeData.contact.phone)} style={linkStyle}>
            {resumeData.contact.phone}
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: `${getEffectiveSpacing('INLINE_SMALL', constraints)}px` }}>
          {/* Icon should visually belong to the first line only */}
          <span style={{ ...contactIconSlot, marginTop: '2px' }}><MapPin {...contactIconProps} /></span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px` }}>
            <span style={{ textDecoration: 'none', color: '#000' }}>{resumeData.contact.location}</span>
          </div>
        </div>
      </SidebarSection>
      
      <SidebarSection
        title="Skills"
        constraints={constraints}
        highlight={highlightText('Skills', searchTerm)}
        icon={<Cpu size={sectionIconSize} color="#000" strokeWidth={2} />}
        extraBottomSpacing={getEffectiveSpacing('INLINE_LARGE', constraints)}
      >
        {resumeData.skills.map((skillGroup, idx) => (
          <div key={idx} style={{ marginBottom: idx < resumeData.skills.length - 1 ? `${getEffectiveSpacing('MICRO', constraints)}px` : 0, lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px` }}>
            <div style={{ fontWeight: TYPOGRAPHY.WEIGHT_SEMIBOLD, marginBottom: '0px', lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px` }}>
              {skillGroup.category}:
            </div>
            <div style={{ color: '#000', lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px` }}>
              {skillGroup.items.join(', ')}
            </div>
          </div>
        ))}
      </SidebarSection>
      
      <SidebarSection
        title="Projects"
        constraints={constraints}
        highlight={highlightText('Projects', searchTerm)}
        icon={<Folder size={sectionIconSize} color="#000" strokeWidth={2} />}
      >
        {resumeData.projects.map((project, idx) => (
          <div key={idx} style={{ marginBottom: idx < resumeData.projects.length - 1 ? `${getEffectiveSpacing('TINY', constraints)}px` : 0, lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px` }}>
            <div style={{ fontWeight: TYPOGRAPHY.WEIGHT_SEMIBOLD, marginBottom: '0px', lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px` }}>
              {project.title}
            </div>
            <div style={{ color: '#000', fontSize: `${smallSize}px`, lineHeight: `${TYPOGRAPHY.LINE_HEIGHT_MD}px` }}>
              {project.description}
            </div>
          </div>
        ))}
      </SidebarSection>
      
      {/* Certifications removed */}
    </>
  );
  
  return (
    <div 
      className="resume-page"
      style={{
        width: '100%',
        height: '100%', // Concrete height for CSS Grid (not minHeight)
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TwoColumnLayout
        left={
          <>
            <Header
              name={resumeData.name}
              constraints={constraints}
            />
            {mainContent}
          </>
        }
        right={sidebar}
        constraints={constraints}
      />
    </div>
  );
};

