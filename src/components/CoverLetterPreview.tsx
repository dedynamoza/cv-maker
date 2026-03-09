import React, { forwardRef } from 'react';
import { CVData } from '../types';

interface CoverLetterPreviewProps {
  data: CVData;
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

const CoverLetterPreview = forwardRef<HTMLDivElement, CoverLetterPreviewProps>(({ data, color, font }, ref) => {
  const { personalInfo, coverLetter } = data;
  const theme = COLORS[color];

  return (
    <div 
      ref={ref} 
      className="w-[794px] h-[1123px] bg-white shadow-2xl flex flex-col relative overflow-hidden"
      style={{ fontFamily: font }}
    >
      {/* Top Right Accent Block */}
      <div className={`absolute top-0 right-20 w-20 h-32 ${theme.bg}`}></div>

      <div 
  className="flex-1 w-full pt-8 px-24 flex flex-col"
>
  {/* Header Section */}
  <div className="mb-6">
    <h1 className="text-6xl font-bold tracking-tight uppercase leading-tight">
      {personalInfo.name.split(' ').map((part, i) => (
        <React.Fragment key={i}>
          {part}
          <br />
        </React.Fragment>
      ))}
    </h1>

    <div className="flex justify-between text-sm font-medium text-zinc-800 border-b-2 border-zinc-800 pb-4">
      <span className="ml-2">{personalInfo.email}</span>
    
            <span>{personalInfo.website}</span>
            <span className="mr-2">{personalInfo.phone}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col gap-1 text-zinc-800">
          
          {/* Recipient Info */}
          <div className="flex flex-col gap-3">
            <p className="font-bold mb-6">{coverLetter.date}</p>
            <p className="font-bold text-xl uppercase tracking-wide">{coverLetter.recipientName}</p>
            <p className="text-zinc-600">{coverLetter.recipientTitle}</p>
            <p className="text-zinc-600">{coverLetter.recipientCompany}</p>
            <p className="text-zinc-600 whitespace-pre-line">{coverLetter.recipientAddress}</p>
          </div>

          {/* Letter Body */}
          <div className="flex flex-col gap-2 mt-8">
            <p className="text-zinc-800">{coverLetter.greeting}</p>
            
            <div className="text-zinc-700 leading-relaxed text-justify whitespace-pre-line flex flex-col gap-4">
              {coverLetter.body}
            </div>

            <p className="mt-8 text-zinc-800">{coverLetter.closing}</p>
            
            <p className="mt-12 text-lg">{personalInfo.name}</p>
          </div>

        </div>
      </div>
    </div>
  );
});

CoverLetterPreview.displayName = 'CoverLetterPreview';

export default CoverLetterPreview;