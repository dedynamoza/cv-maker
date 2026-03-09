import React, { forwardRef } from 'react';
import { CVData } from '../types';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
  template: string;
  color: string;
  font: string;
}

const COLORS: Record<string, { bg: string; text: string; accent: string; border: string }> = {
  charcoal: { bg: 'bg-[#2b2b2b]', text: 'text-white', accent: 'text-[#2b2b2b]', border: 'border-[#2b2b2b]' },
  navy: { bg: 'bg-[#1e3a8a]', text: 'text-white', accent: 'text-[#1e3a8a]', border: 'border-[#1e3a8a]' },
  forest: { bg: 'bg-[#064e3b]', text: 'text-white', accent: 'text-[#064e3b]', border: 'border-[#064e3b]' },
  burgundy: { bg: 'bg-[#7f1d1d]', text: 'text-white', accent: 'text-[#7f1d1d]', border: 'border-[#7f1d1d]' },
  teal: { bg: 'bg-[#0f766e]', text: 'text-white', accent: 'text-[#0f766e]', border: 'border-[#0f766e]' },
  purple: { bg: 'bg-[#4c1d95]', text: 'text-white', accent: 'text-[#4c1d95]', border: 'border-[#4c1d95]' }
};

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ data, template, color, font }, ref) => {
  const { personalInfo, education, expertise, experience } = data;
  const theme = COLORS[color] || COLORS.charcoal;

  // Template 1: Modern Split (Original)
  if (template === 'modern') {
    return (
      <div 
        ref={ref} 
        className="w-[794px] h-[1123px] bg-white shadow-2xl flex flex-col relative overflow-hidden"
        style={{ fontFamily: font }}
      >
      {/* Header Section (Photo & Name) */}
      <div className="flex w-full h-[240px] bg-white shrink-0">
        {/* Photo Area */}
        <div className="w-[35%] h-full flex items-center justify-center">
          <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {personalInfo.photo ? (
              <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 text-sm">No Photo</span>
            )}
          </div>
        </div>
        {/* Name Area */}
        <div className="w-[65%] h-full flex flex-col justify-center pl-8 pt-8">
          <h1 className="text-6xl font-black text-zinc-800 tracking-tight uppercase leading-none mb-2">
            {personalInfo.name || 'Dani Martinez'}
          </h1>
          <h2 className="text-2xl text-zinc-500 font-medium tracking-widest uppercase">
            {personalInfo.title || 'UI / UX Designer'}
          </h2>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="flex flex-1 w-full">
        {/* Left Column (Dark) */}
        <div className="w-[35%] bg-[#2b2b2b] text-white py-10 px-8 flex flex-col gap-10">
          
          {/* Contact */}
          <section>
            <h3 className="text-lg font-bold tracking-widest uppercase border-b border-white/20 pb-2 mb-6">
              Contact
            </h3>
            <div className="flex flex-col gap-5 text-sm font-light">
              <div className="flex items-center gap-4">
                <Phone className="w-4 h-4 text-white" />
                <span>{personalInfo.phone || '+123-456-7890'}</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-white" />
                <span className="break-all">{personalInfo.email || 'hello@reallygreatsite.com'}</span>
              </div>
              <div className="flex items-center gap-4">
                <Globe className="w-4 h-4 text-white" />
                <span className="break-all">{personalInfo.website || 'www.reallygreatsite.com'}</span>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-1" />
                <span>{personalInfo.address || '123 Anywhere St., Any City, ST 12345'}</span>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-lg font-bold tracking-widest uppercase border-b border-white/20 pb-2 mb-6">
              Education
            </h3>
            <div className="flex flex-col gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-col">
                  <h4 className="font-bold text-base">{edu.course || 'Course Studied'}</h4>
                  <p className="text-sm text-white/90">{edu.university || 'University/College Details'}</p>
                  <p className="text-sm text-white/70 mt-1">{edu.year || '2006 - 2008'}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Expertise */}
          <section>
            <h3 className="text-lg font-bold tracking-widest uppercase border-b border-white/20 pb-2 mb-6">
              Expertise
            </h3>
            <ul className="flex flex-col gap-4 text-sm font-light list-disc pl-5">
              {expertise.map((exp) => (
                <li key={exp.id} className="pl-2">
                  {exp.skill || 'UI/UX'}
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* Right Column (Light) */}
        <div className="w-[65%] bg-white py-10 px-10 flex flex-col gap-10">
          
          {/* Profile Summary */}
          <section>
            <h3 className="text-lg font-bold tracking-widest uppercase border-b border-zinc-300 pb-2 mb-6 text-zinc-800">
              Profile Summary
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed text-justify">
              {personalInfo.summary || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat. Mauris convallis, mi at mattis malesuada, neque nulla volutpat dolor, hendrerit faucibus eros nibh ut nunc. Proin luctus urna id nunc sagittis dignissim.'}
            </p>
          </section>

          {/* Work Experience */}
          <section>
            <h3 className="text-lg font-bold tracking-widest uppercase border-b border-zinc-300 pb-2 mb-6 text-zinc-800">
              Work Experience
            </h3>
            <div className="flex flex-col gap-8">
              {experience.map((exp) => (
                <div key={exp.id} className="flex flex-col">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-base text-zinc-600">{exp.position || 'Job position here'}</h4>
                    <span className="text-zinc-800 font-bold text-sm">{exp.year || '2019 - 2022'}</span>
                  </div>
                  <h5 className="font-bold text-zinc-800 mb-2 text-sm">
                    {exp.company || 'Company Name'} | {exp.location || 'Location'}
                  </h5>
                  <p className="text-zinc-500 text-sm leading-relaxed text-justify">
                    {exp.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat.'}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
  }

  // Template 2: Classic Header
  if (template === 'classic') {
    return (
      <div ref={ref} className="w-[794px] h-[1123px] bg-white shadow-2xl flex flex-col relative overflow-hidden" style={{ fontFamily: font }}>
        <div className={`w-full ${theme.bg} ${theme.text} py-12 px-16 flex items-center gap-10 shrink-0`}>
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white bg-gray-200 flex items-center justify-center shrink-0">
            {personalInfo.photo ? <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-gray-400 text-sm">No Photo</span>}
          </div>
          <div className="flex flex-col">
            <h1 className="text-5xl font-black tracking-tight uppercase mb-2">{personalInfo.name || 'Your Name'}</h1>
            <h2 className="text-xl font-medium tracking-widest uppercase text-white/80 mb-6">{personalInfo.title || 'Your Profession'}</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-light">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>{personalInfo.phone || '+123-456-7890'}</span></div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /><span>{personalInfo.email || 'hello@email.com'}</span></div>
              <div className="flex items-center gap-2"><Globe className="w-4 h-4" /><span>{personalInfo.website || 'www.website.com'}</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{personalInfo.address || 'Your Address Here'}</span></div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full py-10 px-16 flex flex-col gap-8">
          <section>
            <h3 className={`text-lg font-bold tracking-widest uppercase border-b-2 ${theme.border} pb-2 mb-4 ${theme.accent}`}>Profile Summary</h3>
            <p className="text-zinc-600 text-sm leading-relaxed text-justify">{personalInfo.summary || 'Your summary here.'}</p>
          </section>
          <div className="flex gap-10">
            <div className="w-[60%] flex flex-col gap-8">
              <section>
                <h3 className={`text-lg font-bold tracking-widest uppercase border-b-2 ${theme.border} pb-2 mb-6 ${theme.accent}`}>Work Experience</h3>
                <div className="flex flex-col gap-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="flex flex-col">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-base text-zinc-800 font-bold">{exp.position || 'Position'}</h4>
                        <span className={`${theme.accent} font-bold text-sm`}>{exp.year || 'Year'}</span>
                      </div>
                      <h5 className="font-medium text-zinc-500 mb-2 text-sm">{exp.company || 'Company'} | {exp.location || 'Location'}</h5>
                      <p className="text-zinc-600 text-sm leading-relaxed text-justify">{exp.description || 'Description'}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="w-[40%] flex flex-col gap-8">
              <section>
                <h3 className={`text-lg font-bold tracking-widest uppercase border-b-2 ${theme.border} pb-2 mb-6 ${theme.accent}`}>Education</h3>
                <div className="flex flex-col gap-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex flex-col">
                      <h4 className="font-bold text-zinc-800 text-sm">{edu.course || 'Course'}</h4>
                      <p className="text-sm text-zinc-600">{edu.university || 'University'}</p>
                      <p className="text-xs text-zinc-400 mt-1">{edu.year || 'Year'}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className={`text-lg font-bold tracking-widest uppercase border-b-2 ${theme.border} pb-2 mb-6 ${theme.accent}`}>Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((exp) => (
                    <span key={exp.id} className={`px-3 py-1 ${theme.bg} text-white text-xs rounded-full`}>{exp.skill || 'Skill'}</span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Template 3: Minimalist Sidebar
  return (
    <div ref={ref} className="w-[794px] h-[1123px] bg-white shadow-2xl flex relative overflow-hidden" style={{ fontFamily: font }}>
      <div className={`w-[30%] ${theme.bg} ${theme.text} py-12 px-8 flex flex-col items-center shrink-0`}>
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 bg-gray-200 flex items-center justify-center mb-8">
          {personalInfo.photo ? <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-gray-400 text-sm">No Photo</span>}
        </div>
        <div className="w-full flex flex-col gap-8">
          <section>
            <h3 className="text-sm font-bold tracking-widest uppercase border-b border-white/20 pb-2 mb-4">Contact</h3>
            <div className="flex flex-col gap-4 text-xs font-light">
              <div className="flex items-center gap-3"><Phone className="w-4 h-4" /><span>{personalInfo.phone || '+123-456-7890'}</span></div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4" /><span className="break-all">{personalInfo.email || 'hello@email.com'}</span></div>
              <div className="flex items-center gap-3"><Globe className="w-4 h-4" /><span className="break-all">{personalInfo.website || 'www.website.com'}</span></div>
              <div className="flex items-start gap-3"><div className="mt-1"><MapPin className="w-4 h-4" /></div><span>{personalInfo.address || 'Your Address Here'}</span></div>
            </div>
          </section>
          <section>
            <h3 className="text-sm font-bold tracking-widest uppercase border-b border-white/20 pb-2 mb-4">Expertise</h3>
            <ul className="flex flex-col gap-3 text-xs font-light list-disc pl-4">
              {expertise.map((exp) => <li key={exp.id} className="pl-1">{exp.skill || 'Skill'}</li>)}
            </ul>
          </section>
        </div>
      </div>
      <div className="w-[70%] bg-zinc-50 py-12 px-12 flex flex-col gap-10">
        <div>
          <h1 className={`text-5xl font-black ${theme.accent} tracking-tight uppercase mb-2`}>{personalInfo.name || 'Your Name'}</h1>
          <h2 className="text-xl text-zinc-500 font-medium tracking-widest uppercase">{personalInfo.title || 'Your Profession'}</h2>
        </div>
        <section>
          <h3 className={`text-sm font-bold tracking-widest uppercase border-b-2 ${theme.border} pb-2 mb-4 ${theme.accent}`}>Profile Summary</h3>
          <p className="text-zinc-600 text-sm leading-relaxed text-justify">{personalInfo.summary || 'Your summary here.'}</p>
        </section>
        <section>
          <h3 className={`text-sm font-bold tracking-widest uppercase border-b-2 ${theme.border} pb-2 mb-6 ${theme.accent}`}>Work Experience</h3>
          <div className="flex flex-col gap-6">
            {experience.map((exp) => (
              <div key={exp.id} className="flex flex-col relative pl-6 border-l-2 border-zinc-200">
                <div className={`absolute w-3 h-3 rounded-full ${theme.bg} -left-[7px] top-1`}></div>
                <span className="text-zinc-400 font-bold text-xs mb-1">{exp.year || 'Year'}</span>
                <h4 className="text-base text-zinc-800 font-bold">{exp.position || 'Position'}</h4>
                <h5 className="font-medium text-zinc-500 mb-2 text-sm">{exp.company || 'Company'} | {exp.location || 'Location'}</h5>
                <p className="text-zinc-600 text-sm leading-relaxed text-justify">{exp.description || 'Description'}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3 className={`text-sm font-bold tracking-widest uppercase border-b-2 ${theme.border} pb-2 mb-6 ${theme.accent}`}>Education</h3>
          <div className="flex flex-col gap-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col relative pl-6 border-l-2 border-zinc-200">
                <div className={`absolute w-3 h-3 rounded-full ${theme.bg} -left-[7px] top-1`}></div>
                <span className="text-zinc-400 font-bold text-xs mb-1">{edu.year || 'Year'}</span>
                <h4 className="font-bold text-zinc-800 text-sm">{edu.course || 'Course'}</h4>
                <p className="text-sm text-zinc-600">{edu.university || 'University'}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
});

CVPreview.displayName = 'CVPreview';

export default CVPreview;
