import React, { useState } from 'react';
import { CVData, Education, Experience, Expertise } from '../types';
import { Plus, Trash2, Upload, ChevronDown, ChevronUp } from 'lucide-react';

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
  template: string;
  setTemplate: (template: string) => void;
  color: string;
  setColor: (color: string) => void;
  font: string;
  setFont: (font: string) => void;
  activeTab: 'cv' | 'coverLetter';
}

const COLORS: Record<string, { bg: string; text: string; accent: string; border: string }> = {
  charcoal: { bg: 'bg-[#2b2b2b]', text: 'text-white', accent: 'text-[#2b2b2b]', border: 'border-[#2b2b2b]' },
  navy: { bg: 'bg-[#1e3a8a]', text: 'text-white', accent: 'text-[#1e3a8a]', border: 'border-[#1e3a8a]' },
  forest: { bg: 'bg-[#064e3b]', text: 'text-white', accent: 'text-[#064e3b]', border: 'border-[#064e3b]' },
  burgundy: { bg: 'bg-[#7f1d1d]', text: 'text-white', accent: 'text-[#7f1d1d]', border: 'border-[#7f1d1d]' },
  teal: { bg: 'bg-[#0f766e]', text: 'text-white', accent: 'text-[#0f766e]', border: 'border-[#0f766e]' },
  purple: { bg: 'bg-[#4c1d95]', text: 'text-white', accent: 'text-[#4c1d95]', border: 'border-[#4c1d95]' }
};

const FONTS = [
  { value: "'Inter', sans-serif", label: "Inter" },
  { value: "'Roboto', sans-serif", label: "Roboto" },
  { value: "'Open Sans', sans-serif", label: "Open Sans" },
  { value: "'Lora', serif", label: "Lora" },
  { value: "'Merriweather', serif", label: "Merriweather" },
  { value: "'Playfair Display', serif", label: "Playfair Display" }
];

