export type UserRole = "Administrator" | "Tabulation Team" | "RSAC" | "Social Media Team";

export interface Athlete {
  id: string;
  passportNumber: string;
  name: string;
  age: number;
  gender: string;
  category: string;
  yearLevel: string;
  sportsEvent: string;
  schoolDivision: string;
  weight: number;
  height: number;
  birthdate: string;
  country: string;
  sport: string;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };
}

export interface MedalCount {
  id: string;
  country: string;
  gold: number;
  silver: number;
  bronze: number;
  total?: number;
}

export interface UserData {
  uid: string;
  email: string;
  role: UserRole;
  name: string;
}
