// T.9.11: latinankielistä nimeä ei löydy kaikilta diagnooseilta
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// T.9.12: potilaan perustiedot
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

// T.9.12: henkilötunnus ei kuulu julkiseen potilaslistaan
export type PublicPatient = Omit<Patient, 'ssn'>;