export default function CVForm({ data, onChange, template, setTemplate, color, setColor, font, setFont, activeTab }: CVFormProps) {
  const [isDesignOpen, setIsDesignOpen] = useState(false);

  const updatePersonalInfo = (field: keyof CVData['personalInfo'], value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const updateCoverLetter = (field: keyof CVData['coverLetter'], value: string) => {
    onChange({
      ...data,
      coverLetter: { ...data.coverLetter, [field]: value },
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generic array update functions
  const addItem = <T extends { id: string }>(key: keyof CVData, item: T) => {
    onChange({ ...data, [key]: [...(data[key] as any), item] });
  };

  const updateItem = <T extends { id: string }>(key: keyof CVData, id: string, field: keyof T, value: string) => {
    const newArray = (data[key] as any).map((item: T) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, [key]: newArray });
  };

  const removeItem = (key: keyof CVData, id: string) => {
    const newArray = (data[key] as any).filter((item: { id: string }) => item.id !== id);
    onChange({ ...data, [key]: newArray });
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto p-6 bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl">
      
      {/* Design Settings - Collapsible */}
      <section className="flex flex-col bg-indigo-50/50 rounded-2xl border border-indigo-100 overflow-hidden transition-all duration-300">
        <button 
          onClick={() => setIsDesignOpen(!isDesignOpen)}
          className="flex items-center justify-between p-4 w-full text-left hover:bg-indigo-100/50 transition-colors"
        >
          <h2 className="text-lg font-bold text-indigo-900">Design Settings</h2>
          {isDesignOpen ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5 text-indigo-600" />}
        </button>
        
        {isDesignOpen && (
          <div className="p-4 pt-0 border-t border-indigo-100/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-indigo-800">Choose Template</label>
                <select 
                  value={template} 
                  onChange={(e) => setTemplate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm text-slate-700"
                >
                  <option value="modern">Modern Split (Original)</option>
                  <option value="classic">Classic Header</option>
                  <option value="minimalist">Minimalist Sidebar</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-indigo-800">Theme Color</label>
                <div className="flex items-center gap-3 flex-wrap">
                  {Object.keys(COLORS).map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${color === c ? 'border-indigo-500 scale-110 shadow-md' : 'border-transparent hover:scale-105'} ${COLORS[c].bg}`}
                      title={c.charAt(0).toUpperCase() + c.slice(1)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-indigo-800">Typography</label>
                <select 
                  value={font} 
                  onChange={(e) => setFont(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-indigo-200 focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm text-slate-700"
                >
                  {FONTS.map(f => (
                    <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>{f.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </section>

      {activeTab === 'cv' ? (
        <>
          {/* Personal Info */}
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-300/50 pb-2">Personal Information</h2>
            
            <div className="flex items-center gap-4 mb-2">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white/50 border-2 border-white shadow-sm flex items-center justify-center relative group cursor-pointer">
                {data.personalInfo.photo ? (
                  <img src={data.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                )}
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
              <div className="text-sm text-slate-500">
                <p className="font-medium text-slate-700">Profile Photo</p>
                <p>Click to upload a professional photo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={data.personalInfo.name}
                onChange={(e) => updatePersonalInfo('name', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm"
              />
              <input
                type="text"
                placeholder="Job Title (e.g. UI/UX Designer)"
                value={data.personalInfo.title}
                onChange={(e) => updatePersonalInfo('title', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm"
              />
              <input
                type="text"
                placeholder="Website / Portfolio"
                value={data.personalInfo.website}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm"
              />
              <input
                type="text"
                placeholder="Address"
                value={data.personalInfo.address}
                onChange={(e) => updatePersonalInfo('address', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm"
              />
            </div>
            <textarea
              placeholder="Profile Summary"
              value={data.personalInfo.summary}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm resize-none"
            />
          </section>

          {/* Education */}
          <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-300/50 pb-2">
              <h2 className="text-2xl font-bold text-slate-800">Education</h2>
              <button
                onClick={() => addItem<Education>('education', { id: Date.now().toString(), course: '', university: '', year: '' })}
                className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {data.education.map((edu) => (
              <div key={edu.id} className="relative grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/40 rounded-2xl border border-white/50 shadow-sm">
                <button onClick={() => removeItem('education', edu.id)} className="absolute -top-2 -right-2 p-1.5 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm">
                  <Trash2 className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Course Studied"
                  value={edu.course}
                  onChange={(e) => updateItem<Education>('education', edu.id, 'course', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="University / College"
                  value={edu.university}
                  onChange={(e) => updateItem<Education>('education', edu.id, 'university', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Year (e.g. 2006 - 2008)"
                  value={edu.year}
                  onChange={(e) => updateItem<Education>('education', edu.id, 'year', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all md:col-span-2"
                />
              </div>
            ))}
          </section>

          {/* Expertise */}
          <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-300/50 pb-2">
              <h2 className="text-2xl font-bold text-slate-800">Expertise / Skills</h2>
              <button
                onClick={() => addItem<Expertise>('expertise', { id: Date.now().toString(), skill: '' })}
                className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.expertise.map((exp) => (
                <div key={exp.id} className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Skill (e.g. UI/UX)"
                    value={exp.skill}
                    onChange={(e) => updateItem<Expertise>('expertise', exp.id, 'skill', e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all pr-10"
                  />
                  <button onClick={() => removeItem('expertise', exp.id)} className="absolute right-2 p-1.5 text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Work Experience */}
          <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-300/50 pb-2">
              <h2 className="text-2xl font-bold text-slate-800">Work Experience</h2>
              <button
                onClick={() => addItem<Experience>('experience', { id: Date.now().toString(), position: '', company: '', location: '', year: '', description: '' })}
                className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/40 rounded-2xl border border-white/50 shadow-sm">
                <button onClick={() => removeItem('experience', exp.id)} className="absolute -top-2 -right-2 p-1.5 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-colors shadow-sm">
                  <Trash2 className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Job Position"
                  value={exp.position}
                  onChange={(e) => updateItem<Experience>('experience', exp.id, 'position', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Year (e.g. 2019 - 2022)"
                  value={exp.year}
                  onChange={(e) => updateItem<Experience>('experience', exp.id, 'year', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) => updateItem<Experience>('experience', exp.id, 'company', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) => updateItem<Experience>('experience', exp.id, 'location', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
                />
                <textarea
                  placeholder="Job Description"
                  value={exp.description}
                  onChange={(e) => updateItem<Experience>('experience', exp.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all md:col-span-2 resize-none"
                />
              </div>
            ))}
          </section>
        </>
      ) : (
        /* Cover Letter Form */
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-300/50 pb-2">Cover Letter Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Date (e.g. April 27, 2023)"
              value={data.coverLetter.date}
              onChange={(e) => updateCoverLetter('date', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm"
            />
            <input
              type="text"
              placeholder="Recipient Name (e.g. JULIANA SILVA)"
              value={data.coverLetter.recipientName}
              onChange={(e) => updateCoverLetter('recipientName', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm"
            />
            <input
              type="text"
              placeholder="Recipient Title (e.g. Founder Thynk Unlimited)"
              value={data.coverLetter.recipientTitle}
              onChange={(e) => updateCoverLetter('recipientTitle', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm"
            />
            <input
              type="text"
              placeholder="Recipient Company"
              value={data.coverLetter.recipientCompany}
              onChange={(e) => updateCoverLetter('recipientCompany', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm"
            />
            <textarea
              placeholder="Recipient Address"
              value={data.coverLetter.recipientAddress}
              onChange={(e) => updateCoverLetter('recipientAddress', e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm resize-none md:col-span-2"
            />
            <input
              type="text"
              placeholder="Greeting (e.g. Dear Ms. Juliana,)"
              value={data.coverLetter.greeting}
              onChange={(e) => updateCoverLetter('greeting', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm md:col-span-2"
            />
            <textarea
              placeholder="Letter Body"
              value={data.coverLetter.body}
              onChange={(e) => updateCoverLetter('body', e.target.value)}
              rows={12}
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm resize-none md:col-span-2"
            />
            <input
              type="text"
              placeholder="Closing (e.g. Best Regards,)"
              value={data.coverLetter.closing}
              onChange={(e) => updateCoverLetter('closing', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 border border-white/40 focus:bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition-all shadow-sm md:col-span-2"
            />
          </div>
        </section>
      )}

    </div>
  );
}

