import { MedalCount, Athlete } from './types';

// Initial mock data
const initialMedalCounts: MedalCount[] = [
  {
    id: "us-1",
    country: "United States",
    gold: 10,
    silver: 8,
    bronze: 7,
    total: 25
  },
  {
    id: "cn-1",
    country: "China",
    gold: 9,
    silver: 10,
    bronze: 5,
    total: 24
  },
  {
    id: "jp-1",
    country: "Japan",
    gold: 7,
    silver: 6,
    bronze: 8,
    total: 21
  },
  {
    id: "gb-1",
    country: "Great Britain",
    gold: 6,
    silver: 7,
    bronze: 9,
    total: 22
  }
];

const initialAthletes: Athlete[] = [
  {
    id: "ath-1",
    name: "John Smith",
    country: "United States",
    sport: "Swimming",
    medals: { gold: 2, silver: 1, bronze: 0 }
  },
  {
    id: "ath-2",
    name: "Liu Wei",
    country: "China",
    sport: "Gymnastics",
    medals: { gold: 1, silver: 2, bronze: 0 }
  },
  {
    id: "ath-3",
    name: "Tanaka Yuki",
    country: "Japan",
    sport: "Judo",
    medals: { gold: 1, silver: 0, bronze: 1 }
  },
  {
    id: "ath-4",
    name: "Emma Wilson",
    country: "Great Britain",
    sport: "Athletics",
    medals: { gold: 0, silver: 2, bronze: 1 }
  }
];

const countries = [
  "United States",
  "China",
  "Japan",
  "Great Britain",
  "Australia",
  "Germany",
  "France",
  "Italy",
  "Canada",
  "South Korea"
];

// Initialize data in localStorage if it doesn't exist
export const initializeLocalStorage = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem('medalCounts')) {
    localStorage.setItem('medalCounts', JSON.stringify(initialMedalCounts));
  }

  if (!localStorage.getItem('athletes')) {
    localStorage.setItem('athletes', JSON.stringify(initialAthletes));
  }

  if (!localStorage.getItem('countries')) {
    localStorage.setItem('countries', JSON.stringify(countries));
  }
};

// Medal counts
export const getMedalCounts = (): MedalCount[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('medalCounts');
  return data ? JSON.parse(data) : [];
};

export const updateMedalCount = (medalCount: MedalCount) => {
  if (typeof window === 'undefined') return;
  const counts = getMedalCounts();
  const index = counts.findIndex(m => m.id === medalCount.id);
  
  if (index >= 0) {
    counts[index] = medalCount;
  } else {
    counts.push(medalCount);
  }
  
  localStorage.setItem('medalCounts', JSON.stringify(counts));
};

// Athletes
export const getAthletes = (): Athlete[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('athletes');
  return data ? JSON.parse(data) : [];
};

export const updateAthlete = (athlete: Athlete) => {
  if (typeof window === 'undefined') return;
  const athletes = getAthletes();
  const index = athletes.findIndex(a => a.id === athlete.id);
  
  if (index >= 0) {
    athletes[index] = athlete;
  } else {
    athletes.push(athlete);
  }
  
  localStorage.setItem('athletes', JSON.stringify(athletes));
};

export const saveAthletes = (athletes: Athlete[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('athletes', JSON.stringify(athletes));
};

// Countries
export const getCountries = (): string[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('countries');
  return data ? JSON.parse(data) : [];
};

// Protests
export interface Protest {
  id: string;
  description: string;
  protester: string;
  respondent: string;
  resolution?: string;
  resolved: boolean;
}

export const getProtests = (): Protest[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('protests');
  return data ? JSON.parse(data) : [];
};

export const saveProtests = (protests: Protest[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('protests', JSON.stringify(protests));
};

// Generate unique ID
export const generateId = (prefix: string): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
