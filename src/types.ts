export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  summary: string;
  photo: string | null;
}

export interface Education {
  id: string;
  course: string;
  university: string;
  year: string;
}

export interface Expertise {
  id: string;
  skill: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  year: string;
  description: string;
}

export interface CoverLetterData {
  date: string;
  recipientName: string;
  recipientTitle: string;
  recipientCompany: string;
  recipientAddress: string;
  greeting: string;
  body: string;
  closing: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  education: Education[];
  expertise: Expertise[];
  experience: Experience[];
  coverLetter: CoverLetterData;
}

