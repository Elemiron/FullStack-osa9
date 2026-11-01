// T.9.11: latinankielistä nimeä ei löydy kaikilta diagnooseilta
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// T.9.14: sallitut arvot ja tyyppi pysyvät samassa paikassa
export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

// T.9.12: potilaan perustiedot
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

// T.9.12: henkilötunnus ei kuulu julkiseen potilaslistaan
export type PublicPatient = Omit<Patient, 'ssn'>;

// T.9.13: uudella potilaalla ei vielä ole palvelimen luomaa tunnistetta
export type NewPatient = Omit<Patient, 'id'>;
