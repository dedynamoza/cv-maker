import React, { useState, useRef } from 'react';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import CoverLetterPreview from './components/CoverLetterPreview';
import { CVData } from './types';
import { Download, Eye, FileText, FileSignature } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

const initialData: CVData = {
  personalInfo: {
    name: 'Dedi Riyanto',
    title: 'UI / UX Designer',
    phone: '0812-123-456-788',
    email: 'hello@dedi.com',
    website: 'internetindonesia.com',
    address: 'Pekanbaru Indonesia',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat. Mauris convallis, mi at mattis malesuada, neque nulla volutpat dolor, hendrerit faucibus eros nibh ut nunc. Proin luctus urna id nunc sagittis dignissim.',
    photo: null,
  },
  education: [
    { id: '1', course: 'Course Studied', university: 'University/College Details', year: '2006 - 2008' },
    { id: '2', course: 'Course Studied', university: 'University/College Details', year: '2006 - 2008' },
    { id: '3', course: 'Course Studied', university: 'University/College Details', year: '2006 - 2008' },
  ],
  expertise: [
    { id: '1', skill: 'UI/UX' },
    { id: '2', skill: 'Visual Design' },
    { id: '3', skill: 'Wireframes' },
    { id: '4', skill: 'Storyboards' },
    { id: '5', skill: 'User Flows' },
    { id: '6', skill: 'Process Flows' },
  ],
  experience: [
    { id: '1', position: 'Job position here', company: 'Company Name', location: 'Location', year: '2019 - 2022', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat.' },
    { id: '2', position: 'Job position here', company: 'Company Name', location: 'Location', year: '2017 - 2019', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat.' },
    { id: '3', position: 'Job position here', company: 'Company Name', location: 'Location', year: '2015 - 2017', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor, quis tempus arcu elementum. In elementum elit at dui tristique feugiat.' },
  ],
  coverLetter: {
    date: 'April 27, 2023',
    recipientName: 'Team HRD',
    recipientTitle: 'PT MENDANG MENDING.TBK.',
    recipientCompany: '',
    recipientAddress: 'Menara 123 Sidomulyo Pekanbaru Indonesia',
    greeting: 'Dear Team HRD,',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non elit mauris. Cras euismod, metus ac finibus finibus, felis dui suscipit purus, a maximus leo ligula at dolor. Morbi et malesuada purus.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non elit mauris. Cras euismod, metus ac finibus finibus, felis dui suscipit purus, a maximus leo ligula at dolor. Morbi et malesuada purus. Phasellus a lacus sit amet urna tempor sollicitudin. Cras pretium tempor elit blandit egestas. Donec sed dignissim augue. Suspendisse ac vulputate leo.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non elit mauris. Cras euismod, metus ac finibus finibus, felis dui suscipit purus, a maximus leo ligula at dolor. Morbi et malesuada purus. Phasellus a lacus sit amet urna tempor sollicitudin. Cras pretium tempor elit blandit egestas. Donec sed dignissim augue. Suspendisse ac vulputate leo. Cras aliquet nunc ac velit cursus viverra.',
    closing: 'Hormat Saya,',
  }
};

export default function App() {
  const [cvData, setCvData] = useState<CVData>(initialData);
  const [template, setTemplate] = useState('modern');
  const [color, setColor] = useState('charcoal');
  const [font, setFont] = useState("'Inter', sans-serif");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'cv' | 'coverLetter'>('cv');
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    setIsGenerating(true);
    
    let wrapper: HTMLDivElement | null = null;

    try {
      // Create a wrapper div invisibly on-screen
      wrapper = document.createElement('div');
      wrapper.style.position = 'absolute';
      wrapper.style.top = '0';
      wrapper.style.left = '-9999px'; // Move off-screen horizontally
      
      // Clone the element to avoid any CSS transform/scroll issues from parents
      const clone = element.cloneNode(true) as HTMLElement;
      
      // Ensure the clone has the exact dimensions needed
      clone.style.transform = 'none';
      clone.style.width = '794px'; // A4 width at 96 DPI
      clone.style.height = '1123px'; // A4 height at 96 DPI
      
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // Wait a tiny bit for the DOM to render the clone
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${cvData.personalInfo.name || 'Document'}_${activeTab === 'cv' ? 'CV' : 'Cover_Letter'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      if (wrapper && document.body.contains(wrapper)) {
        document.body.removeChild(wrapper);
      }
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-cyan-50 text-slate-800 font-sans selection:bg-indigo-200">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200/50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white font-bold text-xl">CV</span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-cyan-600 hidden sm:block">
              AutoCV Maker
            </h1>
          </div>
          
          {/* Tabs */}
          <div className="hidden md:flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('cv')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'cv' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" /> Resume
            </button>
            <button
              onClick={() => setActiveTab('coverLetter')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'coverLetter' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <FileSignature className="w-4 h-4" /> Cover Letter
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            {isGenerating ? 'Generating...' : `Download ${activeTab === 'cv' ? 'CV' : 'Letter'}`}
          </button>
        </div>
      </header>

      {/* Mobile Tabs */}
      <div className="md:hidden flex bg-white border-b border-slate-200 p-2">
        <button
          onClick={() => setActiveTab('cv')}
          className={`flex-1 flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'cv' 
              ? 'bg-indigo-50 text-indigo-600' 
              : 'text-slate-500'
          }`}
        >
          <FileText className="w-4 h-4" /> Resume
        </button>
        <button
          onClick={() => setActiveTab('coverLetter')}
          className={`flex-1 flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'coverLetter' 
              ? 'bg-indigo-50 text-indigo-600' 
              : 'text-slate-500'
          }`}
        >
          <FileSignature className="w-4 h-4" /> Cover Letter
        </button>
      </div>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-start justify-center">
        
        {/* Form Section */}
        <div className={`w-full lg:w-[45%] xl:w-[40%] ${showPreview ? 'hidden lg:block' : 'block'}`}>
          <CVForm 
            data={cvData} 
            onChange={setCvData} 
            template={template}
            setTemplate={setTemplate}
            color={color}
            setColor={setColor}
            font={font}
            setFont={setFont}
            activeTab={activeTab}
          />
        </div>

        {/* Preview Section */}
        <div className={`w-full lg:w-[55%] xl:w-[60%] flex justify-center ${!showPreview ? 'hidden lg:flex' : 'flex'}`}>
          <div className="sticky top-24 overflow-auto max-h-[calc(100vh-8rem)] rounded-2xl shadow-2xl border border-slate-200/50 bg-white custom-scrollbar">
            {/* Scale wrapper for responsive preview */}
            <div className="origin-top scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-[0.7] xl:scale-[0.85] 2xl:scale-100 transition-transform duration-300">
              {activeTab === 'cv' ? (
                <CVPreview data={cvData} ref={printRef} template={template} color={color} font={font} />
              ) : (
                <CoverLetterPreview data={cvData} ref={printRef} color={color} font={font} />
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
